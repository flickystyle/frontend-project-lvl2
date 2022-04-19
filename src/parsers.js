import * as yaml from 'js-yaml';

const parse = (data) => {
  const [content, fileExtname] = data;

  if (fileExtname === 'json') {
    return JSON.parse(content);
  }
  if (fileExtname === 'yaml' || fileExtname === 'yml') {
    return yaml.load(content);
  }
  throw new Error('gendiff is not available for this extension');
};

export default parse;
