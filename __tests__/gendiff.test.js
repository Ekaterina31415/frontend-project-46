import path from 'path';
import fs from 'fs';
import { test, expect } from '@jest/globals';
import yaml from 'js-yaml';
import compareObjects from '../src/gendiff.js';
import expectedResultNested from '../__fixtures__/nested-result.js';
import expectedResultPlain from '../__fixtures__/plain-result.js';

test('compare 2 .json files with stylish formatter', () => {
  const data1 = JSON.parse(fs.readFileSync(path.resolve('__fixtures__/file1.json'), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve('__fixtures__/file2.json'), 'utf-8'));

  const current = compareObjects(data1, data2);

  expect(current).toEqual(expectedResultNested);
});

test('compare 2 .yml or .yaml files with stylish formatter', () => {
  const data1 = yaml.load(fs.readFileSync(path.resolve('__fixtures__/file1.yaml'), 'utf-8'));
  const data2 = yaml.load(fs.readFileSync(path.resolve('__fixtures__/file2.yml'), 'utf-8'));

  const current = compareObjects(data1, data2, 'plain');

  expect(current).toEqual(expectedResultNested);
});

test('compare 2 .json files with plain formatter', () => {
  const data1 = yaml.load(fs.readFileSync(path.resolve('__fixtures__/file1.yaml'), 'utf-8'));
  const data2 = yaml.load(fs.readFileSync(path.resolve('__fixtures__/file2.yml'), 'utf-8'));

  const current = compareObjects(data1, data2).split('\n');

  expect(current).toEqual(expectedResultPlain);
});
