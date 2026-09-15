import { useState } from "react";
import { useNavigate } from "react-router";
import CodeEditor from "../components/CodeEditor";
import ReviewForm from "../components/ReviewForm";
import Sidebar from "../components/SidePanel";
import GitHubRepositoryReview from "../components/GitHubRepositoryReview";
import API from "../api/axios";
import { Code2 } from "lucide-react";

const ManualReviewPage = () => {
  const [response, setResponse] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [editorCode, setEditorCode] = useState(undefined);
  const [editorLanguage, setEditorLanguage] = useState(undefined);
  const navigate = useNavigate();

  const handleSetTab = (tab) => {
    if (tab === "landing") {
      navigate("/");
    }
  };

  const handleSelectGithubFile = ({ code, language }) => {
    setEditorCode(code);
    setEditorLanguage(language);
  };

  const handleReviewCode = async (code, language) => {
    setIsReviewing(true);
    try {
      const review = await API.post(`/review/review-code/${language}`, {
        code,
      });
      setResponse(
        review.data?.response || JSON.stringify(review.data, null, 2),
      );
    } catch (error) {
      console.error("Error from backend:", error);
      setResponse(
        `Error processing code review: ${error.message || "Unknown error"}`,
      );
    } finally {
      setIsReviewing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#070a12] text-slate-100 font-sans">
      {/* Sidepanel Component */}
      <Sidebar currentTab="manual-review" setCurrentTab={handleSetTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header */}
          <header className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Code2 size={28} color="#4f46e5" strokeWidth={2.5} />
              Manual AI Code Review Playground
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Paste any arbitrary code snippet or fetch directly from a public GitHub repository to perform deep multi-pass AI security & logic analysis on demand.
            </p>
          </header>

          {/* GitHub Repository Review Section */}
          <GitHubRepositoryReview onSelectFile={handleSelectGithubFile} />

          {/* Side by Side Layout: Code Editor (Left) & Review Panel (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Left Column: Code Editor */}
            <div className="w-full">
              <CodeEditor
                value={editorCode}
                language={editorLanguage}
                onChange={(newCode, newLang) => {
                  setEditorCode(newCode);
                  setEditorLanguage(newLang);
                }}
                onReviewCode={handleReviewCode}
                isReviewing={isReviewing}
                height="580px"
              />
            </div>

            {/* Right Column: Review Panel */}
            <div className="w-full">
              <ReviewForm
                response={response}
                isReviewing={isReviewing}
                height="580px"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManualReviewPage;
