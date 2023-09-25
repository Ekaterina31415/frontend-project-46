#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';
import processJson from '../src/gendiff.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const file1Ext = path.extname(file1);
    const file2Ext = path.extname(file2);

    if (file1Ext !== '.json' || file2Ext !== '.json') {
      console.error('Only .json files are supported');
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
