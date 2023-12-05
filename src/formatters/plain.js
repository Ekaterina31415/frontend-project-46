const outputValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainOutput = (diff) => {
  const iter = (treePart, keyPath) => {
    const newKeyPath = keyPath === '' ? `${treePart.key}` : `${keyPath}.${treePart.key}`;
    if (treePart.status === 'nested') {
      return treePart.children.flatMap((child) => iter(child, newKeyPath));
    }
    if (treePart.status === 'added') {
      return `Property '${newKeyPath}' was added with value: ${outputValue(treePart.value)}`;
    }
    if (treePart.status === 'removed') {
      return `Property '${newKeyPath}' was removed`;
    }
    if (treePart.status === 'updated') {
      return `Property '${newKeyPath}' was updated. From ${outputValue(treePart.oldValue)} to ${outputValue(treePart.newValue)}`;
    }
    return [];
  };

  return diff.flatMap((node) => iter(node, '')).sort().join('\n');
};

export default plainOutput;
