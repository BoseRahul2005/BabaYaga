exports.parseGithubUrl = (githubUrl) => {
    try {
        const gitUrl = new URL(githubUrl);
        const parts= gitUrl.pathname.split('/').filter(Boolean);
        if(parts.length!==2){
            throw new Error("Invalid URL");
        }
        const owner = parts[0];
        let repo = parts[1];
        if (repo.endsWith(".git")) {
            repo = repo.slice(0, repo.length - 4);
        }
        return {
            owner,
            repo
        };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}