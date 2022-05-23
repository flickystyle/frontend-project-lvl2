import _ from 'lodash';

const findDiff = (obj1, obj2) => {
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);

  const keys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { name: key, status: 'removed', value: obj1[key] };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { name: key, status: 'added', value: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { name: key, status: 'nested', children: findDiff(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        name: key, status: 'updated', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return { name: key, status: 'unchanged', value: obj1[key] };
  });

  return { status: 'root', children: result };
};

export default findDiff;
