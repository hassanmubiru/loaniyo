// Static data constants for the Loaniyo landing page

// ─── Interfaces ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: string;
  title: string;
  description: string;
  variant: 'standard' | 'featured';
}

export interface Statistic {
  value: number | string;
  suffix: string;
  label: string;
  isNumeric: boolean;
}

export interface SecurityFeature {
  icon: string;
  title: string;
  shortDescription: string;
  expandedDescription: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TrustedLogo {
  name: string;
  alt: string;
}

// ─── Navigation Links ──────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Security', href: '#security' },
  { label: 'Pricing', href: '#calculator' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
] as const;

// ─── Features (10 entries, 2 variants, no more than 4 consecutive same-size) ──

export const FEATURES: Feature[] = [
  {
    icon: 'Zap',
    title: 'Instant Loan Applications',
    description: 'Apply for loans in minutes with our streamlined digital process.',
    variant: 'featured',
  },
  {
    icon: 'BarChart3',
    title: 'Track Repayments',
    description: 'Monitor your repayment progress with real-time dashboards.',
    variant: 'standard',
  },
  {
    icon: 'History',
    title: 'Credit History',
    description: 'Build and view your credit score with transparent reporting.',
    variant: 'standard',
  },
  {
    icon: 'ShieldCheck',
    title: 'Secure Authentication',
    description: 'Multi-factor authentication keeps your account protected.',
    variant: 'standard',
  },
  {
    icon: 'Upload',
    title: 'Document Upload',
    description: 'Upload verification documents securely from any device.',
    variant: 'featured',
  },
  {
    icon: 'FileSignature',
    title: 'Digital Agreements',
    description: 'Sign loan agreements digitally with legally binding e-signatures.',
    variant: 'standard',
  },
  {
    icon: 'Bell',
    title: 'Notifications',
    description: 'Stay informed with real-time alerts on loan status changes.',
    variant: 'standard',
  },
  {
    icon: 'Clock',
    title: 'Payment Reminders',
    description: 'Never miss a payment with automated reminder notifications.',
    variant: 'standard',
  },
  {
    icon: 'Calculator',
    title: 'Loan Calculator',
    description: 'Estimate monthly payments before you apply for a loan.',
    variant: 'featured',
  },
  {
    icon: 'LayoutDashboard',
    title: 'Admin Dashboard',
    description: 'Manage loans, users, and analytics from one central hub.',
    variant: 'standard',
  },
];

// ─── Statistics (4 items) ──────────────────────────────────────────────────────

export const STATISTICS: Statistic[] = [
  {
    value: 99.9,
    suffix: '%',
    label: 'Platform Uptime',
    isNumeric: true,
  },
  {
    value: 5,
    suffix: ' min',
    label: 'Average Application Time',
    isNumeric: true,
  },
  {
    value: 'Bank-grade',
    suffix: '',
    label: 'Security',
    isNumeric: false,
  },
  {
    value: '24/7',
    suffix: '',
    label: 'Availability',
    isNumeric: false,
  },
];

// ─── Security Features (7 items) ──────────────────────────────────────────────

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    icon: 'Lock',
    title: 'Bank-Grade Encryption',
    shortDescription: 'AES-256 encryption protects all data in transit and at rest.',
    expandedDescription:
      'Every piece of data is encrypted using AES-256, the same standard used by leading banks worldwide, ensuring your information remains secure at every stage.',
  },
  {
    icon: 'UserCheck',
    title: 'KYC Verification',
    shortDescription: 'Identity verified through industry-standard KYC protocols.',
    expandedDescription:
      'Our Know Your Customer process uses document verification and biometric checks to confirm identities, preventing fraud and ensuring regulatory compliance.',
  },
  {
    icon: 'Fingerprint',
    title: 'Identity Protection',
    shortDescription: 'Advanced identity theft prevention mechanisms.',
    expandedDescription:
      'Multi-layered identity protection combines biometric data, behavioral analysis, and real-time monitoring to detect and prevent unauthorized access attempts.',
  },
  {
    icon: 'KeyRound',
    title: 'Secure Authentication',
    shortDescription: 'Multi-factor authentication for every login.',
    expandedDescription:
      'Two-factor authentication with support for authenticator apps, SMS codes, and hardware keys ensures only you can access your account.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Fraud Detection',
    shortDescription: 'AI-powered fraud detection monitors all transactions.',
    expandedDescription:
      'Machine learning algorithms analyze transaction patterns in real-time, flagging suspicious activity and blocking fraudulent attempts before they succeed.',
  },
  {
    icon: 'Eye',
    title: 'Data Privacy',
    shortDescription: 'Your data is never shared without explicit consent.',
    expandedDescription:
      'We adhere to strict data privacy regulations including GDPR. Your personal information is never sold to third parties and is only used for loan processing.',
  },
  {
    icon: 'Scale',
    title: 'Regulatory Compliance',
    shortDescription: 'Fully compliant with financial regulations.',
    expandedDescription:
      'Loaniyo operates under full regulatory oversight, meeting all local and international lending standards to provide you with a safe and legal borrowing experience.',
  },
];

