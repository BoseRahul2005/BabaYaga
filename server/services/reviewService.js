const { getPrompt } = require("./promptService");
const { callLLM } = require("./llmService");

exports.createReviewService = async (req, res) => {
    const { code } = req.body;
    const { language } = req.params;
    try {
        if(!code || !language || !(typeof code === 'string')){
            return res.json({success:false, message:"Invalid input"});
        }
        const prompt=getPrompt(language,code);
        const response=await callLLM(prompt);

        if(!response){
            return res.json({success:false,message:"Something is wrong"});
        }

        return res.json({success:true,response});
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};