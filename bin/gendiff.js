#!/usr/bin/env node

import { program } from 'commander';
import compareObjects from '../src/gendiff.js';
import parse from '../parsers/parser.js';
import formatSelection from '../formatters/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2> [format]')
  .action((file1, file2, format = 'stylish') => {
    const data1 = parse(file1);
    const data2 = parse(file2);

    const outputStyle = formatSelection(format);

    console.log(outputStyle(compareObjects(data1, data2)));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
