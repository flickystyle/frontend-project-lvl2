const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (node, previousKeys = []) => {
  const currentStatus = node.status;
  const currentChild = node.children;
  const newKeys = [...previousKeys, node.name];
  const currentProperty = newKeys.slice(1).join('.');

  switch (currentStatus) {
    case 'root':
      return currentChild.map((child) => plain(child, newKeys))
        .join('\n');
    case 'nested':
      return currentChild.children.map((child) => plain(child, newKeys))
        .filter((line) => line.length !== 0).join('\n');
    case 'unchanged':
      return '';
    case 'removed':
      return `Property '${currentProperty}' was removed`;
    case 'added':
      return `Property '${currentProperty}' was added with value: ${stringify(node.value)}`;
    case 'updated':
      return `Property '${currentProperty}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
    default:
      throw new Error(`Unknown difference: '${currentStatus}'!`);
  }
};

export default plain;
