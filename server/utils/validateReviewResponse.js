const z = require("zod");

const reviewResponseSchema = z.object({
  summary: z.string(),
  issues: z.array(
    z.object({
      file: z.string(),
      line: z.number().positive().int(),
      severity: z.enum(["critical", "high", "medium", "low"]),
      category: z.enum([
        "bug",
        "security",
        "logic",
        "error-handling",
        "performance",
        "api-contract",
        "concurrency",
        "validation",
        "reliability",
      ]),
      title: z.string(),
      explanation: z.string(),
      suggestion: z.string(),
    }),
  ),
});

exports.validateReviewResponse = (res) => {
  const result = reviewResponseSchema.safeParse(res);

  if (!result.success) {
    throw new Error("Invalid AI review response format");
  }

  return result.data;
};
