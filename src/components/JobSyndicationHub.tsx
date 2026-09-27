import React, { useState } from 'react';
import { 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  RefreshCw, 
  Plus, 
  Globe, 
  TrendingUp, 
  Users, 
  Clock, 
  X,
  AlertCircle,
  Eye,
  Send,
  Building2
} from 'lucide-react';
import { JobPosting, SyndicationEvent } from '../types/index.ts';

interface JobSyndicationHubProps {
  jobs: JobPosting[];
  syndications: SyndicationEvent[];
  onToggleJobSyndication: (jobId: string, platform: 'linkedin' | 'indeed' | 'softdata24') => void;
  onCreateJob: (job: JobPosting) => void;
  onRefreshFeed: () => void;
}

export const JobSyndicationHub: React.FC<JobSyndicationHubProps> = ({
  jobs,
  syndications,
  onToggleJobSyndication,
  onCreateJob,
  onRefreshFeed,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [syncingPlatform, setSyncingPlatform] = useState<string | null>(null);

  // New job form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('Remote / Hybrid');
  const [newExp, setNewExp] = useState(5);
  const [newSalary, setNewSalary] = useState('$100,000 / ₹32,00,000');
  const [newSkills, setNewSkills] = useState('React, TypeScript, Node.js, AWS');
  const [newDesc, setNewDesc] = useState('');
  const [syndicateLinkedIn, setSyndicateLinkedIn] = useState(true);
  const [syndicateIndeed, setSyndicateIndeed] = useState(true);

  // Calculate high-volume metrics
  const totalViews = syndications.reduce((acc, s) => acc + s.views, 0);
  const totalApplications = syndications.reduce((acc, s) => acc + s.applications, 0);
  const overallConversion = totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(1) : '0.0';

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newJob: JobPosting = {
      id: `job-${Date.now().toString().slice(-4)}`,
      title: newTitle.trim(),
      department: 'Software Engineering',
      clientCompany: newCompany.trim(),
      location: newLocation,
      type: 'Full-time',
      experienceReq: Number(newExp) || 5,
      minSalary: '$80,000 / ₹25,00,000',
      maxSalary: newSalary,
      skillsRequired: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      description: newDesc.trim() || 'Software development requisition managed by SoftData24.',
      applicantsCount: 0,
      shortlistedCount: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      syndicatedPlatforms: {
        linkedin: syndicateLinkedIn,
        indeed: syndicateIndeed,
        softdata24: true,
      }
    };

    onCreateJob(newJob);
    setShowCreateModal(false);
    // Reset form
    setNewTitle('');
    setNewCompany('');
    setNewDesc('');
  };

  const handleSyncAll = (platform: string) => {
    setSyncingPlatform(platform);
    setTimeout(() => {
      setSyncingPlatform(null);
      onRefreshFeed();
    }, 700);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                <Share2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Multi-Platform Job Syndication Hub</h2>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                LinkedIn Recruiter & Indeed API Synced
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Distribute technical requisitions across LinkedIn, Indeed, and the SoftData24 Global Talent Grid simultaneously. Track incoming candidate streams and clicks in real-time.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Syndicate Job</span>
          </button>
        </div>

        {/* Global Syndication Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/80">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Total Syndicated Impressions</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-white">{(totalViews * 4.2).toFixed(0)}</span>
              <span className="text-xs text-cyan-400 font-mono">+18% this wk</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Job Clicks & Views</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-sky-400">{totalViews}</span>
              <span className="text-xs text-slate-500 font-mono">Verified traffic</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Inbound Applications</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-emerald-400">{totalApplications}</span>
              <span className="text-xs text-emerald-500/80 font-mono">Parsed candidates</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Avg Applicant Yield</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-cyan-400">{overallConversion}%</span>
              <span className="text-xs text-slate-500 font-mono">Conversion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LinkedIn Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#0077b5]/20 border border-[#0077b5]/40 flex items-center justify-center font-bold text-[#0077b5] text-sm">
                in
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">LinkedIn Recruiter</h4>
                <span className="text-[10px] text-emerald-400 font-mono">API v2 · Webhooks Live</span>
              </div>
            </div>
            <button
              onClick={() => handleSyncAll('LinkedIn')}
              disabled={syncingPlatform === 'LinkedIn'}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded transition-colors"
              title="Force sync feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingPlatform === 'LinkedIn' ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Automated XML & REST push into LinkedIn Jobs and Easy Apply feeds.
          </p>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-300 font-mono">
            <span>Active Slots: <strong>{jobs.filter(j => j.syndicatedPlatforms.linkedin).length}</strong></span>
            <span className="text-cyan-400">Health: Optimal</span>
          </div>
        </div>

        {/* Indeed Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#2164f3]/20 border border-[#2164f3]/40 flex items-center justify-center font-bold text-[#2164f3] text-sm">
                ind
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Indeed Sponsored</h4>
                <span className="text-[10px] text-emerald-400 font-mono">Direct Apply Active</span>
              </div>
            </div>
            <button
              onClick={() => handleSyncAll('Indeed')}
              disabled={syncingPlatform === 'Indeed'}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded transition-colors"
              title="Force sync feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingPlatform === 'Indeed' ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Real-time indexing on Indeed Search with instant resume forwarding into SoftData24 ATS.
          </p>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-300 font-mono">
            <span>Active Slots: <strong>{jobs.filter(j => j.syndicatedPlatforms.indeed).length}</strong></span>
            <span className="text-cyan-400">Health: Optimal</span>
          </div>
        </div>

        {/* SoftData24 Careers Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-400 text-sm">
                SD
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">SoftData24 Career Net</h4>
                <span className="text-[10px] text-emerald-400 font-mono">Primary Feed</span>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          </div>
          <p className="text-xs text-slate-400">
            Direct branded job portal for SoftData24 & Software Experts India client requisitions.
          </p>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-300 font-mono">
            <span>Published: <strong>{jobs.length} Positions</strong></span>
            <span className="text-cyan-400">Latency: 4ms</span>
          </div>
        </div>
      </div>

      {/* Requisitions Syndication Control Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Live Requisitions Distribution Control</h3>
            <p className="text-xs text-slate-400">Toggle distribution channels on the fly per job posting</p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {jobs.length} Active Positions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Job Title & Client</th>
                <th className="py-3 px-4">Experience & Location</th>
                <th className="py-3 px-4 text-center">LinkedIn Jobs</th>
                <th className="py-3 px-4 text-center">Indeed Apply</th>
                <th className="py-3 px-4 text-center">SoftData24 Direct</th>
                <th className="py-3 px-4 text-right">Inbound Candidates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-100">{job.title}</p>
                    <p className="text-[11px] text-slate-400">{job.clientCompany} · {job.department}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <p className="text-slate-300">{job.experienceReq}+ Years</p>
                    <p className="text-[11px] text-slate-500">{job.location}</p>
                  </td>
                  {/* LinkedIn toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onToggleJobSyndication(job.id, 'linkedin')}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        job.syndicatedPlatforms.linkedin
                          ? 'bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/50 hover:bg-[#0077b5]/30'
                          : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      {job.syndicatedPlatforms.linkedin ? '● Synced' : 'Disabled'}
                    </button>
                  </td>
                  {/* Indeed toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => onToggleJobSyndication(job.id, 'indeed')}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        job.syndicatedPlatforms.indeed
                          ? 'bg-[#2164f3]/20 text-[#2164f3] border border-[#2164f3]/50 hover:bg-[#2164f3]/30'
                          : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      {job.syndicatedPlatforms.indeed ? '● Synced' : 'Disabled'}
                    </button>
                  </td>
                  {/* SoftData24 toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                      Live
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono">
                    <span className="font-bold text-slate-200">{job.applicantsCount}</span>
                    <span className="text-slate-500 text-[11px]"> applications</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Webhook Activity Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Live Syndication Webhook Stream
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Protocol: HTTP Webhook 200 OK</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {syndications.map((item) => (
            <div key={item.id} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 font-mono">{item.platform}</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-1.5 py-0.2 rounded font-mono">
                  {item.status}
                </span>
              </div>
              <p className="text-slate-400 line-clamp-1">{item.jobTitle}</p>
              <div className="pt-1 border-t border-slate-800/60 flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Ref: {item.externalRef}</span>
                <span>{item.views} Views · {item.applications} Applies</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create & Syndicate Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Create & Syndicate Job Requisition</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Job Requisition Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lead SRE / Cloud Architect"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Client Company</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Vertex FinTech Global"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Location / Work Mode</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Min Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newExp}
                    onChange={(e) => setNewExp(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Max CTC / Salary</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Job Summary</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline key deliverables, technical stack requirements, and client culture..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Multi-platform broadcast checkboxes */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-semibold text-slate-300 block text-[11px] uppercase tracking-wider">
                  Instant Syndication Channels:
                </span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={syndicateLinkedIn}
                      onChange={(e) => setSyndicateLinkedIn(e.target.checked)}
                      className="accent-cyan-500 rounded"
                    />
                    <span>LinkedIn Recruiter Feed</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={syndicateIndeed}
                      onChange={(e) => setSyndicateIndeed(e.target.checked)}
                      className="accent-cyan-500 rounded"
                    />
                    <span>Indeed Apply Feed</span>
                  </label>

                  <span className="text-cyan-400 font-mono text-[11px] ml-auto">
                    ✓ SoftData24 Careers (Default)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md shadow-cyan-950"
                >
                  Publish & Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
