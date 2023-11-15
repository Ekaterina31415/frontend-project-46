import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/gendiff.js';
import expectedResultNested from '../__fixtures__/nested-result.js';
import expectedResultPlain from '../__fixtures__/plain-result.js';
import expectedResultJson from '../__fixtures__/json-result.js';

const readFixture = (file) => {
  const data = JSON.parse(fs.readFileSync(path.resolve(`__fixtures__/${file}`), 'utf-8'));
  return data;
};

const extensions = ['json', 'yaml', 'yml'];

test.each(extensions)('stylish formatter', (ext) => {
  const fileBefore = readFixture(`file1.${ext}`);
  const fileAfter = readFixture(`file2.${ext}`);

  const current = gendiff(fileBefore, fileAfter, 'stylish');

  expect(current).toEqual(expectedResultNested);
});

test.each(extensions)('plain formatter', (ext) => {
  const fileBefore = readFixture(`file1.${ext}`);
  const fileAfter = readFixture(`file2.${ext}`);

  const current = gendiff(fileBefore, fileAfter, 'plain').split('\n');

  expect(current).toEqual(expectedResultPlain);
});

test.each(extensions)('json formatter', (ext) => {
  const fileBefore = readFixture(`file1.${ext}`);
  const fileAfter = readFixture(`file2.${ext}`);

  const current = gendiff(fileBefore, fileAfter, 'json');

  expect(current).toEqual(expectedResultJson);
});

test.each(extensions)('default formatter', (ext) => {
  const fileBefore = readFixture(`file1.${ext}`);
  const fileAfter = readFixture(`file2.${ext}`);

  const current = gendiff(fileBefore, fileAfter);

  expect(current).toEqual(expectedResultNested);
});
