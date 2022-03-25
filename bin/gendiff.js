#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import findPath from '../src/findPath.js';
import generateDiff from '../src/findDiff.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1Data = findPath(filepath1);
    const file2Data = findPath(filepath2);

    const options = program.opts();

    const result = stylish(generateDiff(file1Data, file2Data, options.format));

    console.log(result);
  });

program.parse();
