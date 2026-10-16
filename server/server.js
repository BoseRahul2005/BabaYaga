require('dotenv').config();
const express = require('express');
const { clerkMiddleware, clerkClient, getAuth } = require("@clerk/express");
const reviewRouter= require("./routes/reviewRoutes.js");
const githubRouter= require("./routes/githubRoutes.js");
const webhookRouter = require("./routes/githubWebhookRoutes.js");
const clerkWebhookRouter = require("./routes/clerkWebhookRoutes.js");
const connectDB= require("./config/db.js");
const app = express();
const cors = require('cors');
const port= process.env.PORT || 3000;
//connect to DB
connectDB();

app.use(cors());
app.use('/api/clerk',clerkWebhookRouter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({verify: (req, res, buf) => {
        req.rawBody = buf;
    }}));
app.use(clerkMiddleware());

//API routes
app.get('/',(req,res)=>{
    res.send('this is root page!');
});

app.get('/protected', async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { isAuthenticated, userId } = getAuth(req)

  if (!isAuthenticated) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  // Use the `getUser()` method to get the user's User object
  const user = await clerkClient.users.getUser(userId)

  res.json({ user })
})

app.use('/api/review',reviewRouter);
app.use('/api/github',githubRouter,webhookRouter);

app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
})