import _ from 'lodash';
import findPath from './findPath.js';

const findDiff = (file1, file2) => {
  const parseFile1 = findPath(file1);
  const parseFile2 = findPath(file2);

  const firstFileKeys = Object.keys(parseFile1);
  const secondFileKeys = Object.keys(parseFile2);

  const sortedKeys = _.union(firstFileKeys, secondFileKeys).sort();

  const sortItems = sortedKeys.reduce((acc, key) => {
    if (_.has(parseFile1, key) && !_.has(parseFile2, key)) {
      acc[`- ${key}`] = parseFile1[key];
    } else if (!_.has(parseFile1, key) && _.has(parseFile2, key)) {
      acc[`+ ${key}`] = parseFile2[key];
    } else if (
      _.has(parseFile1, key) && _.has(parseFile2, key) && parseFile1[key] === parseFile2[key]) {
      acc[`  ${key}`] = parseFile1[key];
    } else if (
      _.has(parseFile1, key) && _.has(parseFile2, key)
              && parseFile1[key] !== parseFile2[key]
    ) {
      acc[`- ${key}`] = parseFile1[key];
      acc[`+ ${key}`] = parseFile2[key];
    } return acc;
  }, {});
  const result = JSON.stringify(sortItems, null, 2);
  return result.replace(/"/g, '').replace(/,/g, '');
};

export default findDiff;
