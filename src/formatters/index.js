import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormatter from './json.js';

const chooseFormatter = (difference, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return jsonFormatter(difference);
    default:
      throw new Error(`gendiff is not available for this formatter >${formatter}<`);
  }
};

export default chooseFormatter;
