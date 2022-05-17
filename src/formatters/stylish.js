import { generateReplacer, formatValue } from './replacerAndFormat.js';

const stylish = (node, depth = 1) => {
  const spacesCount = 4;

  const diffIndentSize = 2;
  const indentSize = (spacesCount * depth) - diffIndentSize;
  const currentIndent = generateReplacer(indentSize);

  const previousDepth = depth - 1;
  const bracketIndentSize = spacesCount * previousDepth;
  const bracketIndent = generateReplacer(bracketIndentSize);

  const currentStatus = node.status;
  const currentChild = node.children;

  switch (currentStatus) {
    case 'root':
      return ['{',
        ...currentChild.map((child) => stylish(child)), `${bracketIndent}}`,
      ].join('\n');
    case 'nested':
      return [`${currentIndent}  ${node.name}: {`, ...currentChild.children.map((child) => stylish(child, depth + 1)), `${bracketIndent}    }`,
      ].join('\n');
    case 'unchanged':
      return `${currentIndent}  ${node.name}: ${formatValue(node.value, depth + 1)}`;
    case 'removed':
      return `${currentIndent}- ${node.name}: ${formatValue(node.value, depth + 1)}`;
    case 'added':
      return `${currentIndent}+ ${node.name}: ${formatValue(node.value, depth + 1)}`;
    case 'updated':
      return `${currentIndent}- ${node.name}: ${formatValue(node.oldValue, depth + 1)}\n${currentIndent}+ ${node.name}: ${formatValue(node.newValue, depth + 1)}`;
    default:
      throw new Error(`Unknown difference: '${currentStatus}'!`);
  }
};

export default stylish;
