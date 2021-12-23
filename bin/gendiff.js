#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version ', '1.0.0');
  
program.parse();


