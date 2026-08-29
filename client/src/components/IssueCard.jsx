import React from "react";
import { AlertTriangle, AlertCircle, Info, ShieldAlert, CheckCircle2, Code2 } from "lucide-react";

const getSeverityTheme = (severity = "") => {
  const sev = severity.toLowerCase();
  if (sev.includes("critical")) {
    return {
      border: "border-red-500/40 hover:border-red-500/70",
      accent: "bg-red-500",
      badgeBg: "bg-red-500/15 border-red-500/40 text-red-400",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-red-400" />,
      scoreColor: "text-red-400",
    };
  }
  if (sev.includes("high")) {
    return {
      border: "border-orange-500/40 hover:border-orange-500/70",
      accent: "bg-orange-500",
      badgeBg: "bg-orange-500/15 border-orange-500/40 text-orange-400",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />,
      scoreColor: "text-orange-400",
    };
  }
  if (sev.includes("medium")) {
    return {
      border: "border-amber-500/40 hover:border-amber-500/70",
      accent: "bg-amber-500",
      badgeBg: "bg-amber-500/15 border-amber-500/40 text-amber-400",
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" />,
      scoreColor: "text-amber-400",
    };
  }
  // Low or Default
  return {
    border: "border-blue-500/40 hover:border-blue-500/70",
    accent: "bg-blue-500",
    badgeBg: "bg-blue-500/15 border-blue-500/40 text-blue-400",
    icon: <Info className="w-3.5 h-3.5 text-blue-400" />,
    scoreColor: "text-blue-400",
  };
};

const IssueCard = ({ issue = {} }) => {
  const {
    title = issue.issue || "Unspecified Issue",
    severity = "Medium",
    type = "BUG",
    score,
    line,
    description = "",
    suggestion = "",
  } = issue;

  const theme = getSeverityTheme(severity);

  // Format score: if numeric like 9 -> "9/10", if already "9/10" -> "9/10", fallback calculated based on severity
  const displayScore = React.useMemo(() => {
    if (score !== undefined && score !== null) {
      if (typeof score === "number" || (!isNaN(Number(score)) && score !== "")) {
        return `${score}/10`;
      }
      return String(score);
    }
    const sev = severity.toLowerCase();
    if (sev.includes("critical")) return "9.5/10";
    if (sev.includes("high")) return "8/10";
    if (sev.includes("medium")) return "6/10";
    return "4/10";
  }, [score, severity]);

  return (
    <div
      className={`relative group bg-[#0c121e] border ${theme.border} rounded-2xl p-5 shadow-lg shadow-black/40 transition-all duration-200 overflow-hidden flex flex-col gap-3.5`}
    >
      {/* Left accent indicator bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${theme.accent} rounded-l-2xl`} />

      {/* Top Header Row: Badges & Score */}
      <div className="flex items-center justify-between gap-2 flex-wrap pl-1">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Severity Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${theme.badgeBg}`}
          >
            {theme.icon}
            {severity}
          </span>

          {/* Type / Category Badge */}
          {type && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-[#162033] border border-[#24334f] text-slate-300">
              {type}
            </span>
          )}
        </div>

        {/* Score Indicator */}
        <div className="flex items-center gap-1 text-xs font-mono font-semibold text-slate-400">
          <span className="text-slate-500">Score:</span>
          <span className={`font-bold ${theme.scoreColor}`}>{displayScore}</span>
        </div>
      </div>

      {/* Title */}
      <h4 className="pl-1 text-base font-bold text-slate-100 group-hover:text-white transition-colors leading-snug">
        {title}
      </h4>

      {/* Line reference if present */}
      {line && (
        <div className="pl-1 flex items-center gap-1.5 font-mono text-xs text-indigo-300/90 font-medium">
          <Code2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>{line}</span>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="pl-1 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
          {description}
        </p>
      )}

      {/* Code Fix / Suggestion box */}
      {suggestion && (
        <div className="mt-1 bg-[#050810] border border-[#172338] rounded-xl p-3.5 text-xs font-mono text-emerald-400 font-medium overflow-x-auto shadow-inner">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-sans font-semibold mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Recommended Fix:
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed text-emerald-300">
            {suggestion.startsWith("+") || suggestion.startsWith("-")
              ? suggestion
              : `+ ${suggestion}`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default IssueCard;
