const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
module.exports = {octokit};
