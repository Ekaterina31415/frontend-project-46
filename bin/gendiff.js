#!/usr/bin/env node

import { program } from 'commander';
import compareObjects from '../src/gendiff.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2> [format]')
  .action((file1, file2, format) => {
    console.log(compareObjects(file1, file2, format));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
