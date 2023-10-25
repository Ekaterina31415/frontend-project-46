import _ from 'lodash';

const stringify = (value, margin) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * 2 + margin;
    const currentIndent = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const stylishOutput = (value) => {
  const iter = (currentValue, depth) => {
    const indentSize = depth * 2;
    const indent = ' '.repeat(depth * 2);
    const bracketIndent = ' '.repeat(depth * 2 - 2);
    const lines = currentValue.map((node) => {
      if (node.status === 'added') {
        return `${indent}+ ${node.key}: ${stringify(node.value, indentSize)}`;
      } else if (node.status === 'removed') {
        return `${indent}- ${node.key}: ${stringify(node.value, indentSize)}`;
      } else if (node.status === 'unchanged') {
        return `${indent}  ${node.key}: ${stringify(node.value, indentSize)}`;
      } else if (node.status === 'updated') {
        return `${indent}- ${node.key}: ${stringify(node.oldValue, indentSize)}\n${indent}+ ${node.key}: ${stringify(node.newValue, indentSize)}`;
      }
      return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylishOutput;
