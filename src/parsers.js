import * as yaml from 'js-yaml';

const parse = (data, fileExtname) => {
  if (fileExtname === 'json') {
    return JSON.parse(data);
  }
  if (fileExtname === 'yaml' || fileExtname === 'yml') {
    return yaml.load(data);
  }
  return console.error('extension is not supported');
};

export default parse;
