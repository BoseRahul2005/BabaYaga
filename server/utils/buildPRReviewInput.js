exports.reviewableInput = (files) => {
    const reviewInputs = files.map((file)=>{
        return {
            filePath: file.filename,
            diff: file.patch
        }
    })
    return reviewInputs;
}