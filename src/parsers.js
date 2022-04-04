import * as yaml from 'js-yaml';

const parse = (data, fileExtname) => {
  if (fileExtname === 'json') {
    return JSON.parse(data);
  }
  if (fileExtname === 'yaml' || fileExtname === 'yml') {
    return yaml.load(data);
  }
  throw new Error('gendiff is not available for this extension');
};

export default parse;
