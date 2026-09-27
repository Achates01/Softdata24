import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  ArrowUpDown, 
  Clock, 
  Download, 
  CheckCircle2, 
  ChevronRight,
  MapPin,
  ExternalLink,
  SlidersHorizontal,
  Mail,
  Building
} from 'lucide-react';
import { Candidate, PipelineStage, JobPosting } from '../types/index.ts';

interface CandidateTrackingDashboardProps {
  candidates: Candidate[];
  jobs: JobPosting[];
  onSelectCandidate: (candidate: Candidate) => void;
  onUpdateStatus: (candidateId: string, newStatus: PipelineStage) => void;
  onOpenParser: () => void;
  onOpenEmailWithCandidate: (candidate: Candidate) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'sourced', label: 'Sourced', color: 'border-slate-700' },
  { key: 'screening', label: 'Screening', color: 'border-sky-700' },
  { key: 'technical', label: 'Technical Assessment', color: 'border-indigo-700' },
  { key: 'client_review', label: 'Client Review', color: 'border-amber-700' },
  { key: 'offer', label: 'Offer Extended', color: 'border-emerald-700' },
  { key: 'hired', label: 'Hired & Onboarded', color: 'border-teal-700' },
];

export const CandidateTrackingDashboard: React.FC<CandidateTrackingDashboardProps> = ({
  candidates,
  jobs,
  onSelectCandidate,
  onUpdateStatus,
  onOpenParser,
  onOpenEmailWithCandidate,
  searchQuery,
  setSearchQuery,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');
  const [selectedNoticeFilter, setSelectedNoticeFilter] = useState<string>('all');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // Compute metrics
  const totalCount = candidates.length;
  const inScreening = candidates.filter(c => c.status === 'screening').length;
  const inClientReview = candidates.filter(c => c.status === 'client_review').length;
  const offersCount = candidates.filter(c => c.status === 'offer').length;
  const hiredCount = candidates.filter(c => c.status === 'hired').length;
  const avgMatch = totalCount > 0 
    ? Math.round(candidates.reduce((acc, c) => acc + c.matchScore, 0) / totalCount) 
    : 0;

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Search
      const matchesSearch = 
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Job Filter
      const matchesJob = selectedJobFilter === 'all' || c.appliedJobId === selectedJobFilter;

      // Stage Filter (in table view)
      const matchesStage = selectedStageFilter === 'all' || c.status === selectedStageFilter;

      // Source Filter
      const matchesSource = selectedSourceFilter === 'all' || c.source === selectedSourceFilter;

      // Notice Filter
      const matchesNotice = selectedNoticeFilter === 'all' || c.noticePeriod === selectedNoticeFilter;

      // Min Match Score
      const matchesScore = c.matchScore >= minMatchScore;

      return matchesSearch && matchesJob && matchesStage && matchesSource && matchesNotice && matchesScore;
    });
  }, [candidates, searchQuery, selectedJobFilter, selectedStageFilter, selectedSourceFilter, selectedNoticeFilter, minMatchScore]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Location', 'Role', 'Status', 'Match Score', 'Notice Period', 'Source'];
    const rows = filteredCandidates.map(c => [
      c.id,
      `"${c.name}"`,
      c.email,
      `"${c.phone}"`,
      `"${c.location}"`,
      `"${c.roleTitle}"`,
      c.status,
      c.matchScore,
      `"${c.noticePeriod}"`,
      c.source
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SoftData24_Candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getNextStage = (current: PipelineStage): PipelineStage | null => {
    const order: PipelineStage[] = ['sourced', 'screening', 'technical', 'client_review', 'offer', 'hired'];
    const idx = order.indexOf(current);
    if (idx !== -1 && idx < order.length - 1) {
      return order[idx + 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & KPI Stat Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Total Talent</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-white">{totalCount}</span>
            <span className="text-[11px] text-cyan-400 font-mono">Active</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Screening Round</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-sky-400">{inScreening}</span>
            <span className="text-[11px] text-slate-500 font-mono">In review</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Client Review</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-amber-400">{inClientReview}</span>
            <span className="text-[11px] text-amber-500/80 font-mono">Shortlisted</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Offers Extended</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-emerald-400">{offersCount}</span>
            <span className="text-[11px] text-emerald-500/80 font-mono">Pending</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Hired & Closed</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-teal-400">{hiredCount}</span>
            <span className="text-[11px] text-teal-500/80 font-mono">Placed</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Avg ATS Match</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono text-cyan-400">{avgMatch}%</span>
            <span className="text-[11px] text-cyan-500/80 font-mono">Precision</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search and Job Filter */}
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, role, skills, or location..."
                className="w-full bg-slate-950 text-xs text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Job Requisitions ({jobs.length})</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.clientCompany})
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                showAdvancedFilters || minMatchScore > 0 || selectedSourceFilter !== 'all' || selectedNoticeFilter !== 'all'
                  ? 'bg-cyan-950/60 border-cyan-800 text-cyan-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {(minMatchScore > 0 || selectedSourceFilter !== 'all' || selectedNoticeFilter !== 'all') && (
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
              )}
            </button>
          </div>

          {/* View Mode & Action Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'kanban' ? 'bg-cyan-950 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Kanban Board View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-cyan-950 text-cyan-300 font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tabular List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg transition-colors"
              title="Export Candidates to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={onOpenParser}
              className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors shadow-sm shadow-cyan-950"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Parse Resume</span>
            </button>
          </div>

        </div>

        {/* Expandable Advanced Filters */}
        {showAdvancedFilters && (
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs animate-in fade-in duration-150">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Minimum ATS Score</label>
              <select
                value={minMatchScore}
                onChange={(e) => setMinMatchScore(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
              >
                <option value={0}>Any Match Score</option>
                <option value={70}>70%+ (Viable Talent)</option>
                <option value={80}>80%+ (High Match)</option>
                <option value={90}>90%+ (Elite Precision)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Source Channel</label>
              <select
                value={selectedSourceFilter}
                onChange={(e) => setSelectedSourceFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
              >
                <option value="all">All Sources</option>
                <option value="LinkedIn">LinkedIn Recruiter</option>
                <option value="Indeed">Indeed Apply</option>
                <option value="SoftData24">SoftData24 Careers</option>
                <option value="Direct Upload">Direct Resume Parse</option>
                <option value="Employee Referral">Employee Referral</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Notice Period</label>
              <select
                value={selectedNoticeFilter}
                onChange={(e) => setSelectedNoticeFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
              >
                <option value="all">Any Notice Period</option>
                <option value="Immediate">Immediate Joiner</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
              </select>
            </div>

            {viewMode === 'table' && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-semibold">Pipeline Stage</label>
                <select
                  value={selectedStageFilter}
                  onChange={(e) => setSelectedStageFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200"
                >
                  <option value="all">All Stages</option>
                  {STAGES.map(s => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                  <option value="rejected">Archived / Rejected</option>
                </select>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Main Content: Kanban or Table */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageCandidates = filteredCandidates.filter(c => c.status === stage.key);
            return (
              <div 
                key={stage.key} 
                className="bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col min-w-[260px] max-h-[75vh]"
              >
                {/* Column Header */}
                <div className={`p-3 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between rounded-t-xl border-t-2 ${stage.color}`}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200">{stage.label}</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                    {stageCandidates.length}
                  </span>
                </div>

                {/* Candidate Cards Stream */}
                <div className="p-2.5 overflow-y-auto flex-1 space-y-2.5 scrollbar-thin">
                  {stageCandidates.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-600 font-mono">
                      No candidates in {stage.label.toLowerCase()}
                    </div>
                  ) : (
                    stageCandidates.map((cand) => {
                      const nextStage = getNextStage(cand.status);
                      return (
                        <div
                          key={cand.id}
                          className="bg-slate-950/90 border border-slate-800/90 hover:border-cyan-600/70 rounded-xl p-3 shadow-md hover:shadow-cyan-950/30 transition-all cursor-pointer group"
                          onClick={() => onSelectCandidate(cand)}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <div>
                              <p className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                                {cand.name}
                              </p>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {cand.roleTitle}
                              </p>
                            </div>
                            <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded shrink-0">
                              {cand.matchScore}%
                            </span>
                          </div>

                          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                            <span>{cand.experienceYears}y exp · {cand.noticePeriod}</span>
                            <span className="font-mono text-slate-400">{cand.source}</span>
                          </div>

                          {/* Skill tags */}
                          <div className="mt-2 flex flex-wrap gap-1">
                            {cand.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800/80 font-mono"
                              >
                                {skill}
                              </span>
                            ))}
                            {cand.skills.length > 3 && (
                              <span className="text-[10px] text-slate-500 font-mono">
                                +{cand.skills.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Fast Action Footer */}
                          <div 
                            className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => onOpenEmailWithCandidate(cand)}
                              className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                              title="Send stage update email"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </button>

                            {nextStage && (
                              <button
                                onClick={() => onUpdateStatus(cand.id, nextStage)}
                                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 px-2 py-0.5 rounded border border-cyan-800/60 flex items-center gap-1 transition-colors"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Tabular Data View */
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Candidate & Role</th>
                  <th className="py-3 px-4">ATS Match</th>
                  <th className="py-3 px-4">Experience & Notice</th>
                  <th className="py-3 px-4">Compensation</th>
                  <th className="py-3 px-4">Target Job</th>
                  <th className="py-3 px-4">Pipeline Stage</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                      No candidate profiles matched your filter query.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((cand) => (
                    <tr
                      key={cand.id}
                      onClick={() => onSelectCandidate(cand)}
                      className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-100">{cand.name}</div>
                        <div className="text-[11px] text-slate-400">{cand.roleTitle}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{cand.location} · {cand.source}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
                          {cand.matchScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <div>{cand.experienceYears} Years</div>
                        <div className="text-[11px] text-cyan-400">{cand.noticePeriod}</div>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <div className="text-slate-300">{cand.ctcExpected}</div>
                        <div className="text-[10px] text-slate-500">Cur: {cand.ctcCurrent}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-200 line-clamp-1">{cand.appliedJobTitle}</div>
                        <div className="text-[10px] text-slate-500">{cand.appliedDate}</div>
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={cand.status}
                          onChange={(e) => onUpdateStatus(cand.id, e.target.value as PipelineStage)}
                          className="bg-slate-950 text-xs font-semibold text-slate-200 border border-slate-800 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="sourced">Sourced</option>
                          <option value="screening">Screening</option>
                          <option value="technical">Technical</option>
                          <option value="client_review">Client Review</option>
                          <option value="offer">Offer</option>
                          <option value="hired">Hired</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenEmailWithCandidate(cand)}
                            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded"
                            title="Send email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onSelectCandidate(cand)}
                            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                          >
                            <span>Dossier</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
