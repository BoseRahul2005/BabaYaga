const { parseEvent } = require("../utils/parsePullRequestEvent");
const {
  getPullRequestFiles,
  getPRFileContent,
} = require("../services/githubServices");
const { filterPullRequestFiles } = require("../utils/fileFilter");
const { normalizePRFiles } = require("../utils/normalizePullRequestFiles");
const { reviewableInput } = require("../utils/buildPRReviewInput");
const { extractChangedLines } = require("../utils/extractChangedLines");
const { extractSourceContext } = require("../utils/extractSourceContext");
const { getPRReviewPrompt } = require("../services/promptService.js");
const { callLLM } = require("../services/llmService.js");
const { parseResponse } = require("../utils/parseReviewResponse.js");
const {
  validateReviewResponse,
} = require("../utils/validateReviewResponse.js");
const { formatReview } = require("../utils/formatGithubReview.js");
const { createPullRequestComment } = require("../services/githubServices.js");

exports.webhookController = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    const action = req.body.action;
    console.log(event);
    console.log(action);
    if (event === "pull_request") {
      const { owner, repo, sha, prNumber } = parseEvent(req.body);
      const files = await getPullRequestFiles(owner, repo, prNumber);
      const filteredFiles = filterPullRequestFiles(files);
      const normalizedFiles = normalizePRFiles(filteredFiles);
      const reviewInputs = reviewableInput(normalizedFiles);
      const fileContent = await Promise.all(
        reviewInputs.map((input) =>
          getPRFileContent(owner, repo, input.filePath, sha),
        ),
      );
      const changedLines = reviewInputs.map((input) =>
        extractChangedLines(input.diff),
      );
      const sourceContext = fileContent.map((content, idx) => {
        const contexts = changedLines[idx].map((range) => {
          return extractSourceContext(content, range, 5);
        });

        return contexts.join("\n\n");
      });
      const inputsToLLM = reviewInputs.map((inputs, idx) => {
        return { ...inputs, context: sourceContext[idx] };
      });

      const prReviewPrompt = inputsToLLM.map((input) => {
        return getPRReviewPrompt(input);
      });

      const reviewedFiles = await Promise.all(
        prReviewPrompt.map((prompt) => {
          return callLLM(prompt);
        }),
      );

      const parsedResponse = reviewedFiles.map((response) => {
        return parseResponse(response);
      });

      const validatedResponse = parsedResponse.map((response) => {
        return validateReviewResponse(response);
      });

      console.log("Validation done");

      console.log("Formatting review...");
      const formattedReview = formatReview(validatedResponse);

      console.log("Formatted review:", formattedReview);

      console.log("Posting GitHub comment...");
      await createPullRequestComment(owner, repo, prNumber, formattedReview);

      console.log("Comment posted successfully");

      res.status(200).json({
        success: true,
        message: "Webhook received successfully",
        response: formattedReview,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Webhook received successfully",
        response: "Not a pull request event",
      });
    }
  } catch (err) {
    console.log("WEBHOOK ERROR:", err);
    console.log("STATUS:", err.status);
    console.log("MESSAGE:", err.message);
    console.log("DATA:", err.response?.data);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
