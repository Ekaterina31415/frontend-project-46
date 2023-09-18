#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

function processJson(data1, data2) {
  const keys1 = _.sortBy(Object.keys(data1));
  const keys2 = _.sortBy(Object.keys(data2));

  let output = '';

  for (let key of keys1) {
    if (!keys2.includes(key)) {
      output += `- ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      output += `- ${key}: ${data1[key]}\n`;
      output += `+ ${key}: ${data2[key]}\n`;
    } else {
      output += `  ${key}: ${data1[key]}\n`
    }
  }

  for (let key of keys2) {
    if (!keys1.includes(key)) {
      output += `+ ${key}: ${data2[key]}\n`;
    }
  }

  return output;
}

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const file1Ext = path.extname(file1);
    const file2Ext = path.extname(file2);

    if (file1Ext !== '.json' || file2Ext !== '.json') {
        console.error("Поддерживаются только файлы формата .json");
        return;
    }

    const data1 = JSON.parse(fs.readFileSync(path.resolve(file1), 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(path.resolve(file2), 'utf-8'));

    console.log(processJson(data1, data2));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}