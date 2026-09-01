import {
  Terminal,
  ArrowRight,
  Play,
  ShieldCheck,
  Zap,
  GitPullRequest,
  Cpu,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate=useNavigate();
  return (
    <div className="bg-[#060911] text-slate-50 min-h-screen font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="h-17.5 border-b border-white/10 flex items-center justify-between px-6 md:px-10 sticky top-0 bg-[#060911]/90 backdrop-blur-md z-50 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            BabaYaga
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            AI Code Review
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#workflow" className="hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#security" className="hover:text-white transition-colors">
            Security
          </a>
          <a href="#rules" className="hover:text-white transition-colors">
            Custom Rules
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <button className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <button
            onClick={() => navigate("/manual-review")}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Start Reviewing Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 text-center max-w-6xl mx-auto relative">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-semibold mb-6 shadow-sm shadow-indigo-500/10">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Next-Generation Autonomous Code Guardrails</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] bg-linear-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-6 max-w-4xl mx-auto">
          AI Code Reviews That Find What Linters Miss
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-9 leading-relaxed">
          Analyze pull requests and source code using AI and static analysis to
          discover bugs, security vulnerabilities, performance problems, and
          architectural weaknesses before they hit production.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate("/manual-review")}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Start Reviewing Code</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Preview Card: Pull Request Diff with AI Comment */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1322] shadow-2xl shadow-black/80 ring-1 ring-indigo-500/20 overflow-hidden text-left max-w-5xl mx-auto backdrop-blur-xl">
          {/* Mock Browser Header */}
          <div className="px-4.5 py-3 bg-[#111726] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              <span className="ml-3 text-xs text-slate-400 font-mono">
                fintech/payment-service — PR #142 Diff Review
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-red-500/15 text-red-400 border border-red-500/30 tracking-wide uppercase">
                CRITICAL RISK
              </span>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AI Scan Completed
              </span>
            </div>
          </div>

          {/* Diff Preview Body */}
          <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <div className="text-slate-500 mb-2.5 select-none">
              @@ -40,8 +40,14 @@ src/controllers/refund.ts
            </div>

            <div className="bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-3 py-1 rounded-r-md mb-1 font-mono">
              {"+ const { paymentId, amount } = req.body;"}
            </div>
            <div className="bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-500 px-3 py-1 rounded-r-md mb-3 font-mono">
              {"+ const result = await refundPayment(paymentId, amount);"}
            </div>

            {/* AI Inline Comment Box */}
            <div className="my-4 ml-2 sm:ml-6 p-4 md:p-5 rounded-xl bg-[#141c2e] border border-red-500/40 shadow-xl shadow-black/40">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                    <Terminal className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    Dibugger AI Assistant
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 uppercase tracking-wide">
                    HIGH SEVERITY
                  </span>
                </div>
                <span className="text-xs text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  94% Confidence
                </span>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 mb-3 font-sans leading-relaxed">
                <strong className="text-red-400">
                  Missing authorization check:
                </strong>{" "}
                The endpoint accepts{" "}
                <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-xs">
                  paymentId
                </code>{" "}
                directly from request body without checking if{" "}
                <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-xs">
                  req.user.accountId
                </code>{" "}
                owns the transaction.
              </div>

              <pre className="bg-[#090d16] p-3 rounded-lg text-emerald-400 text-xs mb-3 overflow-x-auto border border-white/5 font-mono">
                <code>{`+ if (payment.accountId !== req.user.accountId) {\n+   throw new UnauthorizedError('Access denied');\n+ }`}</code>
              </pre>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentTab("reviews")}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition-all cursor-pointer"
                >
                  View Full PR Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="py-20 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Built for Modern Engineering Teams
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Go beyond simple linter rules. Dibugger understands full execution
            context, security boundaries, and code logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: AlertTriangle,
              title: "AI-Powered Bug Detection",
              desc: "Identifies null pointer dereferences, race conditions, edge case logic errors, and memory leaks before merge.",
            },
            {
              icon: Lock,
              title: "Deep Security Analysis",
              desc: "Scans for OWASP Top 10 risks including SQL injections, broken authorization checks, and hardcoded credentials.",
            },
            {
              icon: GitPullRequest,
              title: "Automated Pull Request Reviews",
              desc: "Instant inline comments posted directly to GitHub PRs with precise line highlights and copyable fix code.",
            },
            {
              icon: Cpu,
              title: "Context-Aware Code Reasoning",
              desc: "Analyzes cross-file dependencies and framework contracts rather than judging lines in isolated silos.",
            },
            {
              icon: ShieldCheck,
              title: "Structured Severity & Confidence",
              desc: "Prioritizes Critical and High impact flaws with clear confidence metrics to prevent notification fatigue.",
            },
            {
              icon: Sliders,
              title: "Custom Organizational Rules",
              desc: "Enforce company-specific architectural patterns and compliance requirements automatically on every commit.",
            },
          ].map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 bg-linear-to-b from-white/3 to-transparent shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-500/25 transition-all">
                  <IconComponent className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow Visualization Section */}
      <section
        id="workflow"
        className="py-20 px-4 md:px-6 bg-[#0a0f1d] border-y border-white/10 relative"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            5-Minute Automated Workflow
          </h2>
          <p className="text-slate-400 text-base mb-12">
            Zero setup required. Connect your repository and let Dibugger guard
            your main branch.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "Connect Repository",
                desc: "Authorize GitHub access with one click",
              },
              {
                step: "02",
                title: "Open Pull Request",
                desc: "Developer opens PR as usual",
              },
              {
                step: "03",
                title: "AI Analyzes Changes",
                desc: "Deep static AST & logic review runs",
              },
              {
                step: "04",
                title: "Review Findings",
                desc: "Structured feedback posted to PR",
              },
              {
                step: "05",
                title: "Fix & Merge",
                desc: "Apply suggested fix and merge code",
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-[#111726] border border-white/10 hover:border-indigo-500/30 rounded-xl p-6 text-left hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl font-black text-indigo-500/60 mb-2 font-mono">
                  {st.step}
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-10 md:p-16 rounded-3xl bg-linear-to-b from-indigo-950/40 to-purple-950/20 border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl relative">
          <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl -z-10" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Elevate Your Code Quality Today
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Start catching critical security flaws and complex logic bugs
            automatically on every pull request.
          </p>

          <button
            onClick={() => navigate("/manual-review")}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Start Reviewing Code</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-500" />
          <span>
            © 2026 Dibugger AI Code Review System. All rights reserved.
          </span>
        </div>
        <div>Built for high-velocity engineering teams.</div>
      </footer>
    </div>
  );
}
