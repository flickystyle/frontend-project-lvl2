import * as yaml from 'js-yaml';

const parse = (data, fileExtname) => {
  if (fileExtname === 'json') {
    return JSON.parse(data);
  }
  if (fileExtname === 'yaml' || fileExtname === 'yml') {
    return yaml.load(data);
  }
  return null;
};

export default parse;
