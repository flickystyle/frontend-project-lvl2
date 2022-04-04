import findDiff from './findDiff.js';
import chooseFormatter from './formatters/index.js';

const generateDiff = (file1Data, file2Data, formatter = 'stylish') => {
  const diff = findDiff(file1Data, file2Data);

  return chooseFormatter(diff, formatter);
};

export default generateDiff;
