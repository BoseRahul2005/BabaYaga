const createIssueSection= (issues,heading)=> {
    if(issues.length=== 0) return "";

    const issueSection = issues.map((issue) =>{
        return `

    ### ${issue.title}

    **File:** ${issue.file}
    **Line:** ${issue.line}
    **Category:** ${issue.category}

    ${issue.explanation}

    **Suggestion:** 
    ${issue.suggestion}
    `;
    }).join("\n\n");

    return `
    ## ${heading} priority issues

    ${issueSection}`;
}

exports.formatReview = (reviews) => {
    const formattedIssues = reviews.flatMap((review) => review.issues);

    const summaries = reviews.map((review)=>review.summary)
    
    const highIssues = formattedIssues.filter((issue) => issue.severity === "high");
    const mediumIssues = formattedIssues.filter((issue) => issue.severity === "medium");
    const lowIssues = formattedIssues.filter((issue) => issue.severity === "low");

   const highSection= createIssueSection(highIssues, "🔴 High");
   const mediumSection= createIssueSection(mediumIssues, "🟡 Medium");
   const lowSection= createIssueSection(lowIssues, "🟢 Low");

    return `
    # 🤖 BabaYaga Review 

    ## Summary

    ${summaries.map((summary) => {
        return `
    - ${summary}`;
    }).join("\n")}

    ${highSection}

    ${mediumSection}

    ${lowSection}`;
}