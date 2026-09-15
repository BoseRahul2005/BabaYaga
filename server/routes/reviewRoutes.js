const express = require("express");
const {reviewController}=require("../controller/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/review-code/:language",reviewController);

module.exports = reviewRouter;