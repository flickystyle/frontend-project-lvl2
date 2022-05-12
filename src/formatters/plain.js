const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (node, separator = '', ancestry = '') => {
  const currentStatus = node.status;
  const currentChild = node.children;
  const newAncestry = `${ancestry}${separator}${node.name}`;
  const newSeparator = '.';

  switch (currentStatus) {
    case 'root':
      return currentChild.map((child) => plain(child))
        .filter((line) => line.length !== 0).join('\n');
    case 'nested':
      return currentChild.children.map((child) => plain(child, newSeparator, `${newAncestry}`))
        .filter((line) => line.length !== 0).join('\n');
    case 'unchanged':
      return '';
    case 'removed':
      return `Property '${newAncestry}' was removed`;
    case 'added':
      return `Property '${newAncestry}' was added with value: ${stringify(node.value)}`;
    case 'updated':
      return `Property '${newAncestry}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
    default:
      throw new Error(`Unknown difference: '${currentStatus}'!`);
  }
};

export default plain;
