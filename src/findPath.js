import * as path from 'path';
import * as fs from 'fs';
import parse from './parsers.js';

const findPath = (filepath) => {
  const dataExtname = path.extname(filepath).slice(1);

  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, filepath);

  const content = fs.readFileSync(absolutePath, 'utf-8');
  const parsedPath = parse(content, dataExtname);

  return parsedPath;
};

export default findPath;
