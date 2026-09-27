import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Edit3, 
  Save, 
  Eye, 
  Clock, 
  RotateCcw, 
  Copy,
  Layers,
  Check
} from 'lucide-react';
import { EmailTemplate, Candidate, PipelineStage } from '../types/index.ts';

interface EmailAutomationCenterProps {
  templates: EmailTemplate[];
  onSaveTemplate: (updatedTemplate: EmailTemplate) => void;
  candidates: Candidate[];
  onSendAutomatedEmail: (candidateEmail: string, stage: PipelineStage, subject: string, body: string) => void;
  targetCandidateForEmail?: Candidate | null;
}

export const EmailAutomationCenter: React.FC<EmailAutomationCenterProps> = ({
  templates,
  onSaveTemplate,
  candidates,
  onSendAutomatedEmail,
  targetCandidateForEmail,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || '');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    targetCandidateForEmail?.id || candidates[0]?.id || ''
  );
  const [isEditing, setIsEditing] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);

  const currentTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  const [editSubject, setEditSubject] = useState(currentTemplate?.subject || '');
  const [editBody, setEditBody] = useState(currentTemplate?.body || '');

  // When switching templates
  const handleSelectTemplate = (id: string) => {
    setSelectedTemplateId(id);
    const tpl = templates.find(t => t.id === id);
    if (tpl) {
      setEditSubject(tpl.subject);
      setEditBody(tpl.body);
      setIsEditing(false);
      setSendSuccessMessage(null);
    }
  };

  const sampleCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  // Helper to replace template variables
  const renderTemplateString = (str: string) => {
    if (!sampleCandidate) return str;
    return str
      .replace(/{{candidate_name}}/g, sampleCandidate.name)
      .replace(/{{job_title}}/g, sampleCandidate.appliedJobTitle)
      .replace(/{{company_name}}/g, 'SoftData24 Enterprise Client')
      .replace(/{{client_company}}/g, 'Vertex FinTech Global')
      .replace(/{{recruiter_name}}/g, 'Priya Sharma (Sr. Talent Partner)')
      .replace(/{{calendar_link}}/g, 'https://meet.softdata24.com/screen/sch-4921')
      .replace(/{{interview_date}}/g, 'Thursday, Oct 1st at 11:00 AM IST')
      .replace(/{{interview_link}}/g, 'https://meet.softdata24.com/interview/arch-7721')
      .replace(/{{offered_ctc}}/g, '₹44,00,000 Annual CTC + ₹6,00,000 Retention Bonus')
      .replace(/{{joining_date}}/g, 'November 2, 2026')
      .replace(/{{job_location}}/g, sampleCandidate.location)
      .replace(/{{acceptance_deadline}}/g, 'October 5, 2026');
  };

  const handleSave = () => {
    if (!currentTemplate) return;
    const updated: EmailTemplate = {
      ...currentTemplate,
      subject: editSubject,
      body: editBody,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    onSaveTemplate(updated);
    setIsEditing(false);
  };

  const handleInsertVariable = (variable: string) => {
    const token = `{{${variable}}}`;
    setEditBody(prev => prev + ` ${token} `);
    navigator.clipboard?.writeText(token);
    setCopiedToken(variable);
    setTimeout(() => setCopiedToken(null), 1500);
  };

  const handleDispatchEmail = async () => {
    if (!sampleCandidate || !currentTemplate) return;

    setIsSending(true);
    setSendSuccessMessage(null);

    const finalSubject = renderTemplateString(editSubject);
    const finalBody = renderTemplateString(editBody);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: sampleCandidate.email,
          candidateName: sampleCandidate.name,
          stage: currentTemplate.stage,
          subject: finalSubject,
          body: finalBody,
        })
      });

      const data = await res.json();
      if (data.success) {
        onSendAutomatedEmail(sampleCandidate.email, currentTemplate.stage, finalSubject, finalBody);
        setSendSuccessMessage(`Successfully dispatched "${currentTemplate.name}" to ${sampleCandidate.name} (${sampleCandidate.email}). Ref: ${data.messageId}`);
      }
    } catch (err) {
      // client-side fallback
      onSendAutomatedEmail(sampleCandidate.email, currentTemplate.stage, finalSubject, finalBody);
      setSendSuccessMessage(`Dispatched "${currentTemplate.name}" to ${sampleCandidate.name}.`);
    } finally {
      setIsSending(false);
    }
  };

  const availableVariables = [
    'candidate_name',
    'job_title',
    'company_name',
    'client_company',
    'recruiter_name',
    'calendar_link',
    'interview_date',
    'interview_link',
    'offered_ctc',
    'joining_date',
    'job_location',
    'acceptance_deadline'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Automated Candidate Notification System</h2>
              <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Customizable Lifecycle Templates
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Configure trigger-based automated emails for application acknowledgments, screening invitations, client interview schedules, and offer letters.
            </p>
          </div>

          {/* Test Recipient Picker */}
          <div className="flex items-center gap-2.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 whitespace-nowrap">Preview with Candidate:</span>
            <select
              value={selectedCandidateId}
              onChange={(e) => setSelectedCandidateId(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.appliedJobTitle})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Success Alert */}
        {sendSuccessMessage && (
          <div className="mt-4 p-3 bg-emerald-950/50 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{sendSuccessMessage}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Left Template Selector, Right Editor & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Stage Templates Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block px-1">
            Communication Stages ({templates.length})
          </span>

          <div className="space-y-2">
            {templates.map((tpl) => {
              const isSelected = tpl.id === selectedTemplateId;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{tpl.name}</span>
                    <span className="text-[10px] font-mono uppercase bg-slate-950 text-cyan-400 px-1.5 py-0.5 rounded border border-slate-800">
                      {tpl.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {tpl.subject}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                    <span>{tpl.variables.length} placeholders</span>
                    <span>Updated {tpl.lastUpdated}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Insert Variables Palette */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-2 mt-4">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Dynamic Variable Tokens
            </span>
            <p className="text-[11px] text-slate-500">
              Click to append token to message body or copy to clipboard:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {availableVariables.map((v) => (
                <button
                  key={v}
                  onClick={() => handleInsertVariable(v)}
                  className="text-[10px] font-mono bg-slate-950 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-800 px-2 py-1 rounded transition-colors"
                >
                  {copiedToken === v ? '✓ Copied' : `{{${v}}}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Template Editor & Live Rendered Preview (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Editor Header Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">{currentTemplate?.name}</h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Stage: {currentTemplate?.stage}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Template</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize Template</span>
                </button>
              )}

              <button
                onClick={handleDispatchEmail}
                disabled={isSending}
                className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Dispatching...' : 'Dispatch Automated Email'}</span>
              </button>
            </div>
          </div>

          {/* Edit Mode Fields vs Static View */}
          {isEditing ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email Subject Line (Variables allowed)
                </label>
                <input
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email Body Content
                </label>
                <textarea
                  rows={12}
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
                />
              </div>
            </div>
          ) : null}

          {/* Real-time Rendered Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-300">Live Rendered Candidate Preview</span>
              </div>
              <span className="font-mono text-[11px]">
                To: {sampleCandidate ? `${sampleCandidate.name} <${sampleCandidate.email}>` : 'candidate@softdata24.com'}
              </span>
            </div>

            <div className="p-6 bg-slate-950/60 space-y-4">
              {/* Rendered Subject */}
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Subject:</span>
                <p className="text-xs font-bold text-white mt-0.5">
                  {renderTemplateString(editSubject)}
                </p>
              </div>

              {/* Rendered Body */}
              <div className="p-5 bg-slate-900/50 rounded-lg border border-slate-800/80">
                <pre className="font-sans text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {renderTemplateString(editBody)}
                </pre>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
