import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);

  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, { name: key, status: 'removed', value: obj1[key] }];
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, { name: key, status: 'added', value: obj2[key] }];
    }
    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      return [...acc, { name: key, status: 'nested', children: findDiff(obj1[key], obj2[key]) }];
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return [...acc, {
        name: key, status: 'updated', oldValue: obj1[key], newValue: obj2[key],
      }];
    }
    return [...acc, { name: key, status: 'unchanged', value: obj1[key] }];
  }, []);

  return result;
};

export default findDiff;
