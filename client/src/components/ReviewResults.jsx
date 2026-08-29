import React from "react";
import IssueCard from "./IssueCard";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const ReviewResults = ({ issues = [] }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="bg-[#0b0f19] border border-[#1b2538] rounded-2xl p-8 text-center space-y-3 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">No Issues Discovered</h3>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          Your code passed the analysis with zero security flaws or logic bugs detected!
        </p>
      </div>
    );
  }

  // Calculate stats & risk level
  const criticalCount = issues.filter(
    (i) => (i.severity || "").toLowerCase() === "critical"
  ).length;
  const highCount = issues.filter(
    (i) => (i.severity || "").toLowerCase() === "high"
  ).length;
  const mediumCount = issues.filter(
    (i) => (i.severity || "").toLowerCase() === "medium"
  ).length;
  const lowCount = issues.length - (criticalCount + highCount + mediumCount);

  let overallRisk = "LOW RISK";
  let riskBadgeStyle = "bg-blue-500/15 border-blue-500/40 text-blue-400";

  if (criticalCount > 0) {
    overallRisk = "CRITICAL RISK";
    riskBadgeStyle = "bg-red-500/20 border-red-500/50 text-red-400";
  } else if (highCount > 0) {
    overallRisk = "HIGH RISK";
    riskBadgeStyle = "bg-orange-500/20 border-orange-500/50 text-orange-400";
  } else if (mediumCount > 0) {
    overallRisk = "MEDIUM RISK";
    riskBadgeStyle = "bg-amber-500/20 border-amber-500/50 text-amber-400";
  }

  // Summary breakdown string
  const summaryParts = [];
  if (criticalCount > 0) summaryParts.push(`${criticalCount} Critical`);
  if (highCount > 0) summaryParts.push(`${highCount} High Flaws`);
  if (mediumCount > 0) summaryParts.push(`${mediumCount} Medium Issues`);
  if (lowCount > 0) summaryParts.push(`${lowCount} Minor Suggestions`);
  const summaryText = summaryParts.join(", ");

  return (
    <div className="w-full space-y-4">
      {/* Findings Summary Header Box */}
      <div className="bg-[#0c121e] border border-[#1b2538] rounded-2xl p-5 shadow-xl flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              {issues.length} {issues.length === 1 ? "Finding" : "Findings"} Discovered
            </h3>
          </div>
          {summaryText && (
            <p className="text-xs text-slate-400 font-medium">
              {summaryText}
            </p>
          )}
        </div>

        {/* Overall Risk Tag */}
        <span
          className={`px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase border shadow-sm ${riskBadgeStyle}`}
        >
          {overallRisk}
        </span>
      </div>

      {/* Issues List rendered in Column format */}
      <div className="flex flex-col gap-4">
        {issues.map((issue, index) => (
          <IssueCard key={index} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default ReviewResults;
