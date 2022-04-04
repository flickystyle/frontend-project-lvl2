import path from 'path';

const stringify = (val) => {
  if (val !== null && typeof val === 'object') {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const plain = (itemValue) => {
  const iter = (currentValue, ancestry) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return '';
    }

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const newAncestry = (path.join(ancestry, key)).replaceAll('/', '.');
        const currentDiff = val[0];
        const unmodifiedValue = stringify(val[1]);
        const modifiedValue = stringify(val[2]);

        if (currentDiff === 'unchanged') {
          return iter(val[1], newAncestry);
        }
        if (currentDiff === 'removed') {
          return `Property '${newAncestry}' was removed`;
        }

        if (currentDiff === 'added') {
          return `Property '${newAncestry}' was added with value: ${unmodifiedValue}`;
        }

        return `Property '${newAncestry}' was updated. From ${unmodifiedValue} to ${modifiedValue}`;
      })
      .filter((line) => line.length !== 0);

    return lines.join('\n');
  };

  return iter(itemValue, '');
};

export default plain;
