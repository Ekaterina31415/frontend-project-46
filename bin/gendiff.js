#!/usr/bin/env node

import { program } from 'commander';
import processJson from '../src/gendiff.js';
import parse from '../parsers/parser.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const data1 = parse(file1);
    const data2 = parse(file2);

    console.log(processJson(data1, data2));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
