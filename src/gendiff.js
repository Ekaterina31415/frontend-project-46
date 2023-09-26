import _ from 'lodash';

function processJson(data1, data2) {
  const keys1 = _.sortBy(Object.keys(data1));
  const keys2 = _.sortBy(Object.keys(data2));

  let output = '';

  for (let i = 0; i < keys1.length; i += 1) {
    if (!keys2.includes(keys1[i])) {
      output += `- ${keys1[i]}: ${data1[keys1[i]]}\n`;
    } else if (data1[keys1[i]] !== data2[keys1[i]]) {
      output += `- ${keys1[i]}: ${data1[keys1[i]]}\n`;
      output += `+ ${keys1[i]}: ${data2[keys1[i]]}\n`;
    } else {
      output += `  ${keys1[i]}: ${data1[keys1[i]]}\n`;
    }
  }

  for (let i = 0; i < keys2.length; i += 1) {
    if (!keys1.includes(keys2[i])) {
      output += `+ ${keys2[i]}: ${data2[keys2[i]]}\n`;
    }
  }

  return output;
}

export default processJson;
