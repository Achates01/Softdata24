import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  ChevronRight, 
  Layers, 
  Sliders, 
  Building2, 
  Send,
  Zap,
  UserCheck
} from 'lucide-react';
import { Candidate, JobPosting } from '../types/index.ts';

interface AutomatedMatchingEngineProps {
  candidates: Candidate[];
  jobs: JobPosting[];
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenEmailWithCandidate: (candidate: Candidate) => void;
  onPresentToClient: (candidate: Candidate, job: JobPosting) => void;
}

export const AutomatedMatchingEngine: React.FC<AutomatedMatchingEngineProps> = ({
  candidates,
  jobs,
  onSelectCandidate,
  onOpenEmailWithCandidate,
  onPresentToClient,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const [matchThreshold, setMatchThreshold] = useState<number>(75);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Calculate dynamic match scores for all candidates against the selected job
  const matchedResults = React.useMemo(() => {
    if (!selectedJob) return [];

    const jobSkills = selectedJob.skillsRequired.map(s => s.toLowerCase());

    return candidates.map(c => {
      const candSkills = c.skills.map(s => s.toLowerCase());
      
      const matched = selectedJob.skillsRequired.filter(req => 
        candSkills.some(cs => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs))
      );
      
      const missing = selectedJob.skillsRequired.filter(req => 
        !candSkills.some(cs => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs))
      );

      // Skills score (up to 65%)
      const skillScore = jobSkills.length > 0 ? (matched.length / jobSkills.length) * 65 : 45;

      // Experience delta score (up to 25%)
      const expDelta = c.experienceYears - selectedJob.experienceReq;
      const expScore = expDelta >= 0 ? 25 : Math.max(5, 25 + expDelta * 4);

      // Notice period bonus (up to 10%)
      const noticeBonus = c.noticePeriod === 'Immediate' ? 10 : c.noticePeriod === '15 Days' ? 7 : c.noticePeriod === '30 Days' ? 4 : 0;

      const dynamicScore = Math.min(99, Math.round(skillScore + expScore + noticeBonus));

      let matchTier: 'elite' | 'strong' | 'moderate' | 'low' = 'low';
      let recommendation = 'Skill Gap - Candidate does not meet core requirements';

      if (dynamicScore >= 90) {
        matchTier = 'elite';
        recommendation = 'Elite Match · Fast-track immediately to Client Technical Lead';
      } else if (dynamicScore >= 80) {
        matchTier = 'strong';
        recommendation = 'Strong Match · Verified stack proficiency with solid experience overlap';
      } else if (dynamicScore >= 70) {
        matchTier = 'moderate';
        recommendation = 'Viable Candidate · Requires evaluation on missing stack elements';
      }

      return {
        candidate: c,
        dynamicScore,
        matched,
        missing,
        matchTier,
        recommendation,
        expDelta,
      };
    })
    .filter(res => res.dynamicScore >= matchThreshold)
    .sort((a, b) => b.dynamicScore - a.dynamicScore);
  }, [candidates, selectedJob, matchThreshold]);

  const handleSimulateRecalculation = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-cyan-950/30 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Automated Candidate-Job Matching Engine</h2>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Multi-Vector Neural Matcher
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Calculates semantic competency match, seniority alignment, notice period feasibility, and domain experience across your entire verified talent pool in real-time.
            </p>
          </div>

          {/* Quick Refresh */}
          <button
            onClick={handleSimulateRecalculation}
            disabled={isRecalculating}
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <Zap className={`w-3.5 h-3.5 text-cyan-400 ${isRecalculating ? 'animate-spin' : ''}`} />
            <span>{isRecalculating ? 'Recalculating Index...' : 'Recalculate Match Index'}</span>
          </button>
        </div>

        {/* Job Selection & Threshold Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Active Job Requisition Target:
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full bg-slate-950 text-xs text-slate-100 border border-slate-700/80 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 font-medium"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} — {job.clientCompany} ({job.experienceReq}+ Yrs · {job.location})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-semibold text-slate-300">Match Cutoff Threshold:</label>
              <span className="font-mono text-cyan-400 font-bold">{matchThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={matchThreshold}
              onChange={(e) => setMatchThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Broad (50%)</span>
              <span>Balanced (75%)</span>
              <span>Ultra-Strict (90%)</span>
            </div>
          </div>
        </div>

        {/* Selected Job Stack Overview */}
        {selectedJob && (
          <div className="mt-4 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Required Stack:</span>
              {selectedJob.skillsRequired.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-slate-900 border border-slate-700/80 text-cyan-300 px-2 py-0.5 rounded font-mono text-[11px]"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="text-slate-400 text-[11px] font-mono">
              Target CTC: <span className="text-slate-200">{selectedJob.maxSalary}</span>
            </div>
          </div>
        )}
      </div>

      {/* Match Results Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Ranked Matches: <strong className="text-slate-200">{matchedResults.length} candidates</strong> meet or exceed {matchThreshold}% match threshold
          </span>
          <span className="font-mono text-[11px]">Sorted by algorithmic compatibility</span>
        </div>

        {matchedResults.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 space-y-2">
            <p className="text-sm font-semibold text-slate-300">No candidates match {matchThreshold}% cutoff for this role.</p>
            <p className="text-xs text-slate-500">
              Try lowering the threshold slider above or import new talent profiles via the AI Resume Parser.
            </p>
          </div>
        ) : (
          matchedResults.map((result, index) => {
            const { candidate, dynamicScore, matched, missing, recommendation, matchTier } = result;

            return (
              <div
                key={candidate.id}
                className="bg-slate-900 border border-slate-800 hover:border-cyan-700/60 rounded-xl p-5 shadow-lg transition-all space-y-4"
              >
                {/* Top Row: Candidate info & Match Score Gauge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-white text-sm shrink-0">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectCandidate(candidate)}
                          className="text-base font-bold text-white hover:text-cyan-300 transition-colors text-left"
                        >
                          {candidate.name}
                        </button>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {candidate.source}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-slate-800">
                          {candidate.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {candidate.roleTitle} · {candidate.currentCompany} · {candidate.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono block">
                        Compatibility
                      </span>
                      <span className="text-2xl font-mono font-bold text-cyan-400">
                        {dynamicScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPresentToClient(candidate, selectedJob)}
                        className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
                        title="Share vetted dossier with Client Hiring Manager"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Present to Client</span>
                      </button>

                      <button
                        onClick={() => onOpenEmailWithCandidate(candidate)}
                        className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
                        title="Send invitation email"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommendation Banner */}
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 flex items-start sm:items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-slate-300 font-medium">{recommendation}</span>
                </div>

                {/* Skills Taxonomy Breakdown: Matched vs Missing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Matched Stack */}
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-emerald-900/30 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Stack Alignment ({matched.length}/{selectedJob.skillsRequired.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {matched.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 text-[11px] px-2 py-0.5 rounded font-mono"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing or Unverified Stack */}
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Missing / Requires Validation ({missing.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {missing.length === 0 ? (
                        <span className="text-slate-500 italic text-[11px]">
                          Complete stack coverage detected.
                        </span>
                      ) : (
                        missing.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-amber-950/30 text-amber-300/90 border border-amber-900/40 text-[11px] px-2 py-0.5 rounded font-mono"
                          >
                            ? {skill}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics bar */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                  <span>Experience: <strong className="text-slate-200">{candidate.experienceYears} Years</strong> (Required: {selectedJob.experienceReq}+ Yrs)</span>
                  <span>Notice Period: <strong className="text-cyan-400">{candidate.noticePeriod}</strong></span>
                  <span>Compensation Ask: <strong className="text-slate-200">{candidate.ctcExpected}</strong></span>
                  <button
                    onClick={() => onSelectCandidate(candidate)}
                    className="text-cyan-400 hover:text-cyan-300 font-sans font-semibold flex items-center gap-1"
                  >
                    <span>View Full ATS Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
