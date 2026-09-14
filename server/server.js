require('dotenv').config();
const express = require('express');
const reviewRouter= require("./routes/reviewRoutes.js");
const githubRouter= require("./routes/githubRoutes.js");
const app = express();
var cors = require('cors')
const port= process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//API routes
app.get('/',(req,res)=>{
    res.send('this is root page!');
});

app.use('/api/review',reviewRouter);
app.use('/api/github',githubRouter);

app.listen(port,()=>{
    console.log(`Server started on port ${port}...`);
})