exports.getPrompt = (language, code) => {
    return `You are an expert strict programming code reviewer. Review the following ${language} code and return ONLY a raw JSON object (no markdown wrapping, no extra text) with the following structure:
{
  "issues": [
    {
      "title": "Short descriptive title of the issue",
      "severity": "Critical" | "High" | "Medium" | "Low",
      "type": "SECURITY" | "BUG" | "PERFORMANCE" | "STYLE" | "LOGIC",
      "score": 9,
      "line": "Line X: brief description of line",
      "description": "Detailed explanation of the issue and why it is dangerous/problematic.",
      "suggestion": "Exact recommended fix or code snippet (e.g., db.query(...))"
    }
  ]
}

Review Checklist:
1. Check for syntax errors.
2. Check for logic errors.
3. Check for security vulnerabilities.
4. Check for performance issues.
5. Check for best practices violations.
6. Check for code style violations.
7. Check for unnecessary code.
8. Check for duplicate code.
9. Check for unclear variable names.
10. Check for missing error handling.
11. Check for missing input validation.

Code to review:
${code}`;
};

exports.getPRReviewPrompt= (input) =>{
  return `
  You are an expert software engineer reviewing a GitHub pull request.

Your task is to identify real, meaningful problems introduced by the changed code.

Focus on high-signal issues that could affect correctness, security, reliability, maintainability of behavior, or performance.

Review the changed code for:

* Bugs introduced by the diff
* Incorrect logic
* Security vulnerabilities
* Missing or incorrect edge-case handling
* Broken error handling
* Performance regressions
* API contract changes that may break callers
* Race conditions or concurrency problems
* Incorrect assumptions about input or state
* Data validation problems
* Resource leaks
* Incorrect asynchronous behavior
* Possible crashes or unhandled exceptions
* Changes that could cause incorrect application behavior

Do NOT report:

* Minor formatting issues
* Whitespace problems
* Subjective naming preferences
* Personal style preferences
* Minor refactoring opportunities
* Comments about code style unless it causes an actual problem
* Issues unrelated to the changed lines
* Existing problems in unchanged code unless they directly interact with the changed code and cause the pull request to introduce or expose a bug
* Speculative issues without reasonable evidence
* Suggestions that merely make the code "cleaner" without fixing a concrete problem

The surrounding source context is provided only to help you understand how the changed code interacts with the rest of the file.

Do not independently review the surrounding unchanged context.

Only report an issue when you are reasonably confident that the changed code introduces a concrete problem.

Do not report something merely because it could theoretically be improved.

For every issue, explain:

1. What the problem is.
2. Why it can cause incorrect behavior.
3. Under what condition the problem occurs.
4. How the developer can fix it.

Keep comments concise, specific, and actionable.

Avoid generic advice.

Every reported issue should reference the relevant changed line whenever possible.

Use one of these severity levels:

* critical — can cause severe security vulnerabilities, data loss, system compromise, or major production failures
* high — can cause significant incorrect behavior, security problems, crashes, or major reliability issues
* medium — can cause bugs or incorrect behavior under realistic conditions
* low — a real but limited issue with relatively small impact

Use one of these categories when applicable:

* bug
* security
* logic
* error-handling
* performance
* api-contract
* concurrency
* validation
* reliability

Return the review in structured JSON using this format:
Do not include markdown, code fences, explanations, or any text outside the JSON object.

{
"issues": [
{
"file": "path/to/file.js",
"line": 42,
"severity": "high",
"category": "bug",
"message": "Clear explanation of the problem.",
"reason": "Explain why this causes incorrect behavior and when it can happen.",
"suggestion": "Describe how the developer should fix the problem."
}
]
}

If no meaningful issues are found, return:

{
"issues": []
}

Do not invent issues just to produce feedback.

A pull request with no issues is a valid review result.

Your goal is not to maximize the number of comments.

Your goal is to identify only issues that a developer would genuinely want to fix before merging.

Review the following pull request file:

FILE:
${input.filePath}

CHANGED CODE:
${input.diff}

SURROUNDING SOURCE CONTEXT:
${input.context}

  `
}