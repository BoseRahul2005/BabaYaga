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

      inputsToLLM.forEach((input) => {
        console.log(input.filePath);
        console.log("\n\n\n");
        console.log(input.diff);
        console.log("\n\n\n");
        console.log(input.context);
        console.log("=====================================================================\n\n\n");
      });
    }
    return res.status(200).json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
