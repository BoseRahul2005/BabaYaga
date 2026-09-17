const express = require("express");
const {webhookController}=require("../controller/githubWebhookController");
const {verifyGithubWebhook}=require("../middlewares/githubWebhookVerify");
const webhookRouter = express.Router();

webhookRouter.post("/webhook",verifyGithubWebhook,webhookController);

module.exports = webhookRouter;