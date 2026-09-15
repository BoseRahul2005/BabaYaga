const { getPrompt } = require("./promptService");
const { callLLM } = require("./llmService");

exports.reviewService = async (code, language) => {
    try {
        if(!code || !language || !(typeof code === 'string')){
            return false;
        }
        const prompt=getPrompt(language,code);
        const response=await callLLM(prompt);

        if(!response){
            return false;
        }

        return response;
        
    }catch(error){
        console.log(error);
        throw error;
    }
};