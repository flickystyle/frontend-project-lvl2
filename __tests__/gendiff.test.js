import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import generateDiff from '../src/generateDiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => {
  const fileExt = path.extname(filename).slice(1);
  return parse(fs.readFileSync(getFixturePath(filename), 'utf-8'), fileExt);
};

describe('generateDiff for json', () => {
  let file1Content;
  let file2Content;
  let expectedData;

  beforeAll(() => {
    file1Content = readFile('file1.json');
    file2Content = readFile('file2.json');

    const expectedFile = fs.readFileSync(getFixturePath('testdata.txt'), 'utf-8');
    expectedData = expectedFile.trim().split('\n\n\n');
  });

  test('difference between same files', () => {
    const expected = expectedData[0];
    const actual = generateDiff(file1Content, file1Content);

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = generateDiff(file1Content, file2Content);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = generateDiff(file2Content, file1Content);

    expect(actual2).toEqual(expected2);
  });
});

describe('generateDiff for yaml', () => {
  let file1Content;
  let file2Content;
  let expectedData;

  beforeAll(() => {
    file1Content = readFile('file3.yaml');
    file2Content = readFile('file4.yml');

    const expectedFile = fs.readFileSync(getFixturePath('testdata.txt'), 'utf-8');
    expectedData = expectedFile.trim().split('\n\n\n');
  });
  test('show difference between same files', () => {
    const expected = expectedData[0];
    const actual = generateDiff(file1Content, file1Content);

    expect(actual).toEqual(expected);
  });

  test('show difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = generateDiff(file1Content, file2Content);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = generateDiff(file2Content, file1Content);

    expect(actual2).toEqual(expected2);
  });
  console.log(file1Content);
});
