const path = require("path");

exports.filterFiles = (tree) => {
  const toIgnore = [
    "node_modules",
    ".git",
    ".vscode",
    ".idea",
    "dist",
    "build",
    "coverage",
  ];

  const toAccept = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".c",
    ".cpp",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".rb",
  ];

  const filteredTree = tree.filter((file) => {
    const splittedFilePath = file.path.split("/");

    const isInsideIgnoredFolder = splittedFilePath.some((folderName) =>
      toIgnore.includes(folderName)
    );

    if (isInsideIgnoredFolder) return false;

    if (file.type !== "blob") return false;

    const ext = path.extname(file.path);

    if (!toAccept.includes(ext)) return false;

    return true;
  });

  return filteredTree;
};

exports.filterPullRequestFiles = (files) => {
  const toIgnore = [
    "node_modules",
    ".git",
    ".vscode",
    ".idea",
    "dist",
    "build",
    "coverage",
  ];

  const toAccept = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".c",
    ".cpp",
    ".cs",
    ".go",
    ".rs",
    ".php",
    ".rb",
  ];

  const filteredFiles = files.filter((file) => {
    if (!file.patch) return false;

  const splittedFilePath = file.filename.split("/");

    const isInsideIgnoredFolder = splittedFilePath.some((folderName) =>
      toIgnore.includes(folderName)
    );

    if(isInsideIgnoredFolder) return false;

    const ext = path.extname(file.filename);

    if(!toAccept.includes(ext)) return false;

    return true;
  });
  return filteredFiles;
};