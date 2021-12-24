#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'
import findDiff from '../src/findDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(findDiff(filepath1, filepath2));
  });
    

program.parse();


