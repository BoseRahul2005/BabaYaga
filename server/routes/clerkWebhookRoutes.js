const express=require("express");
const clerkWebhookRouter= express.Router();
const {clerkWebhookController}=require("../controller/clerkWebhookController.js");

clerkWebhookRouter.post("/webhook",express.raw({type:"application/json"}),clerkWebhookController);

module.exports=clerkWebhookRouter;