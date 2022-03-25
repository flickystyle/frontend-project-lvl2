import findDiff from './findDiff.js';
import stylish from './stylish.js';

const generateDiff = (file1Data, file2Data, formater = 'stylish') => {
  const difference = findDiff(file1Data, file2Data);

  if (formater !== 'stylish') {
    throw new Error(`extenshion isn't available for ${formater} format`);
  }
  return stylish(difference);
};

export default generateDiff;
