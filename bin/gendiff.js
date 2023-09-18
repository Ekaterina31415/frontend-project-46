#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';

function processJson(filepath1, filepath2) {
  const data1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'));
  const data2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf-8'));

  if (typeof data1 !== 'object' || data1 === null || Array.isArray(data1) ||
      typeof data2 !== 'object' || data2 === null || Array.isArray(data2)) {
        console.error('One or both files do not includes odject type');
        return;
      }

  const keys1 = Object.keys(data1).sort();
  const keys2 = Object.keys(data2).sort();

  let output = '';

  for (let key of keys1) {
    if (!keys2.includes(key)) {
      output += `- ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      output += `- ${key}: ${data1[key]}\n`;
      output += `+ ${key}: ${data2[key]}\n`;
    } else {
      output += `  ${key}: ${data1[key]}\n`;
    }
  }

  for (let key of keys2) {
    if (!keys1.includes(key)) {
      output += `+ ${key}: ${data2[key]}\n`;
    }
  }

  console.log(output);
}

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    processJson(filepath1, filepath2);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}