import _ from 'lodash';

const stylishOutput = (obj, indent = 0) => {
  const result = [];

  const getIndent = (level) => ' '.repeat(level * 2);

  for (const [key, value] of Object.entries(obj)) {
    if (_.isPlainObject(value)) {
      const formattedValue = stylishOutput(value, indent + 1);
      result.push(`${getIndent(indent)}${key}: {\n${formattedValue}\n${getIndent(indent)}}`);
    } else {
      result.push(`${getIndent(indent)}${key}: ${value}`);
    }
  }

  return result.join('\n');
};
export default stylishOutput;
