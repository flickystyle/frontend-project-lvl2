import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import generateDiff from '../src/generateDiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const testDataStylish = fs.readFileSync(getFixturePath('testdata-stylish.txt'), 'utf-8');
const testDataPlain = fs.readFileSync(getFixturePath('testdata-plain.txt'), 'utf-8');
const testDataJson = fs.readFileSync(getFixturePath('testdata-json.txt'), 'utf-8');

const data = [
  ['file1.json', 'file2.json', 'stylish', testDataStylish],
  ['file3.yaml', 'file4.yml', 'stylish', testDataStylish],
  ['file1.json', 'file2.json', 'plain', testDataPlain],
  ['file3.yaml', 'file4.yml', 'plain', testDataPlain],
  ['file1.json', 'file2.json', 'json', testDataJson],
  ['file3.yaml', 'file4.yml', 'json', testDataJson],
];

describe('generateDiff tests', () => {
  test.each(data)('diff between %s and %s ( %s formatter)', (filename1, filename2, formatter, expected) => {
    const file1Path = getFixturePath(filename1);
    const file2Path = getFixturePath(filename2);

    const actual = generateDiff(file1Path, file2Path, formatter);
    expect(actual).toEqual(expected);
  });
});

describe('throw an error', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yml');

  test('it throw an error on unknown formatter', () => {
    expect(() => {
      generateDiff(file1Path, file2Path, 'any');
    }).toThrowError();
  });

  const readFile = (filename) => {
    const fileExt = path.extname(filename).slice(1);
    return [fs.readFileSync(getFixturePath(filename), 'utf-8'), fileExt];
  };

  test('it throw an error on wrong file extension', () => {
    expect(() => {
      parse(readFile('errorfile.txt'));
    }).toThrowError();
  });
});
