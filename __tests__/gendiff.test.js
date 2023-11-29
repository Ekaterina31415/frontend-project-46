import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';

const nestedResult = fs.readFileSync('./__fixtures__/nested-result.txt', 'utf-8');
const plainResult = fs.readFileSync('./__fixtures__/plain-result.txt', 'utf-8');
const jsonResult = fs.readFileSync('./__fixtures__/json-result.txt', 'utf-8');

const readFixture = (file) => {
  const data = path.resolve(process.cwd(), `__fixtures__/${file}`);
  return data;
};

const extensions = ['json', 'yaml', 'yml'];

test.each(extensions)('get difference between 2 files', (ext) => {
  const fileBefore = readFixture(`file1.${ext}`);
  const fileAfter = readFixture(`file2.${ext}`);

  expect(gendiff(fileBefore, fileAfter, 'stylish')).toEqual(nestedResult);
  expect(gendiff(fileBefore, fileAfter, 'plain')).toEqual(plainResult);
  expect(gendiff(fileBefore, fileAfter, 'json')).toEqual(jsonResult);
  expect(gendiff(fileBefore, fileAfter)).toEqual(nestedResult);
});
