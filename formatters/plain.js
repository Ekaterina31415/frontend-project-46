import _ from 'lodash';

const plainOutput = (array, keyPath = '') => {
  const result = array.map((obj) => {
    const newKeyPath = keyPath === '' ? `${obj.key}` : `${keyPath}.${obj.key}`;
    if (obj.status === 'nested') {
      return plainOutput(obj.children, newKeyPath);
    } else if (obj.status === 'added') {
      const value = _.isObject(obj.value) ? '[complex value]' : obj.value;
      return `Property '${newKeyPath}' was added with value: ${value}"`;
    } else if (obj.status === 'removed') {
      return `Property '${newKeyPath}' was removed`;
    } else if (obj.status === 'updated') {
      const val1 = _.isObject(obj.oldValue) ? '[complex value]' : obj.oldValue;
      const val2 = _.isObject(obj.newValue) ? '[complex value]' : obj.newValue;
      return `Property '${newKeyPath}' was updated. From '${val1}' to '${val2}'`;
    }
    return '';
  });

  return result.join('\n');
};

export default plainOutput;
