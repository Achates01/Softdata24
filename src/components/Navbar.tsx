import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  Bell, 
  ShieldCheck, 
  Users, 
  Building2, 
  UserCheck, 
  Search, 
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Share2,
  Mail
} from 'lucide-react';
import { NotificationItem } from '../types/index.ts';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: 'recruiter' | 'client_manager' | 'job_seeker';
  setUserRole: (role: 'recruiter' | 'client_manager' | 'job_seeker') => void;
  onOpenParser: () => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
  onSelectCandidateById?: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  onOpenParser,
  notifications,
  onMarkNotificationAsRead,
  onClearAllNotifications,
  onSelectCandidateById,
  searchQuery,
  setSearchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels = {
    recruiter: { title: 'Recruitment Agency (ATS)', badge: 'Agency Recruiter', icon: Users },
    client_manager: { title: 'Enterprise Client Portal', badge: 'Client Hiring Mgr', icon: Building2 },
    job_seeker: { title: 'Tech Candidate Portal', badge: 'Job Seeker', icon: UserCheck },
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top security & system status banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 px-4 py-1 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            SoftData24 Enterprise Staffing Grid
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ISO 27001 Certified · AES-256 Vault Active
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-slate-400">
            Automated Syndication: <span className="text-slate-200">LinkedIn & Indeed Synced</span>
          </span>
          <span className="text-slate-600 hidden md:inline">·</span>
          <div className="flex items-center gap-1 text-xs text-slate-300">
            <span className="text-slate-500">Active View:</span>
            <span className="text-cyan-400 font-medium">{roleLabels[userRole].badge}</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentTab('ats')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-950/50 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  SoftData<span className="text-cyan-400">24</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider bg-cyan-950/60 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800/60">
                  ATS PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                Recruitment & IT Staffing Systems
              </p>
            </div>
          </button>

          {/* Navigation tabs for Recruiter */}
          {userRole === 'recruiter' && (
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              <button
                onClick={() => setCurrentTab('ats')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'ats' 
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Candidate Pipeline
              </button>
              <button
                onClick={() => setCurrentTab('matching')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'matching' 
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                AI Matching Engine
              </button>
              <button
                onClick={() => setCurrentTab('syndication')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'syndication' 
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Job Syndication
              </button>
              <button
                onClick={() => setCurrentTab('emails')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'emails' 
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Email Automation
              </button>
              <button
                onClick={() => setCurrentTab('clients')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'clients' 
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                Client Portals
              </button>
            </nav>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs relative items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates, skills, jobs..."
            className="w-full bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 pl-9 pr-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Action Controls & Menus */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI Resume Parser Button */}
          <button
            onClick={onOpenParser}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-medium px-3 sm:px-3.5 py-1.5 rounded-lg shadow-sm shadow-cyan-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Parse resume with Gemini 3.8 Flash AI"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
            <span className="font-semibold">AI Resume Parser</span>
          </button>

          {/* Real-time Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors focus:outline-none"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 font-bold text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-white">Live Pipeline Updates</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      {notifications.length}
                    </span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearAllNotifications}
                      className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          onMarkNotificationAsRead(notif.id);
                          if (notif.relatedCandidateId && onSelectCandidateById) {
                            onSelectCandidateById(notif.relatedCandidateId);
                            setShowNotifications(false);
                          }
                        }}
                        className={`p-3 text-left hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-cyan-950/20' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-200">{notif.title}</p>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap font-mono">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher (Recruiter / Client / Job Seeker) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              {React.createElement(roleLabels[userRole].icon, { className: 'w-3.5 h-3.5 text-cyan-400' })}
              <span className="hidden sm:inline">{roleLabels[userRole].badge}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-1.5">
                <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                  Switch Portal Role
                </div>
                {(['recruiter', 'client_manager', 'job_seeker'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setShowRoleMenu(false);
                      if (role === 'recruiter') setCurrentTab('ats');
                      if (role === 'client_manager') setCurrentTab('clients');
                      if (role === 'job_seeker') setCurrentTab('candidate_portal');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      userRole === role
                        ? 'bg-cyan-950/50 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(roleLabels[role].icon, { className: 'w-4 h-4' })}
                      <span>{roleLabels[role].title}</span>
                    </div>
                    {userRole === role && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation tab strip for Recruiter */}
      {userRole === 'recruiter' && (
        <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-950 gap-2 scrollbar-none">
          <button
            onClick={() => setCurrentTab('ats')}
            className={`whitespace-nowrap px-3 py-1 rounded text-xs font-medium ${
              currentTab === 'ats' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            Pipeline (ATS)
          </button>
          <button
            onClick={() => setCurrentTab('matching')}
            className={`whitespace-nowrap px-3 py-1 rounded text-xs font-medium ${
              currentTab === 'matching' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            AI Matcher
          </button>
          <button
            onClick={() => setCurrentTab('syndication')}
            className={`whitespace-nowrap px-3 py-1 rounded text-xs font-medium ${
              currentTab === 'syndication' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            Syndication
          </button>
          <button
            onClick={() => setCurrentTab('emails')}
            className={`whitespace-nowrap px-3 py-1 rounded text-xs font-medium ${
              currentTab === 'emails' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            Emails
          </button>
          <button
            onClick={() => setCurrentTab('clients')}
            className={`whitespace-nowrap px-3 py-1 rounded text-xs font-medium ${
              currentTab === 'clients' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-400'
            }`}
          >
            Clients
          </button>
        </div>
      )}
    </header>
  );
};
