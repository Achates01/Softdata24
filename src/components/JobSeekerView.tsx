import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Send, 
  Clock, 
  Building2,
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { JobPosting, Candidate } from '../types/index.ts';

interface JobSeekerViewProps {
  jobs: JobPosting[];
  myCandidateProfile?: Candidate | null;
  onApplyForJob: (job: JobPosting, candidateName: string, email: string, skills: string[]) => void;
  onOpenParser: () => void;
}

export const JobSeekerView: React.FC<JobSeekerViewProps> = ({
  jobs,
  myCandidateProfile,
  onApplyForJob,
  onOpenParser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(jobs[0] || null);
  const [applyName, setApplyName] = useState(myCandidateProfile?.name || 'Kiran Verma');
  const [applyEmail, setApplyEmail] = useState(myCandidateProfile?.email || 'kiran.verma@techdev.io');
  const [applySkills, setApplySkills] = useState('React, TypeScript, Node.js, AWS, PostgreSQL');
  const [hasAppliedSuccess, setHasAppliedSuccess] = useState(false);

  const filteredJobs = jobs.filter(j => 
    !searchQuery || 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    onApplyForJob(
      selectedJob,
      applyName,
      applyEmail,
      applySkills.split(',').map(s => s.trim()).filter(Boolean)
    );
    setHasAppliedSuccess(true);
    setTimeout(() => setHasAppliedSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                SoftData24 Career Grid
              </span>
              <span className="text-xs text-slate-400">· Premium IT Positions</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Find Your Next Tech Engineering Role
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Direct access to top-tier enterprise clients across FinTech, HealthTech, and Cloud Infrastructure. Screened with transparent salary packages and expedited hiring loops.
            </p>
          </div>

          {/* Quick AI Matcher CTA */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-900/60 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Score Your Resume with AI</p>
              <p className="text-[11px] text-slate-400">Instantly test compatibility across all open jobs</p>
            </div>
            <button
              onClick={onOpenParser}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Parse Resume
            </button>
          </div>
        </div>

        {/* Live Application Tracker if candidate exists */}
        {myCandidateProfile && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-950/50 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Your Active Candidacy:</span>
              <p className="font-bold text-white mt-0.5">
                {myCandidateProfile.appliedJobTitle} · <span className="text-cyan-400">{myCandidateProfile.status.replace('_', ' ').toUpperCase()}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
              <span>ATS Score: <strong className="text-cyan-400">{myCandidateProfile.matchScore}%</strong></span>
              <span>Applied: {myCandidateProfile.appliedDate}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Layout: Job List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Job Feed (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech stack, roles, or locations..."
              className="w-full bg-slate-900 text-xs text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
            {filteredJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{job.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{job.clientCompany}</p>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 shrink-0">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {job.location}
                    </span>
                    <span className="font-mono text-slate-300 font-semibold">{job.maxSalary}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {job.skillsRequired.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skillsRequired.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        +{job.skillsRequired.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Job Description & Quick Apply (7 cols) */}
        <div className="lg:col-span-7">
          {selectedJob ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
              
              {/* Job Header */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedJob.title}</h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">
                      {selectedJob.clientCompany} · {selectedJob.department}
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-1 rounded">
                    {selectedJob.location}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                  <span>Experience: <strong className="text-slate-200">{selectedJob.experienceReq}+ Years</strong></span>
                  <span>Compensation: <strong className="text-emerald-400">{selectedJob.maxSalary}</strong></span>
                  <span>Syndicated: LinkedIn, Indeed & SoftData24</span>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                  Role Overview & Impact
                </h4>
                <p>{selectedJob.description}</p>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">
                  Key Technical Competencies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.skillsRequired.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-950 border border-slate-800 text-cyan-300 text-xs px-2.5 py-1 rounded font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Apply Form */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    Express 1-Click Application to SoftData24
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">Zero resume blackout</span>
                </div>

                {hasAppliedSuccess ? (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Application successfully submitted! SoftData24 technical recruiters will evaluate your profile within 48 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={applyName}
                          onChange={(e) => setApplyName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={applyEmail}
                          onChange={(e) => setApplyEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Core Tech Skills (Comma-separated)</label>
                      <input
                        type="text"
                        value={applySkills}
                        onChange={(e) => setApplySkills(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500">
                        Encrypted transmission · GDPR & SOC-2 Compliant
                      </span>
                      <button
                        type="submit"
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-md shadow-cyan-950"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              Select a position to view full job description.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
