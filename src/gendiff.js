import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers/parser.js';
import formatSelection from './formatters/index.js';

const isAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const threePart = (key) => {
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
  const diff = keys.flatMap((key) => threePart(key));
  return diff;
};

const gendiff = (path1, path2, format = 'stylish') => {
  const absolutePath1 = isAbsolutePath(path1);
  const absolutePath2 = isAbsolutePath(path2);
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);

  const fileContent1 = fs.readFileSync(absolutePath1, 'utf8');
  const fileContent2 = fs.readFileSync(absolutePath2, 'utf8');

  const parsedData1 = parse(fileContent1, ext1);
  const parsedData2 = parse(fileContent2, ext2);

  const diff = buildDiffTree(parsedData1, parsedData2);

  const outputFormat = formatSelection(format);
  return outputFormat(diff);
};

export default gendiff;
