import fs from 'fs';
import path from 'path';
import buildDiffTree from './buildDiff.js';
import parse from './parsers/parser.js';
import formatSelection from './formatters/index.js';

const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const gendiff = (path1, path2, format = 'stylish') => {
  const absolutePath1 = makeAbsolutePath(path1);
  const absolutePath2 = makeAbsolutePath(path2);
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
