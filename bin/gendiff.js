#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version ', '0.0.1')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');
    

program.parse();


