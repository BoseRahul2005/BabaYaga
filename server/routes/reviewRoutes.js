const express = require("express");
const {manualReviewController}=require("../controller/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/review-code/:language",manualReviewController);

module.exports = reviewRouter;