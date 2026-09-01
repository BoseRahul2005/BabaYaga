import React, { useState, useRef } from "react";
import { Sparkles, Clipboard, Upload, Check, ChevronDown } from "lucide-react";
import Prism from "prismjs";

// Import Prism language components in strict dependency order
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";

const LANGUAGES = [
  { id: "javascript", label: "JavaScript", ext: [".js", ".jsx"] },
  { id: "typescript", label: "TypeScript", ext: [".ts", ".tsx"] },
  { id: "python", label: "Python", ext: [".py"] },
  { id: "cpp", label: "C++", ext: [".cpp", ".h", ".hpp"] },
  { id: "java", label: "Java", ext: [".java"] },
  { id: "go", label: "Go", ext: [".go"] },
  { id: "rust", label: "Rust", ext: [".rs"] },
  { id: "markup", label: "HTML", ext: [".html", ".htm"] },
  { id: "css", label: "CSS", ext: [".css"] },
  { id: "php", label: "PHP", ext: [".php"] },
  { id: "sql", label: "SQL", ext: [".sql"] },
  { id: "json", label: "JSON", ext: [".json"] },
];

const escapeHtml = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Custom Fallback Tokenizer to ensure keywords, numbers, strings & comments highlight perfectly
const fallbackHighlight = (code) => {
  const escaped = escapeHtml(code);

  return escaped
    .replace(
      /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g,
      '<span class="token comment">$1</span>',
    )
    .replace(
      /("[\s\S]*?"|'[\s\S]*?'|`[\s\S]*?`)/g,
      '<span class="token string">$1</span>',
    )
    .replace(
      /\b(function|const|let|var|return|if|else|for|while|import|export|from|default|class|def|async|await|try|catch|throw|new|public|private|static|void|int|float|double|bool|struct)\b/g,
      '<span class="token keyword">$1</span>',
    )
    .replace(/\b(\d+)\b/g, '<span class="token number">$1</span>')
    .replace(
      /\b([a-zA-Z_]\w*)(?=\s*\()/g,
      '<span class="token function">$1</span>',
    );
};

const CodeEditor = ({
  initialLanguage = "javascript",
  onReviewCode,
  isReviewing = false,
  onChange,
  height = "520px",
}) => {
  const [code, setCode] = useState("Type or paste your code here...");
  const [language, setLanguage] = useState(initialLanguage);
  const [pasted, setPasted] = useState(false);
  const [fileLoaded, setFileLoaded] = useState(false);

  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (onChange) {
      onChange(newCode, language);
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if (onChange) {
      onChange(code, newLang);
    }
  };

  const handleScroll = () => {
    if (textareaRef.current) {
      const scrollTop = textareaRef.current.scrollTop;
      const scrollLeft = textareaRef.current.scrollLeft;

      if (preRef.current) {
        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      handleCodeChange(newCode);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  //function to paste the 1st text from the clipboard
  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        handleCodeChange(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch (err) {
      console.warn("Clipboard read permission denied or unavailable:", err);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filename = file.name.toLowerCase();
    const matchedLang = LANGUAGES.find((l) =>
      l.ext.some((ext) => filename.endsWith(ext)),
    );
    if (matchedLang) {
      setLanguage(matchedLang.id);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        handleCodeChange(content);
        setFileLoaded(true);
        setTimeout(() => setFileLoaded(false), 2000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReviewClick = () => {
    if (onReviewCode) {
      onReviewCode(code, language);
    }
  };

  const lines = code.split("\n");
  const minLines = 15;
  const lineCount = Math.max(lines.length, minLines);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const getHighlightedCode = () => {
    try {
      const grammar = Prism.languages[language] || Prism.languages.javascript;
      if (grammar) {
        return Prism.highlight(code, grammar, language);
      }
    } catch (err) {
      // Fall through to fallback
    }
    return fallbackHighlight(code);
  };

  return (
    <div
      className="w-full rounded-2xl border border-[#1b2538] bg-[#0b0f19] shadow-2xl shadow-black/60 overflow-hidden font-sans"
      style={{ minHeight: height }}
    >
      {/* Top Toolbar Header */}
      <div className="px-4.5 py-3 bg-[#111726] border-b border-[#1b2538] flex items-center justify-between gap-3 overflow-x-auto whitespace-nowrap scrollbar-none">
        {/* Left Side: Language Selector */}
        <div className="flex items-center gap-3">
          <label className="text-slate-300 font-medium text-xs tracking-wide">
            Language:
          </label>
          <div className="relative flex items-center">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="appearance-none bg-[#172033] hover:bg-[#1e2a42] text-slate-200 border border-[#273550] rounded-xl px-2.5 py-1 pr-7 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
            >
              {LANGUAGES.map((lang) => (
                <option
                  key={lang.id}
                  value={lang.id}
                  className="bg-[#111726] text-slate-200"
                >
                  {lang.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Paste Code Button */}
          <button
            type="button"
            onClick={handlePasteCode}
            className="flex items-center gap-2 bg-[#172033] hover:bg-[#1e2a42] active:bg-[#253452] text-slate-200 hover:text-white border border-[#273550] rounded-xl px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer shadow-sm"
            title="Paste code from clipboard"
          >
            {pasted ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Pasted!</span>
              </>
            ) : (
              <>
                <Clipboard className="w-3 h-3 text-slate-400" />
                <span>Paste Code</span>
              </>
            )}
          </button>

          {/* Upload File Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-[#172033] hover:bg-[#1e2a42] active:bg-[#253452] text-slate-200 hover:text-white border border-[#273550] rounded-xl px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer shadow-sm"
            title="Upload code file"
          >
            {fileLoaded ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Loaded!</span>
              </>
            ) : (
              <>
                <Upload className="w-3 h-3 text-slate-400" />
                <span>Upload File</span>
              </>
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".js,.jsx,.ts,.tsx,.py,.cpp,.c,.java,.go,.rs,.html,.css,.php,.sql,.json,.txt"
          />

          {/* Review Code Button */}
          <button
            type="button"
            onClick={handleReviewClick}
            disabled={isReviewing}
            className="flex items-center gap-2 bg-linear-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white font-medium px-2.5 py-1 text-xs rounded-xl shadow-md shadow-indigo-600/25 transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isReviewing ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-indigo-100" />
            )}
            <span>{isReviewing ? "Reviewing..." : "Review Code"}</span>
          </button>
        </div>
      </div>

      {/* Main Code Editor Box */}
      <div
        className="relative flex w-full bg-[#080c14] font-mono text-xs leading-6"
        style={{ height }}
      >
        {/* Line Numbers Column */}
        <div
          ref={lineNumbersRef}
          className="select-none py-3 px-2 text-right text-[#42506b] bg-[#070a11] border-r border-[#151c2d] min-w-11 overflow-hidden"
          aria-hidden="true"
        >
          {lineNumbers.map((num) => (
            <div key={num} className="h-6">
              {num <= lines.length ? num : ""}
            </div>
          ))}
        </div>

        {/* Code Content Container */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Syntax Highlighted Display Overlay */}
          <pre
            ref={preRef}
            className="absolute inset-0 m-0 p-4 overflow-auto pointer-events-none font-mono text-xs leading-6 whitespace-pre tab-2 text-slate-100"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: getHighlightedCode() + "\n" }}
          />

          {/* User Input Textarea */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            className="absolute inset-0 w-full h-full m-0 p-4 bg-transparent text-transparent caret-indigo-300 resize-none font-mono text-xs leading-6 whitespace-pre focus:outline-none tab-2 overflow-auto"
            placeholder="Type or paste your code here..."
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
