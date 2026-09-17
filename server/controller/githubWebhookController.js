exports.webhookController= async(req,res)=>{
    try{
        const event= req.headers["x-github-event"];
        const action= req.body.action;
        console.log(event);
        console.log(action);
        res.status(200).json({
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