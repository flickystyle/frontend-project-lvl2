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

const correctAnswer = JSON.stringify(answer, null, 2);

test('fenDiff', () => {
  expect(findDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(correctAnswer);
});
