const {parseEvent} = require("../utils/parsePullRequestEvent");
const {getPullRequestFiles} = require("../services/githubServices");
const {filterPullRequestFiles} = require("../utils/fileFilter");
const {normalizePRFiles} = require("../utils/normalizePullRequestFiles");
exports.webhookController= async(req,res)=>{
    try{
        const event= req.headers["x-github-event"];
        const action= req.body.action;
        console.log(event);
        console.log(action);
        if(event === "pull_request"){
            const {owner, repo, sha, prNumber, branch} = parseEvent(req.body);
            const files= await getPullRequestFiles(owner, repo, prNumber);
            const filteredFiles = filterPullRequestFiles(files);
            const normalizedFiles= normalizePRFiles(filteredFiles);
            console.log(normalizedFiles);
        }
        return res.status(200).json({
            success:true,
            message:"Webhook received successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}