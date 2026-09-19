exports.extractChangedLines = (diff) => {
  const hunkHeaderRegex = /^@@ .* @@/gm;
  const hunks = diff.match(hunkHeaderRegex) || [];
  const values = hunks.map((hunk) => {
    const splittedHunk = hunk.split(" ");
    const [startLine, lineCount] = splittedHunk[2].slice(1).split(",");
    return {
      startLine: Number(startLine),
      lineCount: lineCount ? Number(lineCount) : 1,
    };
  });
  return values;
};
