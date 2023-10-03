import _ from 'lodash';

const compareObjects = (obj1, obj2) => {
  const result = {};

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  for (const key of obj1Keys) {
    if (!obj2Keys.includes(key)) {
      result[`- ${key}`] = obj1[key];
    } else if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const diff = compareObjects(obj1[key], obj2[key]);
      if (!_.isEmpty(diff)) {
        result[`  ${key}`] = diff;
      }
    } else if (!_.isEqual(obj1[key], obj2[key])) {
      result[`- ${key}`] = obj1[key];
      result[`+ ${key}`] = obj2[key];
    } else {
      result[`  ${key}`] = obj1[key];
    }
  }

  for (const key of obj2Keys) {
    if (!obj1Keys.includes(key)) {
      result[`+ ${key}`] = obj2[key];
    }
  }

  return result;
};

export default compareObjects;
