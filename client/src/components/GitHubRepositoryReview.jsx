import React, { useState } from "react";
import {
  FolderGit2,
  FileCode,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Search,
  GitBranch,
} from "lucide-react";
import API from "../api/axios";

const detectLanguage = (filePath) => {
  if (!filePath) return "javascript";
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  switch (ext) {
    case ".js":
    case ".jsx":
      return "javascript";
    case ".ts":
    case ".tsx":
      return "typescript";
    case ".py":
      return "python";
    case ".cpp":
    case ".h":
    case ".hpp":
    case ".c":
      return "cpp";
    case ".java":
      return "java";
    case ".go":
      return "go";
    case ".rs":
      return "rust";
    case ".html":
    case ".htm":
      return "markup";
    case ".css":
      return "css";
    case ".php":
      return "php";
    case ".sql":
      return "sql";
    case ".json":
      return "json";
    default:
      return "javascript";
  }
};

const GitHubRepositoryReview = ({ onSelectFile }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [files, setFiles] = useState([]);
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFetchTree = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setError("Please enter a valid GitHub repository URL.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setFiles([]);
    setSelectedFilePath("");
    setLoadingTree(true);

    try {
      const response = await API.post("/github/get-tree", {
        repoUrl: repoUrl.trim(),
      });

      if (response.data?.success && Array.isArray(response.data?.data)) {
        const fetchedFiles = response.data.data;
        setFiles(fetchedFiles);
        if (fetchedFiles.length === 0) {
          setError("No supported source code files found in this repository.");
        }
      } else {
        setError(response.data?.error || "Failed to fetch repository tree.");
      }
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.error ||
          "Failed to connect to GitHub. Please verify the URL and try again.",
      );
    } finally {
      setLoadingTree(false);
    }
  };

  const handleFileSelect = async (e) => {
    const filePath = e.target.value;
    setSelectedFilePath(filePath);
    if (!filePath) return;

    setError("");
    setSuccessMessage("");
    setLoadingCode(true);

    try {
      const response = await API.post("/github/get-source-code", {
        repoUrl: repoUrl.trim(),
        branch: branch.trim() || "main",
        filePath,
      });

      if (response.data?.success && typeof response.data?.data === "string") {
        const sourceCode = response.data.data;
        const detectedLang = detectLanguage(filePath);

        setSuccessMessage(`Successfully loaded "${filePath}" into the editor!`);

        if (onSelectFile) {
          onSelectFile({
            code: sourceCode,
            language: detectedLang,
            filePath,
          });
        }
      } else {
        setError(response.data?.error || "Failed to retrieve source code.");
      }
    } catch (err) {
      console.error("Error fetching source code:", err);
      setError(
        err.response?.data?.error ||
          "Failed to fetch source code for selected file.",
      );
    } finally {
      setLoadingCode(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[#1b2538] bg-[#0b0f19] p-5 md:p-6 shadow-2xl shadow-black/60 font-sans space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#1b2538] pb-3.5">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <FolderGit2 className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            Import Code from GitHub Repository
          </h2>
          <p className="text-xs text-slate-400">
            Fetch and review source code directly from any public GitHub repository.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleFetchTree} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Repo URL Input */}
          <div className="md:col-span-8 relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/repository"
              className="w-full bg-[#111726] border border-[#273550] focus:border-indigo-500 rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Branch Input */}
          <div className="md:col-span-2 relative flex items-center">
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              <GitBranch className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="branch (main)"
              className="w-full bg-[#111726] border border-[#273550] focus:border-indigo-500 rounded-xl py-2.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loadingTree || !repoUrl.trim()}
              className="w-full h-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-medium px-4 py-2.5 rounded-xl text-xs shadow-md shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingTree ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Load Repository</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-xl text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2.5 rounded-xl text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Select File Dropdown Section */}
      {files.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-[#1b2538]/60">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              Select File to Review ({files.length} files found):
            </label>
            {loadingCode && (
              <span className="flex items-center gap-1.5 text-xs text-indigo-400">
                <Loader2 className="w-3 h-3 animate-spin" />
                Fetching file source...
              </span>
            )}
          </div>

          <select
            value={selectedFilePath}
            onChange={handleFileSelect}
            disabled={loadingCode}
            className="w-full bg-[#111726] border border-[#273550] focus:border-indigo-500 text-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono focus:outline-none transition-all cursor-pointer"
          >
            <option value="">-- Select a repository file --</option>
            {files.map((file) => (
              <option
                key={file.path}
                value={file.path}
                className="bg-[#0b0f19] text-slate-200"
              >
                {file.path}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default GitHubRepositoryReview;
