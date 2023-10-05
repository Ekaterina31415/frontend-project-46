import _ from 'lodash';

const plainOutput = (obj, keyPath = '') => {
  const result = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key.includes('-')) {
      result.push(keyPath === '' ? `Property '${key}' was removed` : `Property '${keyPath}.${key}' was removed`);
    }
    if (key.includes('+')) {
      result.push(keyPath === '' ? `Property '${key}' was added with value: '${value}'` : `Property ${keyPath}.${key} was removed`);
    }
    if (_.isPlainObject(obj) && !_.isEmpty(obj)) {
      const currentKey = `${keyPath}.${key}`;
      plainOutput(value, currentKey);
    }
  }

  return result.join('\n');
};
export default plainOutput;
