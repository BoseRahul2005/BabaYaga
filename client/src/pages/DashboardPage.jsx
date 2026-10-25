import { useNavigate } from "react-router";
import Sidebar from "../components/SidePanel";
import SignInOverlay from "../components/auth/SignInOverlay";
import { useAuth } from "@clerk/react";
import {
  LayoutDashboard,
  FolderGit2,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import API from "../api/axios";

const DashboardPage = () => {
  const navigate = useNavigate();
  const {getToken} = useAuth();

  const handleSetTab = (tab) => {
    if (tab === "landing") {
      navigate("/");
    } else if (tab === "dashboard") {
      navigate("/dashboard");
    } else if (tab === "manual-review") {
      navigate("/manual-review");
    }
  };

  const handleConnectGithub= async ()=>{
      const token = await getToken();
      const response= await API.get('/github/start-oauth',{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      
      const URL= response.data.url;
      window.location.href= URL;
  }

  return (
    <div className="flex min-h-screen bg-[#070a12] text-slate-100 font-sans">
      <Sidebar currentTab="dashboard" setCurrentTab={handleSetTab} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto relative">
        <div className="max-w-6xl mx-auto space-y-8">
        <SignInOverlay />
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <LayoutDashboard className="w-5 h-5" />
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Security & Review Overview
                </h1>
              </div>
              <p className="text-slate-400 text-sm">
                Monitor connected repositories, autonomous PR review statuses, and vulnerability scans.
              </p>
            </div>

            <button
              onClick={() => handleConnectGithub()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all cursor-pointer w-fit"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Connect to Github</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div> 
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Not connected any repositories yet!</h2>
          </div>         
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;