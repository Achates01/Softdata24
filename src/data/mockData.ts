import { Candidate, JobPosting, EmailTemplate, NotificationItem, SyndicationEvent } from '../types/index.ts';

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'job-101',
    title: 'Lead Cloud Solutions Architect',
    department: 'Enterprise Infrastructure',
    clientCompany: 'Vertex FinTech Global',
    location: 'Bangalore, India (Hybrid)',
    type: 'Full-time',
    experienceReq: 8,
    minSalary: '$110,000 / ₹38,00,000',
    maxSalary: '$150,000 / ₹52,00,000',
    skillsRequired: ['AWS', 'Kubernetes', 'Terraform', 'Microservices', 'Docker', 'Go', 'System Design'],
    description: 'Looking for a seasoned Cloud Architect to design multi-region banking infrastructure, secure PCI-DSS clusters, and lead high-availability cloud migration.',
    applicantsCount: 42,
    shortlistedCount: 6,
    status: 'active',
    createdDate: '2026-09-18',
    syndicatedPlatforms: {
      linkedin: true,
      indeed: true,
      softdata24: true,
    }
  },
  {
    id: 'job-102',
    title: 'Senior Full Stack React & Node Engineer',
    department: 'Core Product Engineering',
    clientCompany: 'Aura HealthTech Inc.',
    location: 'Remote (US & India hours)',
    type: 'Full-time',
    experienceReq: 5,
    minSalary: '$90,000 / ₹28,00,000',
    maxSalary: '$130,000 / ₹42,00,000',
    skillsRequired: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    description: 'Build enterprise-grade clinical collaboration tools and real-time telehealth interfaces serving over 2M active medical practitioners.',
    applicantsCount: 68,
    shortlistedCount: 9,
    status: 'active',
    createdDate: '2026-09-20',
    syndicatedPlatforms: {
      linkedin: true,
      indeed: true,
      softdata24: true,
    }
  },
  {
    id: 'job-103',
    title: 'Staff AI / Machine Learning Specialist',
    department: 'Cognitive Computing & NLP',
    clientCompany: 'Nexus Enterprise AI',
    location: 'Hyderabad / Remote',
    type: 'Full-time',
    experienceReq: 6,
    minSalary: '$120,000 / ₹45,00,000',
    maxSalary: '$165,000 / ₹60,00,000',
    skillsRequired: ['Python', 'PyTorch', 'LLMs', 'RAG Architecture', 'Vector DB', 'LangChain', 'Docker'],
    description: 'Develop customized enterprise GenAI workflows, fine-tune domain LLMs, and architect RAG pipelines for real-time compliance document processing.',
    applicantsCount: 31,
    shortlistedCount: 4,
    status: 'active',
    createdDate: '2026-09-22',
    syndicatedPlatforms: {
      linkedin: true,
      indeed: false,
      softdata24: true,
    }
  },
  {
    id: 'job-104',
    title: 'Principal DevOps & Site Reliability Engineer',
    department: 'Platform Reliability',
    clientCompany: 'OmniPay Payment Systems',
    location: 'Singapore / Pune (Hybrid)',
    type: 'Full-time',
    experienceReq: 7,
    minSalary: '$105,000 / ₹35,00,000',
    maxSalary: '$140,000 / ₹48,00,000',
    skillsRequired: ['Kubernetes', 'CI/CD', 'Prometheus', 'AWS', 'Linux', 'Terraform', 'Kafka'],
    description: 'Maintain 99.999% SLA across multi-cloud payment gateways, conduct chaos engineering experiments, and automate zero-downtime blue-green rollouts.',
    applicantsCount: 27,
    shortlistedCount: 5,
    status: 'active',
    createdDate: '2026-09-24',
    syndicatedPlatforms: {
      linkedin: true,
      indeed: true,
      softdata24: true,
    }
  },
  {
    id: 'job-105',
    title: 'Senior Data Platform Engineer',
    department: 'Big Data & Analytics',
    clientCompany: 'DataStream Logistics',
    location: 'Bangalore, India',
    type: 'Full-time',
    experienceReq: 5,
    minSalary: '$85,000 / ₹26,00,000',
    maxSalary: '$115,000 / ₹36,00,000',
    skillsRequired: ['Apache Spark', 'Kafka', 'Python', 'Snowflake', 'PostgreSQL', 'Airflow', 'AWS'],
    description: 'Architect streaming data lakehouses ingesting 500GB/hour of telematics, supply chain telemetry, and predictive transit models.',
    applicantsCount: 19,
    shortlistedCount: 3,
    status: 'active',
    createdDate: '2026-09-25',
    syndicatedPlatforms: {
      linkedin: false,
      indeed: true,
      softdata24: true,
    }
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Vikramaditya Sengupta',
    email: 'vikram.sengupta@cloudtech.dev',
    phone: '+91 98450 12891',
    location: 'Bangalore, India',
    roleTitle: 'Senior Cloud Solutions Architect',
    experienceYears: 9,
    currentCompany: 'InfraScale Systems',
    noticePeriod: '15 Days',
    ctcCurrent: '₹34,00,000',
    ctcExpected: '₹44,00,000',
    status: 'client_review',
    matchScore: 94,
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Microservices', 'Go', 'Python', 'System Design'],
    summary: 'Cloud Solutions Architect with 9+ years delivering enterprise fintech transformations on AWS & hybrid Kubernetes clusters.',
    source: 'LinkedIn',
    rating: 5,
    appliedJobId: 'job-101',
    appliedJobTitle: 'Lead Cloud Solutions Architect',
    appliedDate: '2026-09-21',
    notes: [
      {
        id: 'n-1',
        author: 'Priya Sharma (Sr. Recruiter)',
        text: 'Exceptional system design depth. Handled PCI-DSS compliance migration for 4 financial clients.',
        date: '2026-09-22 11:30'
      }
    ],
    clientFeedback: {
      clientName: 'Rahul Mehta',
      clientCompany: 'Vertex FinTech Global',
      verdict: 'interview_requested',
      comments: 'Very impressed with his AWS multi-region failover track record. Fast-track to final CTO round.',
      date: '2026-09-25 15:10'
    },
    parsedData: {
      candidateName: 'Vikramaditya Sengupta',
      email: 'vikram.sengupta@cloudtech.dev',
      phone: '+91 98450 12891',
      location: 'Bangalore, India',
      linkedin: 'https://linkedin.com/in/vikram-sengupta-cloud',
      github: 'https://github.com/vikram-infra',
      summary: '9+ years of deep cloud engineering. Designed scalable AWS Kubernetes architecture handling 15k RPS.',
      experienceYears: 9,
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Microservices', 'Go', 'Python'],
      workHistory: [
        {
          company: 'InfraScale Systems',
          role: 'Principal Cloud Architect',
          duration: '2022 - Present',
          highlights: [
            'Architected distributed AWS infrastructure cutting cloud spend by 28% while improving throughput 4x.',
            'Implemented automated GitOps Kubernetes pipelines serving 60+ microservices with zero downtime.'
          ]
        },
        {
          company: 'Cognizant Technology Solutions',
          role: 'Senior DevOps Specialist',
          duration: '2017 - 2022',
          highlights: [
            'Led cloud migration for tier-1 European investment banking client.'
          ]
        }
      ],
      education: [
        {
          degree: 'B.Tech in Information Technology',
          institution: 'BITS Pilani',
          year: '2017'
        }
      ],
      recommendedRoles: ['Lead Cloud Solutions Architect', 'Director of Infrastructure'],
      atsMatchScore: 94,
      keyStrengths: ['Certified AWS Solutions Architect Pro', 'Kubernetes CKA', 'High-scale Banking compliance']
    }
  },
  {
    id: 'cand-002',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@reactcraft.io',
    phone: '+91 98112 44321',
    location: 'Pune / Remote',
    roleTitle: 'Lead Full Stack React/Node Engineer',
    experienceYears: 6,
    currentCompany: 'Hyperscale Labs',
    noticePeriod: 'Immediate',
    ctcCurrent: '₹24,00,000',
    ctcExpected: '₹32,00,000',
    status: 'technical',
    matchScore: 91,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'Tailwind CSS', 'Redis', 'Jest'],
    summary: 'Passionate UI/Full-stack engineer specialized in high-performance React frontends, state management, and resilient Node.js services.',
    source: 'Indeed',
    rating: 5,
    appliedJobId: 'job-102',
    appliedJobTitle: 'Senior Full Stack React & Node Engineer',
    appliedDate: '2026-09-23',
    notes: [
      {
        id: 'n-2',
        author: 'Arjun Verma (Technical Lead)',
        text: 'Passed live coding round with distinction. Created a clean canvas diagramming prototype in 35 minutes.',
        date: '2026-09-24 16:45'
      }
    ]
  },
  {
    id: 'cand-003',
    name: 'Dr. Rohan Kulkarni',
    email: 'rohan.kulkarni@nlp-research.org',
    phone: '+91 99200 88219',
    location: 'Hyderabad, India',
    roleTitle: 'Staff AI / Machine Learning Specialist',
    experienceYears: 7,
    currentCompany: 'DeepVector AI',
    noticePeriod: '30 Days',
    ctcCurrent: '₹38,00,000',
    ctcExpected: '₹50,00,000',
    status: 'offer',
    matchScore: 96,
    skills: ['Python', 'PyTorch', 'LLMs', 'RAG Architecture', 'Vector DB', 'LangChain', 'Docker', 'FastAPI'],
    summary: 'PhD in NLP with 7 years productionizing generative AI pipelines, custom vector search, and fine-tuned open-source model inference.',
    source: 'SoftData24',
    rating: 5,
    appliedJobId: 'job-103',
    appliedJobTitle: 'Staff AI / Machine Learning Specialist',
    appliedDate: '2026-09-19',
    notes: [
      {
        id: 'n-3',
        author: 'Priya Sharma (Sr. Recruiter)',
        text: 'Offer package shared with candidate. Negotiations progressing well around ESOP tranche.',
        date: '2026-09-26 14:00'
      }
    ]
  },
  {
    id: 'cand-004',
    name: 'Sameer Chawla',
    email: 'sameer.chawla@devopsguild.net',
    phone: '+91 97115 67801',
    location: 'Noida, India',
    roleTitle: 'Senior SRE & Platform Engineer',
    experienceYears: 8,
    currentCompany: 'Zeta Payments',
    noticePeriod: '30 Days',
    ctcCurrent: '₹28,00,000',
    ctcExpected: '₹36,00,000',
    status: 'screening',
    matchScore: 88,
    skills: ['Kubernetes', 'AWS', 'Linux', 'Terraform', 'CI/CD', 'Prometheus', 'Python', 'Kafka'],
    summary: 'SRE veteran adept in multi-tenant Kubernetes clusters, automated rollback strategies, and zero-trust perimeter configurations.',
    source: 'LinkedIn',
    rating: 4,
    appliedJobId: 'job-104',
    appliedJobTitle: 'Principal DevOps & Site Reliability Engineer',
    appliedDate: '2026-09-24',
    notes: []
  },
  {
    id: 'cand-005',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@datainsight.co',
    phone: '+91 94471 22810',
    location: 'Bangalore, India',
    roleTitle: 'Senior Data Platform Engineer',
    experienceYears: 5,
    currentCompany: 'Swiggy Logistics Analytics',
    noticePeriod: 'Immediate',
    ctcCurrent: '₹22,00,000',
    ctcExpected: '₹29,00,000',
    status: 'client_review',
    matchScore: 92,
    skills: ['Apache Spark', 'Kafka', 'Python', 'Snowflake', 'Airflow', 'PostgreSQL', 'AWS'],
    summary: 'Built petabyte-scale data pipelines and low-latency feature stores powering real-time dynamic pricing algorithms.',
    source: 'SoftData24',
    rating: 4,
    appliedJobId: 'job-105',
    appliedJobTitle: 'Senior Data Platform Engineer',
    appliedDate: '2026-09-23',
    notes: [
      {
        id: 'n-5',
        author: 'Kavita Menon (Client Partner)',
        text: 'Client DataStream requested an exploratory interview call for Thursday morning.',
        date: '2026-09-25 10:20'
      }
    ]
  },
  {
    id: 'cand-006',
    name: 'Siddharth Nair',
    email: 'siddharth.nair@frontendpro.dev',
    phone: '+91 98840 91023',
    location: 'Chennai / Hybrid',
    roleTitle: 'Frontend Engineer (React / Next.js)',
    experienceYears: 4,
    currentCompany: 'Freshworks Inc.',
    noticePeriod: '15 Days',
    ctcCurrent: '₹17,00,000',
    ctcExpected: '₹23,00,000',
    status: 'sourced',
    matchScore: 82,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Jest'],
    summary: 'Product-focused frontend engineer building lightning-fast SaaS dashboards, design systems, and responsive web applications.',
    source: 'LinkedIn',
    rating: 4,
    appliedJobId: 'job-102',
    appliedJobTitle: 'Senior Full Stack React & Node Engineer',
    appliedDate: '2026-09-26',
    notes: []
  },
  {
    id: 'cand-007',
    name: 'Tarun Saxena',
    email: 'tarun.saxena@cloudops.in',
    phone: '+91 98104 33901',
    location: 'Gurgaon, India',
    roleTitle: 'Cloud Architect / DevOps Consultant',
    experienceYears: 10,
    currentCompany: 'Wipro Digital',
    noticePeriod: '60 Days',
    ctcCurrent: '₹32,00,000',
    ctcExpected: '₹40,00,000',
    status: 'hired',
    matchScore: 95,
    skills: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Linux'],
    summary: 'Cloud transformation lead with multi-country delivery experience across financial and automotive enterprises.',
    source: 'Employee Referral',
    rating: 5,
    appliedJobId: 'job-101',
    appliedJobTitle: 'Lead Cloud Solutions Architect',
    appliedDate: '2026-09-10',
    notes: [
      {
        id: 'n-7',
        author: 'Priya Sharma (Sr. Recruiter)',
        text: 'Offer accepted! Onboarding scheduled for Oct 1st.',
        date: '2026-09-25 18:00'
      }
    ]
  },
  {
    id: 'cand-008',
    name: 'Karthik Raman',
    email: 'karthik.raman@techsearch.in',
    phone: '+91 99001 55678',
    location: 'Bangalore, India',
    roleTitle: 'Junior Data Analyst & Python Scripter',
    experienceYears: 2,
    currentCompany: 'Alpha Data Services',
    noticePeriod: 'Immediate',
    ctcCurrent: '₹7,00,000',
    ctcExpected: '₹10,00,000',
    status: 'rejected',
    matchScore: 54,
    skills: ['Python', 'SQL', 'Excel', 'Tableau'],
    summary: 'Junior analyst seeking pivot into large-scale cloud distributed systems.',
    source: 'Indeed',
    rating: 2,
    appliedJobId: 'job-105',
    appliedJobTitle: 'Senior Data Platform Engineer',
    appliedDate: '2026-09-22',
    notes: [
      {
        id: 'n-8',
        author: 'Priya Sharma (Sr. Recruiter)',
        text: 'Does not meet 5-year requirement for Spark & streaming Kafka architecture. Retained in junior talent pool.',
        date: '2026-09-23 09:15'
      }
    ]
  }
];

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-1',
    stage: 'sourced',
    name: 'Application Received & Screening Confirmation',
    subject: 'Application Received: {{job_title}} at {{company_name}} via SoftData24',
    body: `Dear {{candidate_name}},

Thank you for your interest in the {{job_title}} role at {{company_name}}. We have successfully received your credentials through SoftData24's specialized IT recruitment division.

Our technical talent acquisition team is actively reviewing your background against the core technical competencies required for this engagement. You can track your real-time candidacy progress through our candidate portal.

If your profile matches our client's immediate architectural roadmap, a senior talent partner will reach out within 48 business hours to schedule an initial discussion.

Best regards,
{{recruiter_name}}
Senior Technical Recruiter | SoftData24 Talent Solutions
https://softdata24.com`,
    variables: ['candidate_name', 'job_title', 'company_name', 'recruiter_name'],
    lastUpdated: '2026-09-25'
  },
  {
    id: 'tpl-2',
    stage: 'screening',
    name: 'Recruiter Screening Call Invitation',
    subject: 'SoftData24 Recruiter Interview: {{job_title}} with {{company_name}}',
    body: `Hi {{candidate_name}},

Following an initial review of your profile and technical achievements, we are pleased to invite you for a 30-minute introductory recruiter screen for the {{job_title}} position with {{company_name}}.

In this discussion, we will explore:
1. Your hands-on project accomplishments and technical stack expertise
2. Your compensation expectations and notice period alignment
3. The technical roadmap and cultural environment at {{company_name}}

Please select a convenient time slot via the link below:
{{calendar_link}}

We look forward to speaking with you!

Warm regards,
{{recruiter_name}}
SoftData24 Talent Acquisition Team`,
    variables: ['candidate_name', 'job_title', 'company_name', 'calendar_link', 'recruiter_name'],
    lastUpdated: '2026-09-24'
  },
  {
    id: 'tpl-3',
    stage: 'client_review',
    name: 'Client Technical Interview Scheduling',
    subject: 'Client Technical Round Confirmed: {{job_title}} with {{client_company}}',
    body: `Dear {{candidate_name}},

We have fantastic news! The engineering leadership at {{client_company}} reviewed your parsed dossier and technical assessment from SoftData24 and requested a formal technical interview.

Session Details:
- Role: {{job_title}}
- Date & Time: {{interview_date}}
- Format: 60-Minute Video Assessment & Architecture Discussion
- Meeting Link: {{interview_link}}

Please ensure you have a stable network and a development environment ready if live coding or architecture whiteboard analysis is requested.

Best of luck! Your dedicated SoftData24 recruiter will contact you immediately following the round for debriefing.

Sincerely,
{{recruiter_name}}
SoftData24 Client Delivery Desk`,
    variables: ['candidate_name', 'job_title', 'client_company', 'interview_date', 'interview_link', 'recruiter_name'],
    lastUpdated: '2026-09-26'
  },
  {
    id: 'tpl-4',
    stage: 'offer',
    name: 'Formal Offer Letter & Terms Notification',
    subject: 'Congratulations! Official Offer for {{job_title}} at {{company_name}}',
    body: `Dear {{candidate_name}},

On behalf of {{company_name}} and the executive search leadership at SoftData24, we are thrilled to formally extend an offer of employment for the position of {{job_title}}!

Offer Highlights:
- Annual Compensation Package: {{offered_ctc}}
- Target Joining Date: {{joining_date}}
- Location: {{job_location}}

Your formal offer letter with comprehensive health benefits, equity/bonus schedules, and onboarding protocols has been securely uploaded to your candidate portal.

Please sign and return the acceptance document by {{acceptance_deadline}}. Congratulations on an outstanding hiring process!

With enthusiastic regards,
{{recruiter_name}}
Executive Director | SoftData24 Executive Search`,
    variables: ['candidate_name', 'job_title', 'company_name', 'offered_ctc', 'joining_date', 'job_location', 'acceptance_deadline', 'recruiter_name'],
    lastUpdated: '2026-09-26'
  },
  {
    id: 'tpl-5',
    stage: 'rejected',
    name: 'Constructive Feedback & Talent Pool Retain',
    subject: 'Update regarding your application for {{job_title}} at {{company_name}}',
    body: `Dear {{candidate_name}},

Thank you very much for investing your time and effort to interview for the {{job_title}} role at {{company_name}}.

While our client was impressed by your professional drive, they have chosen to proceed with another candidate whose current stack aligns even more immediately with this specific sprint cycle.

Because of your strong foundation, we have retained your verified profile in the SoftData24 Priority Talent Network. As new requisitions matching your expertise open across our enterprise client roster, your profile will receive expedited screening consideration.

We sincerely wish you the best in your career pursuits.

Best regards,
{{recruiter_name}}
SoftData24 Talent Operations`,
    variables: ['candidate_name', 'job_title', 'company_name', 'recruiter_name'],
    lastUpdated: '2026-09-23'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'client_feedback',
    title: 'Client Interview Requested',
    message: 'Rahul Mehta from Vertex FinTech requested final round for Vikramaditya Sengupta.',
    timestamp: '10 minutes ago',
    read: false,
    relatedCandidateId: 'cand-001'
  },
  {
    id: 'notif-2',
    type: 'match',
    title: 'High AI ATS Match Detected (96%)',
    message: 'Dr. Rohan Kulkarni achieved 96% match for Staff AI Specialist position.',
    timestamp: '45 minutes ago',
    read: false,
    relatedCandidateId: 'cand-003'
  },
  {
    id: 'notif-3',
    type: 'syndication',
    title: 'LinkedIn Job Feed Synced',
    message: 'Lead Cloud Solutions Architect post received 28 new impressions from LinkedIn Recruiter.',
    timestamp: '2 hours ago',
    read: true,
    relatedJobId: 'job-101'
  },
  {
    id: 'notif-4',
    type: 'application',
    title: 'New Resume Parsed via Indeed',
    message: 'Ananya Deshmukh applied for Senior Full Stack React & Node Engineer.',
    timestamp: '4 hours ago',
    read: true,
    relatedCandidateId: 'cand-002'
  }
];

