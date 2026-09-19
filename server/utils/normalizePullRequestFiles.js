exports.normalizePRFiles = (files)=>{
    const normalizedFiles = files.map((file)=>{
        const {filename,status,additions,deletions,patch} = file;
        return {
            filename,
            status,
            additions,
            deletions,
            patch
        }
    })
    return normalizedFiles;
}
