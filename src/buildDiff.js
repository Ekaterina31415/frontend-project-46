import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const treePart = (key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: buildDiffTree(obj1[key], obj2[key]), status: 'nested' };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], newValue: obj2[key], status: 'updated',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  };
  const diff = keys.flatMap((key) => treePart(key));
  return diff;
};
export default buildDiffTree;