export const INITIAL_SYNDICATIONS: SyndicationEvent[] = [
  {
    id: 'syn-1',
    jobId: 'job-101',
    jobTitle: 'Lead Cloud Solutions Architect',
    platform: 'LinkedIn',
    status: 'Active',
    externalRef: 'li_post_889214',
    views: 420,
    applications: 24,
    lastSync: '15 mins ago'
  },
  {
    id: 'syn-2',
    jobId: 'job-101',
    jobTitle: 'Lead Cloud Solutions Architect',
    platform: 'Indeed',
    status: 'Active',
    externalRef: 'ind_job_552190',
    views: 310,
    applications: 18,
    lastSync: '1 hour ago'
  },
  {
    id: 'syn-3',
    jobId: 'job-102',
    jobTitle: 'Senior Full Stack React & Node Engineer',
    platform: 'LinkedIn',
    status: 'Active',
    externalRef: 'li_post_771902',
    views: 680,
    applications: 49,
    lastSync: '30 mins ago'
  },
  {
    id: 'syn-4',
    jobId: 'job-102',
    jobTitle: 'Senior Full Stack React & Node Engineer',
    platform: 'Indeed',
    status: 'Active',
    externalRef: 'ind_job_338912',
    views: 450,
    applications: 19,
    lastSync: '2 hours ago'
  },
  {
    id: 'syn-5',
    jobId: 'job-103',
    jobTitle: 'Staff AI / Machine Learning Specialist',
    platform: 'LinkedIn',
    status: 'Active',
    externalRef: 'li_post_994101',
    views: 512,
    applications: 31,
    lastSync: '45 mins ago'
  }
];

