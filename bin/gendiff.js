#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import generateDiff from '../src/generateDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();

    const result = generateDiff(filepath1, filepath2, options.format);

    console.log(result);
  });

program.parse();
