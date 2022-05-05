import path from 'path';
import fs from 'fs';

const readContent = (filepath) => {
  const dataExtname = path.extname(filepath).slice(1);

  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, filepath);

  const content = fs.readFileSync(absolutePath, 'utf-8');

  return [content, dataExtname];
};

export default readContent;
