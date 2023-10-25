import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const threePart = (key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], status: 'added' };
    } else if (!_.has(obj2, key)) {
      return { key, value: obj1[key], status: 'removed' };
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: buildDiff(obj1[key], obj2[key]), status: 'nested' };
    } else if (obj1[key] !== obj2[key]) {
      return {
        key, oldValue: obj1[key], newValue: obj2[key], status: 'updated',
      };
    }
    return { key, value: obj1[key], status: 'unchanged' };
  };
  return keys.flatMap((key) => threePart(key));
};
export default buildDiff;
