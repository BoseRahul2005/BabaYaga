const {octokit} = require("../config/github");

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
