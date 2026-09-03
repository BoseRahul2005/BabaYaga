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

exports.githubValidate= (req,res,next)=>{
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