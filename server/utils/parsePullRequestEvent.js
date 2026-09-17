exports.parseEvent = (body) => {
    const { repository, pull_request } = body;
    return { 
        owner: repository.owner.login,
        repo: repository.name,
        sha: pull_request.head.sha,
        prNumber: pull_request.number,
        branch: pull_request.head.ref
    };
}