import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormatter = (difference, formatter) => {
  switch (formatter) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return JSON.stringify(difference);
    default:
      throw new Error(`gendiff is not available for this formatter >${formatter}<`);
  }
};

export default chooseFormatter;
