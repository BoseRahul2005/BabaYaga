const z = require("zod");

const githubRepoSchema = z.object({
  repoUrl: z
    .string()
    .url()
    .refine(
      (val) => {
        const parsedUrl = new URL(val);
        return parsedUrl.hostname === "github.com";
      },
      { message: "Invalid GitHub URL" },
    ),
});

const githubSourceCodeSchema = z.object({
  repoUrl: z
    .string()
    .url()
    .refine(
      (val) => {
        const parsedUrl = new URL(val);
        return parsedUrl.hostname === "github.com";
      },
      { message: "Invalid GitHub URL" },
    ),
    filePath:z.string().min(1,{message:"File path cannot be empty"}),
    branch:z.string().min(1,{message:"Branch cannot be empty"})
});

exports.githubRepoValidate= (req,res,next)=>{
     try{
        const result=githubRepoSchema.safeParse(req.body);
        if(result.success){
            req.body= result.data;
            next();
        }else{
            return res.json({success:false,message:result.error.message});
        }
     }
     catch(error){
        console.log(error);
        res.json({success:false,message:"Internal server error!"});
     }
}

exports.githubSourceCodeValidate= (req,res,next)=>{
     try{
        const result=githubSourceCodeSchema.safeParse(req.body);
        if(result.success){
            req.body= result.data;
            next();
        }else{
            return res.json({success:false,message:result.error.message});
        }
     }
     catch(error){
        console.log(error);
        res.json({success:false,message:"Internal server error!"});
     }
}