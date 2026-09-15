const {getRepoInfo, getFilteredRepoTree,getFileContent} = require("../services/githubServices");
const {parseGithubUrl} = require("../utils/parseGithubUrl");

exports.gitInfo= async(req,res)=>{
    try{
        const {owner,repo}=parseGithubUrl(req.body.repoUrl);
        if(!owner||!repo){
            return res.status(400).json({success:false,error:"Invalid Repo URL"})
        }
        const repoData= await getRepoInfo(owner,repo);
        const filteredTreeData= await getFilteredRepoTree(owner,repo,repoData.default_branch);
        
        return res.status(200).json({
            success:true,
            data:filteredTreeData
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,error:"Failed to fetch repo info"});
    }
}

exports.getSourceCode= async(req,res)=>{
    try{
        const {owner,repo}=parseGithubUrl(req.body.repoUrl);
        const {filePath, branch}=req.body;
        if(!owner||!repo||!filePath||!branch){
            return res.status(400).json({success:false,error:"Missing or invalid request data!"})
        }
        const sourceCode= await getFileContent(owner,repo,branch,filePath);
        return res.status(200).json({
            success:true,
            data:sourceCode
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,error:"Failed to fetch Source Code"});
    }
}