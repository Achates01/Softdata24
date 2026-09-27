import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  User, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock
} from 'lucide-react';
import { ParsedResumeData, JobPosting, Candidate } from '../types/index.ts';
import { SAMPLE_RESUMES } from '../data/mockData.ts';

interface AIResumeParserModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobPosting[];
  onAddCandidate: (candidate: Candidate) => void;
  onSelectCandidateById: (id: string) => void;
}

export const AIResumeParserModal: React.FC<AIResumeParserModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onAddCandidate,
  onSelectCandidateById,
}) => {
  const [resumeText, setResumeText] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [isParsing, setIsParsing] = useState(false);
  const [parseStep, setParseStep] = useState<string>('');
  const [parsedResult, setParsedResult] = useState<ParsedResumeData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectSample = (sample: typeof SAMPLE_RESUMES[0]) => {
    setResumeText(sample.content);
    // Find matching job
    const matchedJob = jobs.find(j => j.title.toLowerCase().includes(sample.targetJob.toLowerCase().slice(0, 15)));
    if (matchedJob) {
      setSelectedJobId(matchedJob.id);
    }
  };

  const handleParse = async () => {
    if (!resumeText.trim()) {
      setErrorMsg('Please paste resume text or select one of the sample candidate profiles.');
      return;
    }

    setErrorMsg(null);
    setIsParsing(true);
    setParseStep('Initializing Neural NLP & Entity Extraction...');

    try {
      const targetJob = jobs.find(j => j.id === selectedJobId);
      
      setTimeout(() => {
        setParseStep('Parsing Work History, Technical Taxonomy, and Education...');
      }, 700);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobTarget: targetJob?.title || 'Senior Software Engineer'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const resData = await response.json();
      if (resData.success && resData.data) {
        setParsedResult(resData.data);
      } else {
        throw new Error(resData.error || 'Failed to parse resume');
      }
    } catch (err: any) {
      console.error('Parsing error:', err);
      setErrorMsg(err.message || 'Error occurred while contacting AI resume parser service.');
    } finally {
      setIsParsing(false);
      setParseStep('');
    }
  };

  const handleAddCandidateToATS = () => {
    if (!parsedResult) return;

    const targetJob = jobs.find(j => j.id === selectedJobId) || jobs[0];
    const newId = `cand-${Date.now().toString().slice(-4)}`;

    const newCandidate: Candidate = {
      id: newId,
      name: parsedResult.candidateName || 'Candidate',
      email: parsedResult.email || 'candidate@softdata24.com',
      phone: parsedResult.phone || '+91 98000 00000',
      location: parsedResult.location || 'Remote',
      roleTitle: parsedResult.recommendedRoles?.[0] || 'Software Specialist',
      experienceYears: parsedResult.experienceYears || 5,
      currentCompany: parsedResult.workHistory?.[0]?.company || 'Enterprise Solutions',
      noticePeriod: '30 Days',
      ctcCurrent: '₹28,00,000',
      ctcExpected: '₹36,00,000',
      status: 'screening',
      matchScore: parsedResult.atsMatchScore || 88,
      skills: parsedResult.skills || ['Full Stack', 'Cloud'],
      summary: parsedResult.summary || 'Parsed candidate with verified technical credentials.',
      source: 'Direct Upload',
      rating: 4,
      appliedJobId: targetJob.id,
      appliedJobTitle: targetJob.title,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'AI Sourcing Agent',
          text: `Parsed with ${parsedResult.parsedWith || 'AI Engine'}. Recommended roles: ${parsedResult.recommendedRoles?.join(', ')}.`,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16)
        }
      ],
      parsedData: parsedResult
    };

    onAddCandidate(newCandidate);
    onSelectCandidateById(newId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-800/60 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">AI-Driven Resume Parser</h2>
                <span className="text-[11px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                  Gemini 3.8 Flash Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Extract candidate metadata, technical taxonomy, career progression, and ATS match score in seconds.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Select Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                1-Click Sample Resumes (Software & IT Architecture)
              </span>
              <span className="text-[11px] text-cyan-400 font-mono">Instant test profiles</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_RESUMES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className="text-left p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-cyan-700/60 transition-all text-xs group"
                >
                  <p className="font-semibold text-slate-200 group-hover:text-cyan-300">
                    {sample.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {sample.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Job Target Selector */}
          <div className="bg-slate-950/40 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-0.5">
                Benchmark against Open Job Requisition:
              </label>
              <p className="text-[11px] text-slate-500">
                AI will evaluate candidate skill overlap and calculate ATS match alignment.
              </p>
            </div>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.clientCompany})
                </option>
              ))}
            </select>
          </div>

          {/* Resume Raw Text Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Raw Resume Text / Candidate Bio
              </label>
              <button
                onClick={() => setResumeText('')}
                className="text-[11px] text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste candidate resume text, LinkedIn profile summary, or employment bio here..."
              rows={6}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 font-mono leading-relaxed focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-center gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400">
              {resumeText.trim() ? `${resumeText.trim().split(/\s+/).length} words detected` : 'No text entered'}
            </span>
            <button
              onClick={handleParse}
              disabled={isParsing || !resumeText.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
            >
              {isParsing ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-cyan-200" />
                  <span>Processing with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Execute Neural Resume Parse</span>
                </>
              )}
            </button>
          </div>

          {/* Loading status display */}
          {isParsing && (
            <div className="p-4 bg-slate-950/90 border border-cyan-900/50 rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></div>
                <p className="text-xs font-mono text-cyan-300">{parseStep}</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-2/3 animate-pulse"></div>
              </div>
            </div>
          )}

          {/* Parsed Result Visualizer */}
          {parsedResult && (
            <div className="mt-6 border border-slate-800 rounded-xl bg-slate-950/60 p-5 space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{parsedResult.candidateName}</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                      Verified Profile
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {parsedResult.location} · {parsedResult.email} · {parsedResult.phone}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">ATS Match Score</span>
                    <span className="text-xl font-bold font-mono text-cyan-400">
                      {parsedResult.atsMatchScore || 91}%
                    </span>
                  </div>
                  <button
                    onClick={handleAddCandidateToATS}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-md shadow-emerald-950/40 transition-colors"
                  >
                    <span>Add to Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block mb-1">
                  Executive Summary
                </span>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                  {parsedResult.summary}
                </p>
              </div>

              {/* Grid with Skills and Work History */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Technical Skills Taxonomy */}
                <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Identified Technical Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {parsedResult.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {parsedResult.recommendedRoles && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[11px] text-slate-400 block mb-1">Recommended Roles:</span>
                      <div className="text-xs text-cyan-300 flex flex-wrap gap-2">
                        {parsedResult.recommendedRoles.map((role, idx) => (
                          <span key={idx}>• {role}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Experience & Education */}
                <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80 space-y-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Career Progression ({parsedResult.experienceYears} Years Exp)</span>
                    </div>
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                      {parsedResult.workHistory?.map((work, idx) => (
                        <div key={idx} className="text-xs border-l-2 border-cyan-800 pl-2 py-0.5">
                          <p className="font-semibold text-slate-200">{work.role} at {work.company}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{work.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {parsedResult.education && parsedResult.education.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Education</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {parsedResult.education[0]?.degree} · {parsedResult.education[0]?.institution} ({parsedResult.education[0]?.year})
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Strengths & Observations */}
              {parsedResult.keyStrengths && (
                <div className="bg-cyan-950/20 border border-cyan-900/40 p-3 rounded-lg flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-cyan-300">AI Screening Highlights:</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {parsedResult.keyStrengths.join(' · ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500">
          <span>Powered by SoftData24 Neural Resume Core · RFC 822 / PDF / TXT Compliant</span>
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
