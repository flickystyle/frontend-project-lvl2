const stylish = (value) => {
  const replacer = ' ';
  const spacesCount = 4;

  const iter = (currentValue, depth) => {
    if (!Array.isArray(currentValue)) {
      return `${currentValue}`;
    }

    const diffIndentSize = 2;
    const indentSize = (spacesCount * depth) - diffIndentSize;
    const currentIndent = replacer.repeat(indentSize);

    const previousDepth = depth - 1;
    const bracketIndentSize = spacesCount * previousDepth;
    const bracketIndent = replacer.repeat(bracketIndentSize);

    const diffs = { removed: '-', added: '+', unchanged: ' ' };

    const lines = currentValue
      .map((key) => {
        const keyName = key.name;
        const currentDiff = key.difference;
        const unmodifiedValue = key.value;
        const modifiedValue = key.updatedValue;

        if (currentDiff === 'updated') {
          return `${currentIndent}${diffs.removed} ${keyName}: ${iter(unmodifiedValue, depth + 1)}\n${currentIndent}${diffs.added} ${keyName}: ${iter(modifiedValue, depth + 1)}`;
        }

        return `${currentIndent}${diffs[currentDiff]} ${keyName}: ${iter(unmodifiedValue, depth + 1)}`;
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
