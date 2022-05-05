const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (node) => {
  const iter = (currentNode, ancestry, separator) => {
    const lines = currentNode.root
      .map((child) => {
        const newAncestry = `${ancestry}${separator}${child.name}`;
        const currentStatus = child.status;
        const newSeparator = '.';

        switch (currentStatus) {
          case 'nested':
            return iter(child.children, newAncestry, newSeparator);
          case 'unchanged':
            return '';
          case 'removed':
            return `Property '${newAncestry}' was removed`;
          case 'added':
            return `Property '${newAncestry}' was added with value: ${stringify(child.value)}`;
          case 'updated':
            return `Property '${newAncestry}' was updated. From ${stringify(child.oldValue)} to ${stringify(child.newValue)}`;
          default:
            throw new Error(`Unknown difference: '${currentStatus}'!`);
        }
      })
      .filter((line) => line.length !== 0);

    return lines.join('\n');
  };

  return iter(node, '', '');
};

export default plain;
