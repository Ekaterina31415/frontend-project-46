import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import processJson from '../src/gendiff.js';
import expectedResult from '../__fixtures__/result.js';

test('compare 2 .json files', () => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve('__fixtures__/file1.json'), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve('__fixtures__/file2.json'), 'utf-8'));

  expect(processJson(data1, data2)).toEqual(expectedResult);
});
