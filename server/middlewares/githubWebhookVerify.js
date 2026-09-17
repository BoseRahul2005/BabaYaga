const crypto = require("crypto");

exports.verifyGithubWebhook = (req, res, next) => {
    try{
        const signature= req.headers["x-hub-signature-256"];
        const hmac = crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET);
        hmac.update(req.rawBody);
        const calculatedSignature = `sha256=${hmac.digest("hex")}`;
        if(signature !== calculatedSignature){
            return res.status(401).json({
                success:false,
                message:"Invalid webhook signature"
            })
        }
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}
