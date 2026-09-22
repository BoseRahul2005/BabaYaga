const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.BREVO_API_KEY,
});
module.exports = {octokit};
