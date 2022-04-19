import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import generateDiff from '../src/generateDiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('generateDiff for json (stylish)', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('testdata-stylish.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('difference between same files', () => {
    const expected = expectedData[0];
    const actual = generateDiff(file1Path, file1Path);

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = generateDiff(file1Path, file2Path);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = generateDiff(file2Path, file1Path);

    expect(actual2).toEqual(expected2);
  });
});

describe('generateDiff for yaml (stylish)', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yml');

  const expectedFile = fs.readFileSync(getFixturePath('testdata-stylish.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('difference between same files', () => {
    const expected = expectedData[0];
    const actual = generateDiff(file1Path, file1Path);

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = generateDiff(file1Path, file2Path);

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = generateDiff(file2Path, file1Path);

    expect(actual2).toEqual(expected2);
  });
});

describe('generateDiff for json (plain)', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('testdata-plain.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('difference between same files', () => {
    const expected = '';
    const actual = generateDiff(file1Path, file1Path, 'plain');

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[0];
    const actual1 = generateDiff(file1Path, file2Path, 'plain');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[1];
    const actual2 = generateDiff(file2Path, file1Path, 'plain');

    expect(actual2).toEqual(expected2);
  });
});

describe('generateDiff for yaml (plain)', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yml');

  const expectedFile = fs.readFileSync(getFixturePath('testdata-plain.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('difference between same files', () => {
    const expected = '';
    const actual = generateDiff(file1Path, file1Path, 'plain');

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[0];
    const actual1 = generateDiff(file1Path, file2Path, 'plain');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[1];
    const actual2 = generateDiff(file2Path, file1Path, 'plain');

    expect(actual2).toEqual(expected2);
  });
});

describe('generateDiff for json (json formatter)', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');

  const expectedFile = fs.readFileSync(getFixturePath('testdata-json.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('difference between same files', () => {
    const expected = expectedData[0];
    const actual = generateDiff(file1Path, file1Path, 'json');

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = generateDiff(file1Path, file2Path, 'json');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = generateDiff(file2Path, file1Path, 'json');

    expect(actual2).toEqual(expected2);
  });
});

describe('generateDiff for yaml (json formatter)', () => {
  const file1Path = getFixturePath('file3.yaml');
  const file2Path = getFixturePath('file4.yml');

  const expectedFile = fs.readFileSync(getFixturePath('testdata-json.txt'), 'utf-8');
  const expectedData = expectedFile.trim().split('\n\n\n');

  test('difference between same files', () => {
    const expected = expectedData[0];
    const actual = generateDiff(file1Path, file1Path, 'json');

    expect(actual).toEqual(expected);
  });

  test('difference between different files', () => {
    const expected1 = expectedData[1];
    const actual1 = generateDiff(file1Path, file2Path, 'json');

    expect(actual1).toEqual(expected1);

    const expected2 = expectedData[2];
    const actual2 = generateDiff(file2Path, file1Path, 'json');

    expect(actual2).toEqual(expected2);
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
