const {octokit} = require("../config/github");
const {filterFiles} = require("../utils/fileFilter");

exports.getRepoInfo = async (owner, repo) => {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getFilteredRepoTree = async (owner, repo, branch) => {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/git/trees/{tree_sha}", {
      owner: owner,
      repo: repo,
      tree_sha: branch,
      recursive: 1,
    });
    const tree= response.data.tree;
    return filterFiles(tree);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
