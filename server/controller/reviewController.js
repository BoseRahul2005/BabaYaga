const {reviewService} = require("../services/reviewService");

exports.reviewController = async (req,res)=>{
    try{
        const {code}=req.body;
        const {language}=req.params;
        if(!code || !language){
            return res.status(400).json({success:false,message:"Missing or invalid request data!"})
        }
        const response=await reviewService(code,language);
        if(!response){
            return res.status(400).json({success:false,message:"Failed to create review!"})
        }
        return res.status(200).json({success:true,response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}