import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

const chooseFormatter = (difference, formatter) => {
  if (formatter === 'stylish') {
    return stylish(difference);
  }

  if (formatter === 'plain') {
    return plain(difference);
  }
  if (formatter === 'json') {
    return jsonFormatter(difference);
  }
  throw new Error('gendiff is not available for this format');
};

export default chooseFormatter;
