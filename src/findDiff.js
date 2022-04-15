import _ from 'lodash';

const makeNodesEmpty = (item) => {
  if (typeof item !== 'object' || item === null) {
    return item;
  }

  const entries = Object.entries(item);
  const result = entries.reduce((acc, [key, value]) => ([...acc, { name: key, difference: 'unchanged', value: makeNodesEmpty(value) }]), []);
  return result;
};

const findDiff = (obj1, obj2) => {
  const firstFileKeys = Object.keys(obj1);
  const secondFileKeys = Object.keys(obj2);

  const keys = _.union(firstFileKeys, secondFileKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    const nodeWithEmptyDiff1 = makeNodesEmpty(obj1[key]);
    const nodeWithEmptyDiff2 = makeNodesEmpty(obj2[key]);

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, { name: key, difference: 'removed', value: nodeWithEmptyDiff1 }];
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, { name: key, difference: 'added', value: nodeWithEmptyDiff2 }];
    }
    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      return [...acc, { name: key, difference: 'unchanged', value: findDiff(obj1[key], obj2[key]) }];
    }
    if (obj1[key] !== obj2[key]) {
      return [...acc, {
        name: key, difference: 'updated', value: nodeWithEmptyDiff1, updatedValue: nodeWithEmptyDiff2,
      }];
    }

    return [...acc, { name: key, difference: 'unchanged', value: nodeWithEmptyDiff1 }];
  }, []);

  return result;
};

export default findDiff;
