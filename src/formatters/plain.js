import _ from 'lodash';

const plainOutput = (diff) => {
  const iter = (treePart, keyPath) => {
    const newKeyPath = keyPath === '' ? `${treePart.key}` : `${keyPath}.${treePart.key}`;
    if (treePart.status === 'nested') {
      return plainOutput(treePart.children, newKeyPath);
    }
    if (treePart.status === 'added') {
      const value = _.isObject(treePart.value) ? '[complex value]' : treePart.value;
      return `Property '${newKeyPath}' was added with value: ${value}"`;
    }
    if (treePart.status === 'removed') {
      return `Property '${newKeyPath}' was removed`;
    }
    if (treePart.status === 'updated') {
      const val1 = _.isObject(treePart.oldValue) ? '[complex value]' : treePart.oldValue;
      const val2 = _.isObject(treePart.newValue) ? '[complex value]' : treePart.newValue;
      return `Property '${newKeyPath}' was updated. From '${val1}' to '${val2}'`;
    }
    return '';
  };

  return diff.flatMap((node) => iter(node, '')).join('\n');
};

export default plainOutput;
