const {verifyWebhook}=require("@clerk/express/webhooks");
const {syncClerkUser, deleteUser} = require("../services/clerkUserService.js");

const clerkWebhookController=async (req,res)=>{
 try{
    const event= await verifyWebhook(req);
    try{
        if(event.type==="user.created"||event.type==="user.updated"){
            await syncClerkUser(event.data);
            return res.status(200).json({message:"User synced successfully"});
        }else if(event.type==="user.deleted"){
            await deleteUser(event.data.id);
            return res.status(200).json({message:"User deleted successfully"});
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal Server Error"});
    }
    
 }catch(err){
    console.log(err);
    return res.status(400).json({message:"Invalid webhook payload"});
 }   
}

module.exports={clerkWebhookController};