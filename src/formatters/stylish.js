import _ from 'lodash';

const spacesCount = 4;
const getIndent = (depth) => ' '.repeat(depth * spacesCount - 2);

const signs = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const keys = _.keys(value);
  const result = keys.map((key) => {
    const childValue = value[key];
    return `${getIndent(depth)}  ${key}: ${stringify(childValue, depth + 1)}\n`;
  });
  return `{\n${result.join('')}${getIndent(depth - 1)}  }`;
};

const getDiffTree = (nodes) => {
  const iter = (node, depth = 1) => {
    switch (node.status) {
      case 'nested':
        return `\n${getIndent(depth)}  ${node.key}: {${node.children.map((child) => iter(child, depth + 1)).join('')}\n${getIndent(depth)}  }`;
      case 'updated':
        return `\n${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      case 'unchanged':
      case 'added':
      case 'removed':
        return `\n${getIndent(depth)}${signs[node.status]}${node.key}: ${stringify(node.value, depth + 1)}`;
      default:
        throw new Error(`Type: ${node.status} is unknown.`);
    }
  };
  return iter(nodes);
};

const stylishOutput = (diffTree) => {
  const result = diffTree.map((nodes) => getDiffTree(nodes));
  return `{${result.join('')}\n}`;
};

export default stylishOutput;
