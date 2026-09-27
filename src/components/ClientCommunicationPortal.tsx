import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Send, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { Candidate, JobPosting } from '../types/index.ts';

interface ClientCommunicationPortalProps {
  candidates: Candidate[];
  jobs: JobPosting[];
  onSelectCandidate: (candidate: Candidate) => void;
  onSubmitClientFeedback: (candidateId: string, clientName: string, clientCompany: string, verdict: 'approved' | 'rejected' | 'interview_requested', comments: string) => void;
}

export const ClientCommunicationPortal: React.FC<ClientCommunicationPortalProps> = ({
  candidates,
  jobs,
  onSelectCandidate,
  onSubmitClientFeedback,
}) => {
  const [selectedClient, setSelectedClient] = useState<string>('Vertex FinTech Global');
  const [activeFeedbackCandidateId, setActiveFeedbackCandidateId] = useState<string | null>(null);
  const [feedbackVerdict, setFeedbackVerdict] = useState<'interview_requested' | 'approved' | 'rejected'>('interview_requested');
  const [feedbackComments, setFeedbackComments] = useState('');
  const [feedbackAuthor, setFeedbackAuthor] = useState('Rahul Mehta (VP Engineering)');

  const clientCompanies = Array.from(new Set(jobs.map(j => j.clientCompany)));

  // Candidates relevant to this client
  const clientJobs = jobs.filter(j => j.clientCompany === selectedClient);
  const clientJobIds = clientJobs.map(j => j.id);
  const clientCandidates = candidates.filter(c => clientJobIds.includes(c.appliedJobId));

  const handleFeedbackSubmit = (candidateId: string) => {
    if (!feedbackComments.trim()) return;
    onSubmitClientFeedback(
      candidateId,
      feedbackAuthor,
      selectedClient,
      feedbackVerdict,
      feedbackComments.trim()
    );
    setActiveFeedbackCandidateId(null);
    setFeedbackComments('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Client Collaboration & Candidate Dossier Desk</h2>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Secure Client Access Grid
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Collaborate directly with enterprise client hiring managers. Share vetted technical candidate dossiers, receive structured interview scorecards, and align on hiring decisions.
            </p>
          </div>

          {/* Client Company Selector */}
          <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 whitespace-nowrap">Active Client Account:</span>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-semibold"
            >
              {clientCompanies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Client Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold">Active Requisitions</span>
            <div className="text-xl font-mono font-bold text-white mt-0.5">{clientJobs.length} Roles</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold">Submitted Talent</span>
            <div className="text-xl font-mono font-bold text-cyan-400 mt-0.5">{clientCandidates.length} Candidates</div>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold">Interviews Requested</span>
            <div className="text-xl font-mono font-bold text-emerald-400 mt-0.5">
              {clientCandidates.filter(c => c.clientFeedback?.verdict === 'interview_requested' || c.status === 'client_review').length}
            </div>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 uppercase font-semibold">Avg Time to Feedback</span>
            <div className="text-xl font-mono font-bold text-sky-400 mt-0.5">8.4 Hours</div>
          </div>
        </div>
      </div>

      {/* Candidate Dossiers Submitted for this Client */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <h3 className="text-sm font-bold text-slate-200">
            Candidate Submissions for {selectedClient} ({clientCandidates.length})
          </h3>
          <span className="font-mono text-[11px]">Strict NDA · Anonymized/Vetted Profiles</span>
        </div>

        {clientCandidates.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 space-y-2">
            <p className="text-xs text-slate-400">No candidates currently presented for {selectedClient}.</p>
            <p className="text-[11px] text-slate-500">
              Use the AI Matching Engine or Candidate Pipeline to submit vetted candidates.
            </p>
          </div>
        ) : (
          clientCandidates.map((cand) => (
            <div
              key={cand.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-colors shadow-lg"
            >
              {/* Dossier Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-400 text-sm shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectCandidate(cand)}
                        className="text-base font-bold text-white hover:text-cyan-300 transition-colors text-left"
                      >
                        {cand.name}
                      </button>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                        {cand.matchScore}% ATS Verified
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {cand.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Target Role: <strong className="text-slate-200">{cand.appliedJobTitle}</strong> · {cand.experienceYears}y exp · Notice: {cand.noticePeriod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => setActiveFeedbackCandidateId(activeFeedbackCandidateId === cand.id ? null : cand.id)}
                    className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{cand.clientFeedback ? 'Update Feedback' : 'Submit Client Review'}</span>
                  </button>

                  <button
                    onClick={() => onSelectCandidate(cand)}
                    className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors"
                    title="View Full Profile"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Recruiter Vetting Summary */}
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 text-xs">
                <span className="text-[11px] font-semibold text-cyan-400 block mb-1">
                  SoftData24 Agency Vetting Notes:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {cand.summary}
                </p>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cand.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Existing Client Feedback Display */}
              {cand.clientFeedback && (
                <div className="p-3.5 bg-cyan-950/20 border border-cyan-900/50 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-cyan-300">
                      Feedback from {cand.clientFeedback.clientName} ({cand.clientFeedback.clientCompany}):
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800 uppercase">
                      {cand.clientFeedback.verdict.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-300 italic pt-1">
                    "{cand.clientFeedback.comments}"
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono block text-right">
                    Logged {cand.clientFeedback.date}
                  </span>
                </div>
              )}

              {/* Interactive Client Review Form Drawer */}
              {activeFeedbackCandidateId === cand.id && (
                <div className="p-4 bg-slate-950 rounded-xl border border-cyan-800/80 space-y-3 text-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Client Decision & Scorecard for {cand.name}
                    </span>
                    <button
                      onClick={() => setActiveFeedbackCandidateId(null)}
                      className="text-slate-500 hover:text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Reviewer Name & Role</label>
                      <input
                        type="text"
                        value={feedbackAuthor}
                        onChange={(e) => setFeedbackAuthor(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Decision / Next Step</label>
                      <select
                        value={feedbackVerdict}
                        onChange={(e) => setFeedbackVerdict(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200"
                      >
                        <option value="interview_requested">Request Technical Video Interview</option>
                        <option value="approved">Approve & Advance to Offer</option>
                        <option value="rejected">Pass (Skill/Budget Mismatch)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Detailed Technical Feedback & Availability</label>
                    <textarea
                      rows={3}
                      value={feedbackComments}
                      onChange={(e) => setFeedbackComments(e.target.value)}
                      placeholder="e.g. Strong architecture profile. Would like to conduct 60-min system design round next Tuesday at 2 PM IST..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleFeedbackSubmit(cand.id)}
                      disabled={!feedbackComments.trim()}
                      className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Client Feedback</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
};
