const express = require("express");
const { gitInfo, getSourceCode } = require("../controller/githubController");
const {githubRepoValidate,githubSourceCodeValidate} = require("../middlewares/githubValidator");
const githubRouter = express.Router();

githubRouter.post("/get-tree", githubRepoValidate,gitInfo);
githubRouter.post("/get-source-code", githubSourceCodeValidate,getSourceCode);

module.exports = githubRouter;
