import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const getParseFileData = (filePath) => JSON.parse(readFileSync(path.resolve('__fixtures__', filePath)));
     
const findDiff = (file1,file2) => {
    const parseFile1 = getParseFileData(file1);
    const parseFile2 = getParseFileData(file2);
    
 const parseFile1Keys = Object.keys(parseFile1);
 const parseFile2Keys = Object.keys(parseFile2);

 const sortedKeys = _.union(parseFile1Keys, parseFile2Keys).sort();
 
 const result = sortedKeys.reduce((acc, key) => {
    if (_.has(parseFile1, key) && !_.has(parseFile2, key)) {
              acc[`- ${key}`] = parseFile1[key];
            }
             else if (!_.has(parseFile1, key) && _.has(parseFile2, key)) {
              acc[`+ ${key}`] = parseFile2[key];
            }else if (
              _.has(parseFile1, key) && _.has(parseFile2, key) && parseFile1[key] === parseFile2[key]) {
              acc[`  ${key}`] = parseFile1[key];
            } else if (
              _.has(parseFile1, key) && _.has(parseFile2, key) &&
              parseFile1[key] !== parseFile2[key]
            ) {
              acc[`- ${key}`] = parseFile1[key];
              acc[`+ ${key}`] = parseFile2[key];
            } return acc;
}, {});
 return JSON.stringify(result, null, 2);
}; 
 
export default findDiff;