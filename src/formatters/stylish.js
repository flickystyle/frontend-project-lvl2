const generateReplacer = (depth) => {
  const spacesCount = 4;
  const replacer = ' ';
  return replacer.repeat(depth * spacesCount - 2);
};

const formatValue = (value, depth, stylish) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => stylish({ status: 'unchanged', name: key, value: val }, depth + 1));
  return `{\n${lines.join('\n')}\n${generateReplacer(depth)}  }`;
};

const stylish = (node, depth = 1) => {
  const currentStatus = node.status;
  const currentChild = node.children;

  switch (currentStatus) {
    case 'root':
      return ['{',
        ...currentChild.map((child) => stylish(child)), '}',
      ].join('\n');
    case 'nested':
      return [`${generateReplacer(depth)}  ${node.name}: {`, ...currentChild.children.map((child) => stylish(child, depth + 1)), `${generateReplacer(depth)}  }`,
      ].join('\n');
    case 'unchanged':
      return `${generateReplacer(depth)}  ${node.name}: ${formatValue(node.value, depth, stylish)}`;
    case 'removed':
      return `${generateReplacer(depth)}- ${node.name}: ${formatValue(node.value, depth, stylish)}`;
    case 'added':
      return `${generateReplacer(depth)}+ ${node.name}: ${formatValue(node.value, depth, stylish)}`;
    case 'updated':
      return `${generateReplacer(depth)}- ${node.name}: ${formatValue(node.oldValue, depth, stylish)}\n${generateReplacer(depth)}+ ${node.name}: ${formatValue(node.newValue, depth, stylish)}`;
    default:
      throw new Error(`Unknown difference: '${currentStatus}'!`);
  }
};

export default stylish;
