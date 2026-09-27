import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  ArrowRight,
  ShieldAlert,
  FileText,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Candidate, PipelineStage, JobPosting } from '../types/index.ts';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onUpdateStatus: (candidateId: string, newStatus: PipelineStage) => void;
  onAddNote: (candidateId: string, noteText: string) => void;
  onOpenEmailWithCandidate: (candidate: Candidate) => void;
  jobs: JobPosting[];
}

const STAGES: { key: PipelineStage; label: string }[] = [
  { key: 'sourced', label: 'Sourced' },
  { key: 'screening', label: 'Screening' },
  { key: 'technical', label: 'Technical' },
  { key: 'client_review', label: 'Client Review' },
  { key: 'offer', label: 'Offer' },
  { key: 'hired', label: 'Hired' },
  { key: 'rejected', label: 'Rejected' },
];

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  onClose,
  onUpdateStatus,
  onAddNote,
  onOpenEmailWithCandidate,
  jobs,
}) => {
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'notes' | 'feedback'>('profile');

  if (!candidate) return null;

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddNote(candidate.id, newNote.trim());
    setNewNote('');
  };

  const appliedJob = jobs.find(j => j.id === candidate.appliedJobId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
              {candidate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-bold text-white">{candidate.name}</h2>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/80 px-2 py-0.5 rounded">
                  {candidate.source}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  ATS {candidate.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {candidate.roleTitle} · {candidate.currentCompany}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  {candidate.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenEmailWithCandidate(candidate)}
              className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors"
              title="Compose automated stage email"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dispatch Email</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Progression Selector */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800/90 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 shrink-0 mr-1">
            Pipeline Stage:
          </span>
          {STAGES.map((s) => {
            const isActive = candidate.status === s.key;
            return (
              <button
                key={s.key}
                onClick={() => onUpdateStatus(candidate.id, s.key)}
                className={`text-xs px-3 py-1 rounded-md font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-950'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800'
                }`}
              >
                {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Sub-tabs */}
        <div className="px-6 pt-3 border-b border-slate-800 bg-slate-900/60 flex items-center gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2 transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Candidate Profile & Match Analysis
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Recruiter Notes
            <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.2 rounded font-mono">
              {candidate.notes.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-2 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'feedback'
                ? 'border-cyan-400 text-cyan-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Client Communication
            {candidate.clientFeedback && (
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            )}
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'profile' && (
            <>
              {/* Compensation & Availability Metric Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Experience</span>
                  <span className="text-sm font-semibold text-slate-200">{candidate.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Notice Period</span>
                  <span className="text-sm font-semibold text-cyan-400">{candidate.noticePeriod}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Current Compensation</span>
                  <span className="text-sm font-semibold text-slate-300">{candidate.ctcCurrent}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Expected Compensation</span>
                  <span className="text-sm font-semibold text-emerald-400">{candidate.ctcExpected}</span>
                </div>
              </div>

              {/* Target Job Match Overview */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                      Target Job Requisition
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">
                      {candidate.appliedJobTitle}
                    </h4>
                    {appliedJob && (
                      <p className="text-xs text-slate-400">
                        Client: <span className="text-slate-300">{appliedJob.clientCompany}</span> · Location: {appliedJob.location}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">Algorithm Score</span>
                      <span className="text-lg font-mono font-bold text-cyan-400">{candidate.matchScore}%</span>
                    </div>
                  </div>
                </div>

                {/* Candidate Summary */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                    Recruiter Summary
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800/60">
                    {candidate.summary}
                  </p>
                </div>

                {/* Skills Taxonomy */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1.5">
                    Technical Stack & Core Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono bg-slate-900 text-slate-200 border border-slate-700/60 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Parsed Work History if available */}
              {candidate.parsedData?.workHistory && candidate.parsedData.workHistory.length > 0 && (
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    Verified Career History
                  </span>
                  <div className="space-y-3">
                    {candidate.parsedData.workHistory.map((work, idx) => (
                      <div key={idx} className="border-l-2 border-cyan-600/70 pl-3 py-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-200">{work.role}</p>
                          <span className="text-[11px] font-mono text-slate-500">{work.duration}</span>
                        </div>
                        <p className="text-xs text-cyan-400 font-medium">{work.company}</p>
                        {work.highlights && (
                          <ul className="mt-1.5 space-y-1 list-disc list-inside text-xs text-slate-400">
                            {work.highlights.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              {/* Add Note Input */}
              <form onSubmit={handleAddNoteSubmit} className="space-y-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record screening observations, interview notes, or client feedback..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!newNote.trim()}
                    className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Add Internal Note</span>
                  </button>
                </div>
              </form>

              {/* Note history */}
              <div className="space-y-2.5 pt-2">
                {candidate.notes.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">
                    No recruiter notes logged yet.
                  </p>
                ) : (
                  candidate.notes.map((note) => (
                    <div key={note.id} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-cyan-400">{note.author}</span>
                        <span className="text-slate-500 font-mono">{note.date}</span>
                      </div>
                      <p className="text-xs text-slate-300">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              {candidate.clientFeedback ? (
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{candidate.clientFeedback.clientName}</p>
                      <p className="text-[11px] text-slate-400">{candidate.clientFeedback.clientCompany}</p>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {candidate.clientFeedback.verdict.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                    "{candidate.clientFeedback.comments}"
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block text-right">
                    Logged on {candidate.clientFeedback.date}
                  </span>
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 p-6 space-y-2">
                  <p className="text-xs text-slate-400">
                    No client feedback received yet for {candidate.name}.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Present candidate dossier to client via the Client Portal tab to request feedback.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <span>SoftData24 ID: {candidate.id} · Applied {candidate.appliedDate}</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-3 py-1 rounded transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
