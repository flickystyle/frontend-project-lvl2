import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import generateDiff from '../src/generateDiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const testDataStylish = fs.readFileSync(getFixturePath('testdata-stylish.txt'), 'utf-8');
const testDataPlain = fs.readFileSync(getFixturePath('testdata-plain.txt'), 'utf-8');
const testDataJson = fs.readFileSync(getFixturePath('testdata-json.txt'), 'utf-8');

describe('generateDiff (stylish)', () => {
  const testData = testDataStylish.trim().split('\n\n\n');

  const data = [
    ['file1.json', 'file1.json', testData[0]],
    ['file1.json', 'file2.json', testData[1]],
    ['file2.json', 'file1.json', testData[2]],
    ['file3.yaml', 'file3.yaml', testData[0]],
    ['file3.yaml', 'file4.yml', testData[1]],
    ['file4.yml', 'file3.yaml', testData[2]],
  ];

  test.each(data)('difference between %s and %s', (filename1, filename2, expected) => {
    const file1Path = getFixturePath(filename1);
    const file2Path = getFixturePath(filename2);

    const actual = generateDiff(file1Path, file2Path);
    expect(actual).toEqual(expected);
  });
});

describe('generateDiff (plain)', () => {
  const testData = testDataPlain.trim().split('\n\n\n');

  const data = [
    ['file1.json', 'file1.json', 'plain', ''],
    ['file1.json', 'file2.json', 'plain', testData[0]],
    ['file2.json', 'file1.json', 'plain', testData[1]],
    ['file3.yaml', 'file3.yaml', 'plain', ''],
    ['file3.yaml', 'file4.yml', 'plain', testData[0]],
    ['file4.yml', 'file3.yaml', 'plain', testData[1]],
  ];

  test.each(data)('difference between %s and %s', (filename1, filename2, formatter, expected) => {
    const file1Path = getFixturePath(filename1);
    const file2Path = getFixturePath(filename2);

    const actual = generateDiff(file1Path, file2Path, formatter);
    expect(actual).toEqual(expected);
  });
});

describe('generateDiff (json formatter)', () => {
  const testData = testDataJson.trim().split('\n\n\n');

  const data = [
    ['file1.json', 'file1.json', 'json', testData[0]],
    ['file1.json', 'file2.json', 'json', testData[1]],
    ['file2.json', 'file1.json', 'json', testData[2]],
    ['file3.yaml', 'file3.yaml', 'json', testData[0]],
    ['file3.yaml', 'file4.yml', 'json', testData[1]],
    ['file4.yml', 'file3.yaml', 'json', testData[2]],
  ];

  test.each(data)('difference between %s and %s', (filename1, filename2, formatter, expected) => {
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
