import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const build = (key, obj1, obj2) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 && val2) {
      if (val1 === val2 || (_.isObject(val1) && _.isObject(val2))) {
        const children = _.isObject(val2) ? buildDiff(val1, val2) : [];
        return {
          key,
          children,
          type: 'unchanged',
          value: _.isObject(val1) ? null : val1,
        };
      } else if (val1 !== val2) {
        const children = _.isObject(val2) ? buildDiff(val1, val2) : [];
        return {
          key,
          children,
          type: 'changed',
          val1: _.isObject(val1) ? null : val1,
          val2: _.isObject(val2) ? null : val2,
        };
      }
    } else if (val1) {
      return {
        key,
        type: 'deleted',
      };
    } else if (val2) {
      return {
        key,
        type: 'added',
        value: _.isObject(val2) ? null : val2,
      };
    }
  };

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = {};
  for (const key of keys) {
    result[key] = build(key, obj1, obj2);
  }

  return result;
};
export default buildDiff;
