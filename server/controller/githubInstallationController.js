const {getAuth} = require("@clerk/express");
const User = require("../models/User");
const {getGitHubAppInstallation} = require("../services/githubServices.js");
const GitHubOAuthState = require("../models/GitHubOAuthState.js");
const crypto = require("crypto");
const axios = require('axios');

const getUserInstallationId =async (req,res) => {
    try {
        const {userId} = getAuth(req);
        if (!userId) {
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        const user = await User.findOne({clerkUserId: userId});
        if (!user) {
            return res.status(404).json({success:false,message:"User not found"});
        }
        return res.status(200).json({success:true,installation:{
            connected:user.githubInstallationId ? true : false,
            installationId:user.githubInstallationId
        }});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

const associateGitHubInstallation= async (req,res)=>{
    try{
        const {userId}= getAuth(req);
        if (!userId) {
            return res.status(401).json({success:false,message:"Unauthorized"});
        }

        const user= await User.findOne({clerkUserId: userId});
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }

        if(user.githubUserId===null || !user.githubUserId){
            return res.status(401).json({success:false,message:"Please connect your github account first"});
        }
        
        const installationId= Number(req.body.installationId);
        if(!installationId || !Number.isInteger(installationId) || installationId<=0){
            return res.status(400).json({success:false, message:"Installation ID is required and must be a positive integer"});
        }

        const response = await getGitHubAppInstallation(installationId);
        if(!response || (response.app_id!==Number(process.env.GITHUB_APP_ID)) || response.account.id!==user.githubUserId || response.account.type!=="User" ){
            return res.status(404).json({success:false,message:"invalid installation id!"});
        }

        user.githubInstallationId= installationId;
        await user.save();
        return res.status(200).json({success:true,message:"installation id is valid and has been associated successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

const startGitHubOAuth= async(req,res)=>{
    try{
        const {userId}= getAuth(req);
        if (!userId) {
            return res.status(401).json({success:false,message:"Unauthorized"});
        }
        console.log(userId);
        const user= await User.findOne({clerkUserId: userId});
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }
        const state= crypto.randomBytes(32).toString('hex');
        const expirationTime= new Date(Date.now() + 10 * 60 * 1000);

        await GitHubOAuthState.create({
            state: state,
            clerkUserId: userId,
            expiresAt: expirationTime
        });

        const client_id= process.env.GITHUB_OAUTH_CLIENT_ID;
        const redirect_uri= process.env.GITHUB_OAUTH_CALLBACK_URL;
        const authUrl= `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read:user&state=${state}`;
        return res.status(200).json({success:true, url:authUrl});

    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

const handleGitHubOAuthCallback = async (req, res) => {
    try {
        const { code, state, error } = req.query;

        if (error) {
            return res.status(400).json({
                success: false,
                message: "GitHub authorization was denied or cancelled"
            });
        }

        if (!code || !state) {
            return res.status(400).json({
                success: false,
                message: "Authorization code and state are required"
            });
        }

        const stateRecord = await GitHubOAuthState.findOneAndDelete({
            state,
            expiresAt: { $gt: new Date() }
        });

        if (!stateRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired state"
            });
        }

        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
                client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GITHUB_OAUTH_CALLBACK_URL
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );

        const accessToken = tokenResponse.data.access_token;

        if (tokenResponse.data.error || !accessToken) {
            return res.status(400).json({
                success: false,
                message: "Failed to obtain GitHub access token"
            });
        }

        const profileResponse = await axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            }
        );

        const githubUserId = profileResponse.data.id;

        if (!githubUserId) {
            return res.status(400).json({
                success: false,
                message: "Could not verify GitHub identity"
            });
        }

        const user = await User.findOne({
            clerkUserId: stateRecord.clerkUserId
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "BabaYaga user not found"
            });
        }

        user.githubUserId = githubUserId;
        await user.save();

        return res.redirect(process.env.GITHUB_POST_CONNECT_REDIRECTION_PATH);

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: "GitHub OAuth failed. Please try again."
        });
    }
};

module.exports = {getUserInstallationId,associateGitHubInstallation,startGitHubOAuth,handleGitHubOAuthCallback};