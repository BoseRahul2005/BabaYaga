const express = require("express");
const { gitInfo, getSourceCode } = require("../controller/githubController.js");
const {githubRepoValidate,githubSourceCodeValidate} = require("../middlewares/githubValidator.js");
const {associateGitHubInstallation, startGitHubOAuth,handleGitHubOAuthCallback}=require("../controller/githubInstallationController.js");
const githubRouter = express.Router();

githubRouter.post("/get-tree", githubRepoValidate,gitInfo);
githubRouter.post("/get-source-code", githubSourceCodeValidate,getSourceCode);
githubRouter.post("/associate-installation",associateGitHubInstallation);
githubRouter.get("/oauth/callback", handleGitHubOAuthCallback);
githubRouter.get("/start-oauth", startGitHubOAuth);
module.exports = githubRouter;
