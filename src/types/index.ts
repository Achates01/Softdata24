export type PipelineStage = 
  | 'sourced'
  | 'screening'
  | 'technical'
  | 'client_review'
  | 'offer'
  | 'hired'
  | 'rejected';

export type CandidateSource = 
  | 'LinkedIn'
  | 'Indeed'
  | 'SoftData24'
  | 'Direct Upload'
  | 'Employee Referral';

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface ParsedResumeData {
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  summary: string;
  experienceYears: number;
  skills: string[];
  skillsByCategory?: {
    frontend?: string[];
    backend?: string[];
    cloud_devops?: string[];
    database?: string[];
    [key: string]: string[] | undefined;
  };
  workHistory: WorkExperience[];
  education: Education[];
  recommendedRoles: string[];
  atsMatchScore?: number;
  keyStrengths?: string[];
  potentialGaps?: string[];
  parsedWith?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  roleTitle: string;
  experienceYears: number;
  currentCompany: string;
  noticePeriod: string; // 'Immediate', '15 Days', '30 Days', '60 Days'
  ctcCurrent: string;
  ctcExpected: string;
  status: PipelineStage;
  matchScore: number; // 0 - 100
  skills: string[];
  summary: string;
  source: CandidateSource;
  rating: number; // 1 - 5
  appliedJobId: string;
  appliedJobTitle: string;
  appliedDate: string;
  notes: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
  }>;
  clientFeedback?: {
    clientName: string;
    clientCompany: string;
    verdict: 'approved' | 'rejected' | 'pending' | 'interview_requested';
    comments: string;
    date: string;
  };
  parsedData?: ParsedResumeData;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  clientCompany: string;
  clientLogo?: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Hybrid';
  experienceReq: number; // in years
  minSalary: string;
  maxSalary: string;
  skillsRequired: string[];
  description: string;
  applicantsCount: number;
  shortlistedCount: number;
  status: 'active' | 'paused' | 'filled';
  createdDate: string;
  syndicatedPlatforms: {
    linkedin: boolean;
    indeed: boolean;
    softdata24: boolean;
  };
}

export interface EmailTemplate {
  id: string;
  stage: PipelineStage;
  name: string;
  subject: string;
  body: string;
  variables: string[];
  lastUpdated: string;
}

export interface NotificationItem {
  id: string;
  type: 'application' | 'match' | 'client_feedback' | 'syndication' | 'interview';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedCandidateId?: string;
  relatedJobId?: string;
}

export interface ClientDossier {
  candidateId: string;
  candidateName: string;
  role: string;
  experience: number;
  matchScore: number;
  keySkills: string[];
  summary: string;
  expectedCompensation: string;
  noticePeriod: string;
  vettedByRecruiter: string;
  clientCompany: string;
  status: 'pending_review' | 'interview_scheduled' | 'shortlisted' | 'passed';
  notes: string[];
}

export interface SyndicationEvent {
  id: string;
  jobId: string;
  jobTitle: string;
  platform: 'LinkedIn' | 'Indeed' | 'SoftData24';
  status: 'Active' | 'Synced' | 'Paused' | 'Syncing';
  externalRef: string;
  views: number;
  applications: number;
  lastSync: string;
}
