import React from "react";
import ReviewResults from "./ReviewResults";
import { FileSearch, Sparkles, AlertTriangle } from "lucide-react";

/**
 * Safely parses the review response (JSON string, object, or fallback text) into an array of issue items.
 */
const parseReviewResponse = (data) => {
  if (!data) return null;

  // If already an array of issues
  if (Array.isArray(data)) return data;

  // If object containing issues array
  if (typeof data === "object" && data !== null) {
    if (Array.isArray(data.issues)) return data.issues;
    if (data.response) return parseReviewResponse(data.response);
  }

  if (typeof data === "string") {
    const trimmed = data.trim();
    if (!trimmed) return null;

    // Direct JSON parse attempt
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.issues)) return parsed.issues;
    } catch (e) {
      // Try extracting json block inside ```json ... ```
      const jsonMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (jsonMatch && jsonMatch[1]) {
        try {
          const parsed = JSON.parse(jsonMatch[1].trim());
          if (Array.isArray(parsed)) return parsed;
          if (parsed && Array.isArray(parsed.issues)) return parsed.issues;
        } catch (err) {
          // ignore
        }
      }
    }

    // Fallback if AI returned raw string text
    return [
      {
        title: "AI Analysis Report",
        severity: "Medium",
        type: "REVIEW",
        score: "7/10",
        description: trimmed,
      },
    ];
  }

  return null;
};

const ReviewForm = ({ response, isReviewing = false, height = "520px" }) => {
  const issues = React.useMemo(() => parseReviewResponse(response), [response]);

  return (
    <div
      className="w-full rounded-2xl border border-[#1b2538] bg-[#0b0f19] shadow-2xl shadow-black/60 overflow-hidden font-sans flex flex-col"
      style={{ minHeight: height }}
    >
      {/* Panel Header */}
      <div className="px-5 py-3.5 bg-[#111726] border-b border-[#1b2538] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <h2 className="text-slate-200 font-semibold text-sm tracking-wide flex items-center gap-2">
            AI Review Panel
          </h2>
        </div>
        {issues && issues.length > 0 && (
          <span className="text-xs text-indigo-400 font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            {issues.length} {issues.length === 1 ? "issue" : "issues"}
          </span>
        )}
      </div>

      {/* Main Panel Content Area */}
      <div className="flex-1 p-5 overflow-y-auto max-h-137.5 scrollbar-thin scrollbar-thumb-[#1e2a42] scrollbar-track-transparent">
        {/* Loading State */}
        {isReviewing ? (
          <div className="h-full min-h-100 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin flex items-center justify-center" />
              <Sparkles className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Analyzing Codebase
              </h3>
              <p className="text-xs text-slate-400">
                Running multi-pass security and logic inspection...
              </p>
            </div>
          </div>
        ) : !response || !issues || issues.length === 0 ? (
          /* Empty State: "No review request yet" */
          <div className="h-full min-h-100 flex flex-col items-center justify-center text-center p-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#111726] border border-[#1d273c] text-slate-500 flex items-center justify-center shadow-inner">
              <FileSearch className="w-7 h-7 text-slate-400" />
            </div>
            <div className="space-y-1.5 max-w-xs">
              <h3 className="text-lg font-extrabold text-slate-200">
                No review request yet
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click the{" "}
                <span className="text-indigo-400 font-semibold">
                  "Review Code"
                </span>{" "}
                button in the editor toolbar to run an AI audit on your code.
              </p>
            </div>
          </div>
        ) : (
          /* Render Review Results in column format */
          <ReviewResults issues={issues} />
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
