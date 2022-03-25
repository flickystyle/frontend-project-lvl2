import _ from 'lodash';

const makeItemsEmpty = (item) => {
  if (typeof item !== 'object' || item === null) {
    return item;
  }

  const entries = Object.entries(item);
  const result = entries.reduce((acc, [key, value]) => ({ ...acc, [key]: ['unchanged', makeItemsEmpty(value)] }), {});
  return result;
};

const findDiff = (obj1, obj2) => {
  const firstFileKeys = Object.keys(obj1);
  const secondFileKeys = Object.keys(obj2);

  const keys = _.union(firstFileKeys, secondFileKeys);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    const itemsWithEmptyDiff1 = makeItemsEmpty(obj1[key]);
    const itemsWithEmptyDiff2 = makeItemsEmpty(obj2[key]);

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { ...acc, [key]: ['removed', itemsWithEmptyDiff1] };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { ...acc, [key]: ['added', itemsWithEmptyDiff2] };
    }
    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      return { ...acc, [key]: ['unchanged', findDiff(obj1[key], obj2[key])] };
    }
    if (obj1[key] !== obj2[key]) {
      return { ...acc, [key]: ['updated', itemsWithEmptyDiff1, itemsWithEmptyDiff2] };
    }

    return { ...acc, [key]: ['unchanged', itemsWithEmptyDiff1] };
  }, {});

  return result;
};

export default findDiff;
