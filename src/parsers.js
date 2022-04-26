import * as yaml from 'js-yaml';

const parse = (content, fileExtname) => {
  switch (fileExtname) {
    case ('json'):
      return JSON.parse(content);
    case ('yaml'):
      return yaml.load(content);
    case ('yml'):
      return yaml.load(content);
    default:
      throw new Error('gendiff is not available for this extension');
  }
};

export default parse;
