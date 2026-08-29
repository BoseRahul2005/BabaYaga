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