// ─── Steps (7 items) ──────────────────────────────────────────────────────────

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Create Account',
    description: 'Sign up with your email and create a secure password to get started on the platform.',
  },
  {
    number: 2,
    title: 'Verify Identity',
    description: 'Complete KYC verification by uploading your ID and a selfie for secure identity confirmation.',
  },
  {
    number: 3,
    title: 'Apply for Loan',
    description: 'Choose your loan amount, preferred rate, and repayment duration using our simple application form.',
  },
  {
    number: 4,
    title: 'Review',
    description: 'Our team reviews your application and documents, typically completing assessment within minutes.',
  },
  {
    number: 5,
    title: 'Approval',
    description: 'Receive instant notification of your loan approval status with clear terms and conditions.',
  },
  {
    number: 6,
    title: 'Receive Funds',
    description: 'Approved funds are deposited directly to your account, often within the same business day.',
  },
  {
    number: 7,
    title: 'Repay Easily',
    description: 'Make flexible repayments through multiple channels with automated reminders to stay on track.',
  },
];

// ─── Testimonials (4+ entries) ─────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    occupation: 'Small Business Owner',
    avatar: '/avatars/sarah.jpg',
    rating: 5,
    text: 'Loaniyo made getting a business loan incredibly simple. I had funds in my account within 24 hours of applying. The whole process felt seamless.',
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    occupation: 'Software Engineer',
    avatar: '/avatars/michael.jpg',
    rating: 5,
    text: 'The loan calculator helped me plan my finances perfectly. I knew exactly what my monthly payments would be before I even applied. Highly recommend.',
  },
  {
    id: 'testimonial-3',
    name: 'Amara Okafor',
    occupation: 'Freelance Designer',
    avatar: '/avatars/amara.jpg',
    rating: 4,
    text: 'As a freelancer, getting approved for loans has always been tough. Loaniyo looked at the full picture and approved me quickly. Great experience overall.',
  },
  {
    id: 'testimonial-4',
    name: 'David Martinez',
    occupation: 'Restaurant Manager',
    avatar: '/avatars/david.jpg',
    rating: 5,
    text: 'The security features give me peace of mind. Bank-grade encryption and instant notifications mean I always know my account is safe. Best lending platform.',
  },
  {
    id: 'testimonial-5',
    name: 'Lisa Thompson',
    occupation: 'Marketing Director',
    avatar: '/avatars/lisa.jpg',
    rating: 4,
    text: 'I love the repayment tracking dashboard. It keeps me organized and motivated to pay off my loan ahead of schedule. The interface is clean and intuitive.',
  },
];

// ─── FAQ Items (5+ entries) ────────────────────────────────────────────────────

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Who can apply for a loan?',
    answer:
      'Anyone aged 18 or older with a valid government-issued ID can apply. We accept applications from employed individuals, freelancers, and business owners. Our assessment considers multiple factors beyond traditional credit scores.',
  },
  {
    question: 'How long does approval take?',
    answer:
      'Most loan applications are reviewed and approved within 5 minutes. In some cases requiring additional verification, the process may take up to 24 hours. You will receive real-time notifications on your application status.',
  },
  {
    question: 'What documents are required?',
    answer:
      'You will need a valid government-issued ID (passport or national ID), proof of income (pay stubs or bank statements from the last 3 months), and proof of address. All documents can be uploaded securely through the platform.',
  },
  {
    question: 'Are there hidden fees?',
    answer:
      'No. Loaniyo is fully transparent about all fees. The interest rate and any applicable processing fees are clearly displayed before you accept a loan offer. There are no prepayment penalties or hidden charges.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'Your data is protected with AES-256 bank-grade encryption, both in transit and at rest. We use multi-factor authentication, regular security audits, and comply with international data protection regulations including GDPR.',
  },
  {
    question: 'Can I repay my loan early?',
    answer:
      'Yes, you can repay your loan early at any time without penalties. Early repayment reduces the total interest you pay. Use the loan calculator to see how different repayment schedules affect your total cost.',
  },
  {
    question: 'What loan amounts are available?',
    answer:
      'Loan amounts range from $1,000 to $100,000 depending on your profile and creditworthiness. Interest rates start at 1% and loan durations range from 6 to 60 months, giving you flexible repayment options.',
  },
];

// ─── Trusted Logos (6+ entries) ────────────────────────────────────────────────

export const TRUSTED_LOGOS: TrustedLogo[] = [
  { name: 'TechVault', alt: 'TechVault logo' },
  { name: 'FinanceCore', alt: 'FinanceCore logo' },
  { name: 'SwiftPay', alt: 'SwiftPay logo' },
  { name: 'DataShield', alt: 'DataShield logo' },
  { name: 'CloudBank', alt: 'CloudBank logo' },
  { name: 'NexaGroup', alt: 'NexaGroup logo' },
  { name: 'PrimeLend', alt: 'PrimeLend logo' },
  { name: 'VertexAI', alt: 'VertexAI logo' },
];
