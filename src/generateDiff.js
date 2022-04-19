import findDiff from './findDiff.js';
import chooseFormatter from './formatters/index.js';
import readContent from './readContent.js';
import parse from './parsers.js';

const generateDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const file1Data = readContent(filepath1);
  const file2Data = readContent(filepath2);

  const parsedFile1 = parse(file1Data);
  const parsedFile2 = parse(file2Data);

  const diff = findDiff(parsedFile1, parsedFile2);

  return chooseFormatter(diff, formatter);
};

export default generateDiff;