export const SAMPLE_RESUMES = [
  {
    title: 'Senior Cloud & DevOps Architect',
    subtitle: '9 Yrs Exp · AWS, Kubernetes, Terraform, Go',
    targetJob: 'Lead Cloud Solutions Architect',
    content: `ARAVIND NEELAKANTAN
Email: aravind.neelakantan@cloudarch.io | Phone: +91 98451 90812
Location: Bangalore, India | LinkedIn: linkedin.com/in/aravind-cloud-architect | GitHub: github.com/aravind-infra

PROFESSIONAL SUMMARY
Senior Cloud Solutions Architect with 9+ years of engineering experience architecting scalable distributed systems, enterprise AWS multi-account infrastructure, and Kubernetes platform engineering. Led cloud migration programs for Fortune 500 financial institutions, reducing total cost of ownership by 35% while establishing automated zero-trust security perimeters.

CORE TECHNICAL SKILLS
- Cloud Platforms: AWS (EKS, Lambda, RDS, IAM, CloudFront, VPC, Route53), GCP
- Container & Orchestration: Kubernetes, Docker, Helm, ArgoCD, Istio Service Mesh
- Infrastructure as Code: Terraform, Terragrunt, CloudFormation, Ansible
- Programming & Scripting: Go, Python, Bash, Node.js
- CI/CD & Reliability: GitHub Actions, GitLab CI, Jenkins, Prometheus, Grafana, Datadog
- Architecture: Microservices, Event-Driven Architecture, High Availability, Disaster Recovery

WORK EXPERIENCE

Principal Cloud Architect | CloudNative Labs (Bangalore, India)
March 2022 - Present
- Designed and oversaw enterprise Kubernetes platform spanning 4 AWS regions handling 18,000 requests/sec with 99.995% uptime SLA.
- Standardized Terraform module library utilized across 40+ engineering squads, cutting new service provisioning lead time from 3 weeks to 15 minutes.
- Automated PCI-DSS and SOC2 compliance monitoring, closing 100% of audit findings within 1st quarter.

Senior DevOps & Infrastructure Engineer | Global Banking Tech (Hyderabad, India)
June 2018 - February 2022
- Migrated legacy on-premise banking monolith to containerized microservices on AWS EKS with zero customer downtime.
- Configured multi-region active-active database replication on Amazon Aurora PostgreSQL, reducing failover RTO to under 30 seconds.
- Mentored team of 8 DevOps engineers in GitOps workflows and chaos testing.

EDUCATION & CERTIFICATIONS
- B.Tech in Computer Science & Engineering - NIT Trichy (2018)
- AWS Certified Solutions Architect - Professional (Active)
- Certified Kubernetes Administrator (CKA)
`
  },
  {
    title: 'Principal Full Stack React/Node Engineer',
    subtitle: '7 Yrs Exp · React, Next.js, TypeScript, PostgreSQL',
    targetJob: 'Senior Full Stack React & Node Engineer',
    content: `NEHA KASHYAP
Email: neha.kashyap@frontendguild.dev | Phone: +91 97118 34901
Location: Delhi NCR / Remote | LinkedIn: linkedin.com/in/neha-kashyap-fullstack | Portfolio: nehakashyap.io

SUMMARY
Staff Full Stack Engineer with 7 years of deep product development across React, Next.js, Node.js, and TypeScript. Expert in state management, real-time WebSockets, micro-frontends, and high-throughput REST/GraphQL backend architecture. Passionate about design systems, web performance, and developer experience.

TECHNICAL EXPERTISE
- Frontend: React 19, Next.js 15, TypeScript, Tailwind CSS, Redux Toolkit, React Query, WebSockets
- Backend: Node.js, Express, NestJS, GraphQL, REST APIs, Microservices
- Data Stores: PostgreSQL, Redis, MongoDB, Prisma ORM
- Testing & Quality: Jest, Playwright, React Testing Library, Cypress
- DevOps & Tools: Docker, AWS S3/EC2, Vercel, GitHub Actions, Figma

EXPERIENCE

Lead Full Stack Engineer | SaaS Flow Technologies
January 2023 - Present
- Spearheaded the redesign of core analytics dashboard used by 45,000 daily enterprise users, improving Core Web Vitals (LCP from 3.8s to 0.9s).
- Architected collaborative real-time editing engine using WebSockets and Redis Pub/Sub, supporting 500+ concurrent editors per document.
- Built reusable enterprise UI component system adhering strictly to WCAG AA accessibility standards.

Senior Software Engineer | FinSmart Solutions
July 2020 - December 2022
- Built end-to-end payment onboarding funnel handling ₹120Cr in monthly transaction volumes with 99.98% success rate.
- Designed Node.js microservices with PostgreSQL connection pooling and Redis caching, cutting P99 API latency by 60%.

EDUCATION
- Bachelor of Engineering in Computer Science - Delhi Technological University (DTU) (2020)
`
  },
  {
    title: 'Staff AI/NLP & GenAI Specialist',
    subtitle: '6 Yrs Exp · Python, PyTorch, LLMs, RAG, Vector DB',
    targetJob: 'Staff AI / Machine Learning Specialist',
    content: `DR. HARSHVARDHAN RAO
Email: h.rao@aigenomics.tech | Phone: +91 99012 77410
Location: Hyderabad, India | LinkedIn: linkedin.com/in/harsh-rao-ai | Scholar: scholar.google.com/citations?user=hrao

PROFESSIONAL SUMMARY
Senior AI Research Engineer & GenAI Platform Specialist with 6+ years deploying machine learning systems in production. Expert in Large Language Models (LLM) fine-tuning, Retrieval-Augmented Generation (RAG), vector database indexing, and low-latency inference optimization. Published 4 peer-reviewed papers at ACL & EMNLP.

CORE COMPETENCIES
- Machine Learning & AI: PyTorch, Hugging Face Transformers, LangChain, LlamaIndex, vLLM
- Generative AI & NLP: RAG Architecture, LoRA / QLoRA Fine-tuning, Prompt Engineering, Semantic Search
- Databases & Vectors: Pinecone, Qdrant, Milvus, ChromaDB, PostgreSQL (pgvector)
- Backend & Cloud: Python, FastAPI, Docker, Kubernetes, AWS SageMaker, Ray Serve, Triton Inference Server

EXPERIENCE

Staff AI Engineer | CogniTech AI Systems
August 2022 - Present
- Engineered high-precision Enterprise RAG pipeline searching 5M+ technical contracts with 94.2% retrieval accuracy using hybrid dense-sparse embeddings.
- Optimized multi-tenant open-source LLM inference cluster using vLLM and TensorRT-LLM, cutting GPU serving costs by 52%.
- Created automated evaluation framework benchmarking hallucination rates, toxicity, and regulatory compliance.

Machine Learning Engineer | QuantAnalytics Lab
July 2019 - July 2022
- Built financial sentiment analysis models processing 200,000 news articles daily with sub-second prediction latency.
- Deployed real-time anomaly detection models protecting against fraudulent digital transaction surges.

EDUCATION
- Ph.D. in Computer Science (Natural Language Processing) - IIT Hyderabad (2021)
- M.Tech in Artificial Intelligence - IIT Hyderabad (2018)
`
  }
];
