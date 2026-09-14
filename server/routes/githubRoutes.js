const express = require("express");
const { gitInfo } = require("../controller/githubController");
const {githubValidate} = require("../middlewares/githubValidator");
const githubRouter = express.Router();

githubRouter.post("/get-tree", githubValidate,gitInfo);

module.exports = githubRouter;
