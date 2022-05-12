const generateReplacer = (value) => {
  const replacer = ' ';
  return replacer.repeat(value);
};

const formatValue = (value, depth) => {
  const spacesCount = 4;

  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const nestedIndentSize = (spacesCount * depth);
  const nestedIndent = generateReplacer(nestedIndentSize);

  const previousDepth = depth - 1;
  const bracketIndentSize = spacesCount * previousDepth;
  const bracketIndent = generateReplacer(bracketIndentSize);

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => `${nestedIndent}${key}: ${formatValue(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

export { generateReplacer, formatValue };
