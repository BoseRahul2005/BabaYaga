const {octokit} = require("../config/github");
const {filterFiles} = require("../utils/fileFilter");

exports.getRepoInfo = async (owner, repo) => {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });

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

exports.getFileContent= async(owner,repo,branch,filepath)=>{
    try{
        const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: owner,
            repo: repo,
            path: filepath,
            ref: branch,
        });
        const sourceCode= Buffer.from(response.data.content,"base64").toString("utf-8");
        return sourceCode;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

exports.getPullRequestFiles= async(owner, repo, prNumber)=>{
    try{
        const response = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
            owner: owner,
            repo: repo,
            pull_number: prNumber
        });
        return response.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}