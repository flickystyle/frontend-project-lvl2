import findDiff from './findDiff.js';
import chooseFormatter from './formatters/index.js';
import readContent from './readContent.js';
import parse from './parsers.js';

const generateDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const [firstFileContent, firstFileExtName] = readContent(filepath1);
  const [secondFileContent, secondFileExtName] = readContent(filepath2);

  const firstParsedFile = parse(firstFileContent, firstFileExtName);
  const secondParsedFile = parse(secondFileContent, secondFileExtName);

  const diff = findDiff(firstParsedFile, secondParsedFile);

  return chooseFormatter(diff, formatter);
};

export default generateDiff;
