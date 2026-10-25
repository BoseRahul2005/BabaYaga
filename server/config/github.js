const { Octokit, App } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const app= new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY_PATH,
});
module.exports = {octokit,app};
