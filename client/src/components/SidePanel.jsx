import React, { useState } from 'react';
import { 
  Terminal, 
  LayoutDashboard, 
  GitBranch, 
  GitPullRequest, 
  ShieldAlert, 
  BarChart3, 
  Settings, 
  Code2, 
  Globe, 
  ChevronUp, 
  LogOut, 
  User, 
  ExternalLink
} from 'lucide-react';

const GithubIcon = ({ size = 15, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const DEFAULT_USER = {
  name: 'Rahul Bose',
  username: 'BoseRahul2005',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
};

export default function Sidebar({ currentTab = 'dashboard', setCurrentTab, addToast, userProfile = DEFAULT_USER }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'repositories', label: 'Repositories', icon: GitBranch, badge: '8' },
    { id: 'reviews', label: 'Reviews', icon: GitPullRequest, badge: 'PR #142' },
    { id: 'manual-review', label: 'Manual Review', icon: Code2, highlight: true },
    { id: 'findings', label: 'Findings', icon: ShieldAlert, badge: '18', badgeColor: '#ef4444' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-65 h-screen bg-[#0d1322] border-r border-white/10 flex flex-col shrink-0 sticky top-0 z-50 font-sans select-none">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-white/10 flex items-center justify-between">
        <div 
          onClick={() => setCurrentTab && setCurrentTab('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8.5 h-8.5 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Terminal className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <div className="text-base font-bold text-slate-50 tracking-tight flex items-center gap-1.5">
              BabaYaga
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                AI v2.4
              </span>
            </div>
            <div className="text-[11px] text-slate-400">AI Code Review System</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-3 flex-1 overflow-y-auto space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2.5 pb-2 pt-1">
          Workspace Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'reviews' && (currentTab === 'reviews' || currentTab === 'pr-detail'));

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab && setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 mb-1 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 border-l-3 ${
                isActive 
                  ? 'bg-linear-to-r from-indigo-500/20 to-indigo-500/5 text-white font-semibold border-indigo-500' 
                  : item.highlight 
                    ? 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border-purple-500' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : item.highlight ? 'text-purple-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                  item.badgeColor 
                    ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                    : 'bg-white/10 text-slate-400 border-white/10'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="h-px bg-white/10 my-4 mx-2" />

        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2.5 pb-2">
          External & Public
        </div>

        <button
          onClick={() => setCurrentTab && setCurrentTab('landing')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs cursor-pointer transition-all ${
            currentTab === 'landing' 
              ? 'bg-white/10 text-white border-white/20' 
              : 'border-white/10 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Landing Page</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </button>

        {/* GitHub status pill */}
        <div className="mt-5 p-3 rounded-xl bg-slate-900/80 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <GithubIcon size={14} className="text-slate-100" />
            <span className="text-xs font-semibold text-slate-200">GitHub App Active</span>
          </div>
          <div className="text-[11px] text-slate-400 leading-tight">
            PR Webhooks connected to 8 repos.
          </div>
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="p-3.5 border-t border-white/10 relative">
        {showUserMenu && (
          <div className="absolute bottom-16 left-3 right-3 bg-[#141c2e] border border-slate-700/60 rounded-xl p-2 shadow-2xl shadow-black/80 z-50 space-y-1">
            <button
              onClick={() => {
                setCurrentTab && setCurrentTab('settings');
                setShowUserMenu(false);
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-white/5 transition-all text-left cursor-pointer"
            >
              <User className="w-3.5 h-3.5" /> Account Settings
            </button>
            <button
              onClick={() => {
                setCurrentTab && setCurrentTab('auth');
                setShowUserMenu(false);
                addToast && addToast('Logged out of GitHub', 'info');
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all text-left cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Switch / Logout
            </button>
          </div>
        )}

        <div
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg hover:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover bg-indigo-950"
            />
            <div>
              <div className="text-xs font-semibold text-slate-100 leading-tight">
                {userProfile.name}
              </div>
              <div className="text-[11px] text-slate-400">
                @{userProfile.username}
              </div>
            </div>
          </div>
          <ChevronUp className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </aside>
  );
}

