import _ from 'lodash';

function processJson(data1, data2) {
  const keys1 = _.sortBy(Object.keys(data1));
  const keys2 = _.sortBy(Object.keys(data2));

  let output = '';

  for (let key of keys1) {
    if (!keys2.includes(key)) {
      output += `- ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      output += `- ${key}: ${data1[key]}\n`;
      output += `+ ${key}: ${data2[key]}\n`;
    } else {
      output += `  ${key}: ${data1[key]}\n`
    }
  }

  for (let key of keys2) {
    if (!keys1.includes(key)) {
      output += `+ ${key}: ${data2[key]}\n`;
    }
  }

  return output;
}

export default processJson;
