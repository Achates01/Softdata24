import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { CandidateTrackingDashboard } from './components/CandidateTrackingDashboard.tsx';
import { AutomatedMatchingEngine } from './components/AutomatedMatchingEngine.tsx';
import { JobSyndicationHub } from './components/JobSyndicationHub.tsx';
import { EmailAutomationCenter } from './components/EmailAutomationCenter.tsx';
import { ClientCommunicationPortal } from './components/ClientCommunicationPortal.tsx';
import { JobSeekerView } from './components/JobSeekerView.tsx';
import { AIResumeParserModal } from './components/AIResumeParserModal.tsx';
import { CandidateDetailModal } from './components/CandidateDetailModal.tsx';
import { Footer } from './components/Footer.tsx';

import { 
  Candidate, 
  JobPosting, 
  EmailTemplate, 
  NotificationItem, 
  SyndicationEvent, 
  PipelineStage 
} from './types/index.ts';

import { 
  INITIAL_CANDIDATES, 
  INITIAL_JOBS, 
  INITIAL_EMAIL_TEMPLATES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SYNDICATIONS 
} from './data/mockData.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('ats');
  const [userRole, setUserRole] = useState<'recruiter' | 'client_manager' | 'job_seeker'>('recruiter');

  // Application Data State
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_EMAIL_TEMPLATES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [syndications, setSyndications] = useState<SyndicationEvent[]>(INITIAL_SYNDICATIONS);

  // Modals & Active Selections
  const [isParserOpen, setIsParserOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [targetCandidateForEmail, setTargetCandidateForEmail] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Notification helper
  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Add parsed candidate
  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
    addNotification({
      type: 'application',
      title: 'New Resume Parsed by AI',
      message: `${newCand.name} (${newCand.roleTitle}) was parsed and added to Screening pipeline.`,
      relatedCandidateId: newCand.id,
      relatedJobId: newCand.appliedJobId,
    });
  };

  // Update candidate status
  const handleUpdateStatus = (candidateId: string, newStatus: PipelineStage) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          return {
            ...c,
            status: newStatus,
            notes: [
              ...c.notes,
              {
                id: `note-${Date.now()}`,
                author: 'ATS System Workflow',
                text: `Advanced candidate status to "${newStatus.replace('_', ' ').toUpperCase()}".`,
                date: new Date().toISOString().replace('T', ' ').slice(0, 16)
              }
            ]
          };
        }
        return c;
      })
    );

    const cand = candidates.find(c => c.id === candidateId);
    if (cand) {
      addNotification({
        type: 'match',
        title: `Candidate Advanced: ${newStatus.toUpperCase()}`,
        message: `${cand.name} moved to stage "${newStatus.replace('_', ' ')}".`,
        relatedCandidateId: candidateId,
      });
    }

    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Add recruiter note
  const handleAddNote = (candidateId: string, noteText: string) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          const updatedNotes = [
            ...c.notes,
            {
              id: `note-${Date.now()}`,
              author: 'Priya Sharma (Sr. Recruiter)',
              text: noteText,
              date: new Date().toISOString().replace('T', ' ').slice(0, 16)
            }
          ];
          return { ...c, notes: updatedNotes };
        }
        return c;
      })
    );

    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate(prev => {
        if (!prev) return null;
        return {
          ...prev,
          notes: [
            ...prev.notes,
            {
              id: `note-${Date.now()}`,
              author: 'Priya Sharma (Sr. Recruiter)',
              text: noteText,
              date: new Date().toISOString().replace('T', ' ').slice(0, 16)
            }
          ]
        };
      });
    }
  };

  // Open email composer with candidate
  const handleOpenEmailWithCandidate = (candidate: Candidate) => {
    setTargetCandidateForEmail(candidate);
    setSelectedCandidate(null);
    setCurrentTab('emails');
  };

  // Dispatch email notification
  const handleSendAutomatedEmail = (candidateEmail: string, stage: PipelineStage, subject: string, body: string) => {
    const cand = candidates.find(c => c.email === candidateEmail);
    if (cand) {
      handleAddNote(cand.id, `Dispatched automated email: "${subject}"`);
      addNotification({
        type: 'client_feedback',
        title: 'Automated Email Transmitted',
        message: `Sent "${subject.slice(0, 40)}..." to ${cand.name} (${candidateEmail}).`,
        relatedCandidateId: cand.id,
      });
    }
  };

  // Toggle syndication on LinkedIn/Indeed
  const handleToggleJobSyndication = (jobId: string, platform: 'linkedin' | 'indeed' | 'softdata24') => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id === jobId) {
          const nextVal = !j.syndicatedPlatforms[platform];
          return {
            ...j,
            syndicatedPlatforms: {
              ...j.syndicatedPlatforms,
              [platform]: nextVal
            }
          };
        }
        return j;
      })
    );

    const targetJob = jobs.find(j => j.id === jobId);
    const platformName = platform === 'linkedin' ? 'LinkedIn' : platform === 'indeed' ? 'Indeed' : 'SoftData24';
    
    addNotification({
      type: 'syndication',
      title: `${platformName} Feed Updated`,
      message: `Toggled syndication for "${targetJob?.title || 'Job'}" on ${platformName}.`,
      relatedJobId: jobId
    });
  };

  // Create new job
  const handleCreateJob = (newJob: JobPosting) => {
    setJobs(prev => [newJob, ...prev]);
    
    // Add syndication events
    if (newJob.syndicatedPlatforms.linkedin) {
      setSyndications(prev => [
        {
          id: `syn-${Date.now()}-li`,
          jobId: newJob.id,
          jobTitle: newJob.title,
          platform: 'LinkedIn',
          status: 'Active',
          externalRef: `li_post_${Math.floor(100000 + Math.random() * 900000)}`,
          views: 12,
          applications: 0,
          lastSync: 'Just now'
        },
        ...prev
      ]);
    }

    if (newJob.syndicatedPlatforms.indeed) {
      setSyndications(prev => [
        {
          id: `syn-${Date.now()}-ind`,
          jobId: newJob.id,
          jobTitle: newJob.title,
          platform: 'Indeed',
          status: 'Active',
          externalRef: `ind_job_${Math.floor(100000 + Math.random() * 900000)}`,
          views: 9,
          applications: 0,
          lastSync: 'Just now'
        },
        ...prev
      ]);
    }

    addNotification({
      type: 'syndication',
      title: 'New Requisition Syndicated',
      message: `"${newJob.title}" broadcast to LinkedIn, Indeed & SoftData24.`,
      relatedJobId: newJob.id
    });
  };

  // Client Feedback submission
  const handleSubmitClientFeedback = (
    candidateId: string, 
    clientName: string, 
    clientCompany: string, 
    verdict: 'approved' | 'rejected' | 'interview_requested', 
    comments: string
  ) => {
    const feedbackDate = new Date().toISOString().replace('T', ' ').slice(0, 16);

    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          const nextStatus: PipelineStage = 
            verdict === 'interview_requested' ? 'technical' :
            verdict === 'approved' ? 'offer' : 'rejected';

          return {
            ...c,
            status: nextStatus,
            clientFeedback: {
              clientName,
              clientCompany,
              verdict,
              comments,
              date: feedbackDate,
            },
            notes: [
              ...c.notes,
              {
                id: `note-${Date.now()}`,
                author: `Client: ${clientName} (${clientCompany})`,
                text: `Decision: ${verdict.toUpperCase()}. Notes: ${comments}`,
                date: feedbackDate
              }
            ]
          };
        }
        return c;
      })
    );

    const cand = candidates.find(c => c.id === candidateId);
    addNotification({
      type: 'client_feedback',
      title: `Client Feedback: ${clientCompany}`,
      message: `${clientName} recorded decision "${verdict.replace('_', ' ').toUpperCase()}" for ${cand?.name}.`,
      relatedCandidateId: candidateId
    });
  };

  // Job seeker direct application
  const handleApplyForJob = (job: JobPosting, name: string, email: string, skills: string[]) => {
    const newCand: Candidate = {
      id: `cand-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone: '+91 98100 00000',
      location: 'Bangalore / Remote',
      roleTitle: job.title,
      experienceYears: job.experienceReq,
      currentCompany: 'Direct Tech Applicant',
      noticePeriod: '15 Days',
      ctcCurrent: '₹22,00,000',
      ctcExpected: job.maxSalary,
      status: 'sourced',
      matchScore: 89,
      skills: skills.length > 0 ? skills : job.skillsRequired,
      summary: `Applicant submitted directly via SoftData24 Job Portal for ${job.title} role.`,
      source: 'SoftData24',
      rating: 4,
      appliedJobId: job.id,
      appliedJobTitle: job.title,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'SoftData24 Careers Portal',
          text: `Direct candidate submission received for ${job.title}.`,
          date: new Date().toISOString().replace('T', ' ').slice(0, 16)
        }
      ]
    };

    setCandidates(prev => [newCand, ...prev]);
    setJobs(prev =>
      prev.map(j => (j.id === job.id ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    addNotification({
      type: 'application',
      title: 'Direct Job Application Received',
      message: `${name} applied for "${job.title}".`,
      relatedCandidateId: newCand.id,
      relatedJobId: job.id
    });
  };

  const handlePresentCandidateToClient = (candidate: Candidate, job: JobPosting) => {
    handleUpdateStatus(candidate.id, 'client_review');
    setCurrentTab('clients');
    addNotification({
      type: 'client_feedback',
      title: 'Presented to Client',
      message: `${candidate.name} shortlisted and presented to ${job.clientCompany}.`,
      relatedCandidateId: candidate.id
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenParser={() => setIsParserOpen(true)}
        notifications={notifications}
        onMarkNotificationAsRead={(id) => {
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        }}
        onClearAllNotifications={() => setNotifications([])}
        onSelectCandidateById={(id) => {
          const cand = candidates.find(c => c.id === id);
          if (cand) setSelectedCandidate(cand);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Recruiter Tab: Candidate Pipeline (ATS) */}
        {userRole === 'recruiter' && currentTab === 'ats' && (
          <CandidateTrackingDashboard
            candidates={candidates}
            jobs={jobs}
            onSelectCandidate={(cand) => setSelectedCandidate(cand)}
            onUpdateStatus={handleUpdateStatus}
            onOpenParser={() => setIsParserOpen(true)}
            onOpenEmailWithCandidate={handleOpenEmailWithCandidate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Recruiter Tab: AI Matching Engine */}
        {userRole === 'recruiter' && currentTab === 'matching' && (
          <AutomatedMatchingEngine
            candidates={candidates}
            jobs={jobs}
            onSelectCandidate={(cand) => setSelectedCandidate(cand)}
            onOpenEmailWithCandidate={handleOpenEmailWithCandidate}
            onPresentToClient={handlePresentCandidateToClient}
          />
        )}

        {/* Recruiter Tab: Job Syndication (LinkedIn & Indeed) */}
        {userRole === 'recruiter' && currentTab === 'syndication' && (
          <JobSyndicationHub
            jobs={jobs}
            syndications={syndications}
            onToggleJobSyndication={handleToggleJobSyndication}
            onCreateJob={handleCreateJob}
            onRefreshFeed={() => {
              addNotification({
                type: 'syndication',
                title: 'Global Feed Refreshed',
                message: 'Pulled latest applicant clicks from LinkedIn and Indeed.',
              });
            }}
          />
        )}

        {/* Recruiter Tab: Email Automation Center */}
        {userRole === 'recruiter' && currentTab === 'emails' && (
          <EmailAutomationCenter
            templates={templates}
            onSaveTemplate={(updatedTpl) => {
              setTemplates(prev => prev.map(t => t.id === updatedTpl.id ? updatedTpl : t));
              addNotification({
                type: 'client_feedback',
                title: 'Email Template Saved',
                message: `Template "${updatedTpl.name}" updated successfully.`,
              });
            }}
            candidates={candidates}
            onSendAutomatedEmail={handleSendAutomatedEmail}
            targetCandidateForEmail={targetCandidateForEmail}
          />
        )}

        {/* Client Manager Tab or Recruiter 'clients' View */}
        {(userRole === 'client_manager' || (userRole === 'recruiter' && currentTab === 'clients')) && (
          <ClientCommunicationPortal
            candidates={candidates}
            jobs={jobs}
            onSelectCandidate={(cand) => setSelectedCandidate(cand)}
            onSubmitClientFeedback={handleSubmitClientFeedback}
          />
        )}

        {/* Job Seeker Portal View */}
        {(userRole === 'job_seeker' || currentTab === 'candidate_portal') && (
          <JobSeekerView
            jobs={jobs}
            myCandidateProfile={candidates[0]}
            onApplyForJob={handleApplyForJob}
            onOpenParser={() => setIsParserOpen(true)}
          />
        )}

      </main>

      {/* Global Modals */}
      {/* 1. AI Resume Parser Modal */}
      <AIResumeParserModal
        isOpen={isParserOpen}
        onClose={() => setIsParserOpen(false)}
        jobs={jobs}
        onAddCandidate={handleAddCandidate}
        onSelectCandidateById={(id) => {
          const cand = candidates.find(c => c.id === id);
          if (cand) setSelectedCandidate(cand);
        }}
      />

      {/* 2. Candidate Detail Dossier Drawer Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
        onOpenEmailWithCandidate={handleOpenEmailWithCandidate}
        jobs={jobs}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
