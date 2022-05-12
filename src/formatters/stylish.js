import { generateReplacer, formatValue } from './replacerAndFormat.js';

const stylish = (node) => {
  const spacesCount = 4;
  const iter = (currentNode, depth) => {
    const diffIndentSize = 2;
    const indentSize = (spacesCount * depth) - diffIndentSize;
    const currentIndent = generateReplacer(indentSize);

    const previousDepth = depth - 1;
    const bracketIndentSize = spacesCount * previousDepth;
    const bracketIndent = generateReplacer(bracketIndentSize);

    const lines = currentNode.children
      .map((child) => {
        const currentStatus = child.status;
        switch (currentStatus) {
          case 'nested':
            return `${currentIndent}  ${child.name}: ${iter(child.children, depth + 1)}`;
          case 'unchanged':
            return `${currentIndent}  ${child.name}: ${formatValue(child.value, depth + 1)}`;
          case 'removed':
            return `${currentIndent}- ${child.name}: ${formatValue(child.value, depth + 1)}`;
          case 'added':
            return `${currentIndent}+ ${child.name}: ${formatValue(child.value, depth + 1)}`;
          case 'updated':
            return `${currentIndent}- ${child.name}: ${formatValue(child.oldValue, depth + 1)}\n${currentIndent}+ ${child.name}: ${formatValue(child.newValue, depth + 1)}`;
          default:
            throw new Error(`Unknown difference: '${currentStatus}'!`);
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(node, 1);
};

export default stylish;
