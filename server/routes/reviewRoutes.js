const express = require("express");
const { createReviewService } = require("../services/reviewService");
const reviewRouter = express.Router();

reviewRouter.post("/review-code/:language", createReviewService);

module.exports = reviewRouter;