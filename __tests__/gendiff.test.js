import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import findDiff from '../src/findDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const answer = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true,
};
const result = JSON.stringify(answer, null, 2);
const correctAnswer = result.replace(/"/g, '').replace(/,/g, '');

test('findDiffJson', () => {
  expect(findDiff(getFixturePath('oldfile1.json'), getFixturePath('oldfile2.json'))).toEqual(correctAnswer);
});
test('findDiffYaml', () => {
  expect(findDiff(getFixturePath('file3.yaml'), getFixturePath('file4.yml'))).toEqual(correctAnswer);
});
// test('anotherFormat',() =>{
// })
