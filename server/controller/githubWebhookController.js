const {parseEvent} = require("../utils/parsePullRequestEvent");
exports.webhookController= async(req,res)=>{
    try{
        const event= req.headers["x-github-event"];
        const action= req.body.action;
        console.log(event);
        console.log(action);
        if(event === "pull_request"){
            const {owner, repo, sha, prNumber, branch} = parseEvent(req.body);
            console.log("owner: ",owner);
            console.log("repo: ",repo);
            console.log("sha: ",sha);
            console.log("prNumber: ",prNumber);
            console.log("branch: ",branch);
            
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