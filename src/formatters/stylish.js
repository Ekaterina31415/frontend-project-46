import _ from 'lodash';

const getIndentSize = (depth) => depth * 2 + 1;
const getIndentString = (indentSize) => ' '.repeat(indentSize);

const stringify = (value, margin) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = getIndentSize(depth) + margin;
    const currentIndent = getIndentString(indentSize);
    const bracketIndent = getIndentString(indentSize - 2);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, margin);
};

const stylishOutput = (value) => {
  const iter = (currentValue, depth) => {
    const indentSize = getIndentSize(depth);
    const indent = getIndentString(indentSize);
    const bracketIndent = getIndentString(indentSize - 2);
    const lines = currentValue.map((node) => {
      if (node.status === 'added') {
        return `${indent}+ ${node.key}: ${stringify(node.value, indentSize)}`;
      }
      if (node.status === 'removed') {
        return `${indent}- ${node.key}: ${stringify(node.value, indentSize)}`;
      }
      if (node.status === 'unchanged') {
        return `${indent}  ${node.key}: ${stringify(node.value, indentSize)}`;
      }
      if (node.status === 'updated') {
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
