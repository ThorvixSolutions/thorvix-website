import { createContext, ReactNode } from 'react';

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    logoUrl: string;
  };
  nav: {
    links: { label: string; href: string }[];
    ctaLabel: string;
  };
  hero: {
    tag: string;
    headline: { line1: string; accent: string; line2: string };
    sub: string;
    primaryCta: string;
    ghostCta: string;
    stats: { value: string; suffix: string; label: string }[];
  };
  trusted: {
    label: string;
    logos: { name: string; tag: string; imageUrl: string }[];
  };
  services: {
    label: string;
    headingLines: string[];
    outlineIndex: number;
    intro: string;
    cards: { num: string; title: string; desc: string; featured?: boolean }[];
  };
  marqueeItems: string[];
  why: {
    label: string;
    headingLines: string[];
    outlineIndex: number;
    quoteParts: { text: string; bold?: boolean }[];
    items: { num: string; title: string; body: string }[];
  };
  tickerItems: string[];
  process: {
    label: string;
    headingLines: string[];
    outlineIndex: number;
    steps: { num: string; title: string; body: string }[];
  };
  solutions: {
    tabs: { id: string; num: string; title: string }[];
    panels: {
      id: string;
      tag: string;
      heading: string;
      body: string;
      mockupLines: { speaker: string; text: string; highlight?: boolean; dim?: boolean }[];
    }[];
  };
  team: {
    label: string;
    headingLines: string[];
    outlineIndex: number;
    intro: string;
    members: { num: string; name: string; role: string; focus: string; imageUrl: string }[];
    ctaLabel: string;
  };
  cases: {
    label: string;
    headingLines: string[];
    outlineIndex: number;
    cards: { industry: string; metric: string; metricLabel: string; quote: string }[];
  };
  testimonials: {
    label: string;
    headingText: string;
    headingHighlight: string;
    slides: { quote: string; attribution: string; location: string }[];
  };
  cta: {
    headingLines: string[];
    accentLine: string;
    sub: string;
    buttonLabel: string;
    note: string;
    bgText: string;
  };
  footer: {
    brandTagline: string;
    columns: {
      title?: string;
      links?: { label: string; href: string }[];
      contact?: { email: string; phone: string; location: string };
    }[];
    copyright: string;
    policyLinks: { label: string; href: string }[];
  };
  modal: {
    title: string;
    subtitle: string;
    fields: {
      id: string;
      label: string;
      type: 'text' | 'email' | 'select' | 'textarea';
      placeholder: string;
      required?: boolean;
      options?: string[];
    }[];
    submitLabel: string;
    cancelLabel: string;
  };
}

const content: SiteContent = {
  brand: {
    name: 'THORVIX',
    tagline: 'The Stormbreaker to Your Problems. AI-powered engineering, deployed fast.',
    logoUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781074836/npeutyqsni4o2klszkea.png',
  },

  nav: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Team', href: '#team' },
      { label: 'About', href: '#about' },
    ],
    ctaLabel: 'Book a Consultation',
  },

  hero: {
    tag: 'AI \u00b7 Engineering \u00b7 Automation',
    headline: { line1: 'Break', accent: 'Every', line2: 'Bottleneck.' },
    sub: 'We deploy custom AI agents, dedicated engineering teams, and intelligent automation\u2014so you scale without the hiring overhead or the headache.',
    primaryCta: 'Book a Strategy Call',
    ghostCta: 'View Services \u2193',
    stats: [
      { value: '3', suffix: '\u00d7', label: 'Faster Shipping' },
      { value: '60', suffix: '%', label: 'Cost Reduction' },
      { value: '48', suffix: 'h', label: 'Team Deploy' },
    ],
  },

  trusted: {
    label: 'Trusted by Enterprise Leaders',
    logos: [
      { name: 'Ren Solutions', tag: 'DISTRUBUTOR', imageUrl: 'https://res.cloudinary.com/dlktkucvl/image/upload/v1782842257/ren-solutions-logo-3_ngqsuj.png' },
      { name: 'GAJET', tag: 'E-COMMERCE', imageUrl: 'https://res.cloudinary.com/dlktkucvl/image/upload/v1782843644/4-gajet-logo-png_bkwk9y.png' },
      // { name: 'TP LINK PAKISTAN', tag: 'DISTRIBUTION', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781529314/byr8enhewovhfdtlhcbz.avif' },
      // { name: 'ECOFLOW', tag: 'DISTRIBUTION', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781529314/byr8enhewovhfdtlhcbz.avif' },
      // { name: 'BLACK ', tag: 'DISTRIBUTION', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781529314/byr8enhewovhfdtlhcbz.avif' },
      // { name: 'HAVIT', tag: 'DISTRIBUTION', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781529314/byr8enhewovhfdtlhcbz.avif' },
    ],
  },

  services: {
    label: 'What We Do',
    headingLines: ['Capabilities', 'Engineered', 'For Scale'],
    outlineIndex: 2,
    intro: 'Six high-impact verticals. One ruthlessly focused team. We don\u2019t consult\u2014we execute, embed, and deliver production-grade outcomes.',
    cards: [
      { num: '01 / AI AUTOMATION', title: 'AI Automation', desc: 'Replace repetitive workflows with intelligent systems that learn, adapt, and execute at machine speed. Reduction in ops costs, guaranteed.' },
      { num: '02 / FLAGSHIP', title: 'AI Agents & Chatbots', desc: 'Context-aware LLM-powered agents that handle support, qualify leads, and operate 24/7 with your brand\u2019s exact voice.', featured: true },
      { num: '03 / ENGINEERING', title: 'Dedicated Dev Teams', desc: 'Senior full-stack engineers and AI architects embedded directly into your workflow\u2014no recruitment, no HR overhead.' },
      { num: '04 / FLEX', title: 'Staff Augmentation', desc: 'Scale engineering capacity on demand. Ramp up for a sprint, ramp down after launch. Pure flexibility, zero commitment bloat.' },
      { num: '05 / BUILD', title: 'Custom Software', desc: 'Robust, scalable architectures from database schema to deployed frontend. We own the full stack and the full outcome.' },
      { num: '06 / OPTIMIZE', title: 'Process Optimization', desc: 'Data-driven bottleneck mapping and elimination. We don\u2019t fix symptoms\u2014we redesign the system that causes them.' },
    ],
  },

  marqueeItems: ['AI Automation', 'Dedicated Teams', 'AI Agents', 'Custom Software', 'Process Optimization', 'Staff Augmentation'],

  why: {
    label: 'The Thorvix Edge',
    headingLines: ['Forged', 'for the', 'Future.'],
    outlineIndex: 2,
    quoteParts: [
      { text: 'Stop wasting months on ' },
      { text: 'recruitment', bold: true },
      { text: ' and ' },
      { text: 'onboarding.', bold: true },
      { text: '\nWe bring the expertise, the infra, and the execution.' },
    ],
    items: [
      { num: '01', title: 'Faster Deployment', body: 'From strategy session to production deployment in weeks\u2014not the quarters your in-house hiring would take. We move at startup speed with enterprise-grade reliability.' },
      { num: '02', title: 'Zero Hiring Overhead', body: 'Bypass recruiters, HR processes, payroll taxes, and benefit packages. Get senior-level engineers who hit the ground running on day one\u2014billed simply, transparently.' },
      { num: '03', title: 'Senior Talent, Immediately', body: 'No juniors padded into engagements. Every Thorvix team member is mid-to-senior level with documented production experience in AI, full-stack, and cloud infrastructure.' },
      { num: '04', title: 'Elastic Team Scaling', body: 'Need 2 engineers for a sprint and 8 for a launch? We scale seamlessly. Contract adjusts monthly\u2014your engineering capacity matches your business reality.' },
      { num: '05', title: 'AI-First from Day One', body: 'Every engagement is designed with AI augmentation in mind. We don\u2019t bolt AI on at the end\u2014it\u2019s architecturally native from the first sprint.' },
    ],
  },

  tickerItems: ['NovaGrid ENTERPRISE', 'Enterprise AI', 'Dedicated Teams', 'RAG Agents', 'Full-Stack Dev', 'Process Ops', 'Staff Augmentation', 'LLM Engineering', 'AI Chatbots', 'Data Pipelines'],

  process: {
    label: 'The Process',
    headingLines: ['Bottleneck', 'to Breakthrough'],
    outlineIndex: 1,
    steps: [
      { num: '01', title: 'Discovery & Strategy', body: 'We map every bottleneck and architect a custom technical roadmap. We analyze your operations, identify automation opportunities, and scope exact resources needed.' },
      { num: '02', title: 'Deploy Team or Solution', body: 'Whether deploying a RAG-based AI agent or embedding a React/Node team into your Slack, we integrate into your existing systems with zero operational disruption.' },
      { num: '03', title: 'Scale & Optimize', body: 'We don\u2019t just hand over code. We monitor AI performance, maintain system health, and scale the solution continuously as your traffic and demands evolve.' },
    ],
  },

  solutions: {
    tabs: [
      { id: 'support', num: '01 \u2014 LIVE', title: 'Customer Support' },
      { id: 'leads', num: '02 \u2014 ACTIVE', title: 'Lead Generation' },
      { id: 'internal', num: '03 \u2014 INTERNAL', title: 'Internal Assistants' },
      { id: 'workflow', num: '04 \u2014 INFRA', title: 'Workflow Automation' },
      { id: 'data', num: '05 \u2014 ANALYTICS', title: 'Data Analysis' },
    ],
    panels: [
      {
        id: 'support', tag: 'Customer Support AI', heading: '24/7 Autonomous Resolution',
        body: 'Context-aware agents that resolve Tier-1 and Tier-2 tickets independently\u2014with your exact brand voice, product knowledge, and escalation logic built in.',
        mockupLines: [
          { speaker: 'USER', text: 'My order hasn\u2019t arrived in 12 days.' },
          { speaker: '', text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', dim: true },
          { speaker: 'AGENT', text: 'Checking order #TH-88421...' },
          { speaker: 'AGENT', text: 'Found: delayed at customs. ETA Jun 14.', highlight: true },
          { speaker: 'AGENT', text: 'Issuing $15 credit to your account.' },
          { speaker: '', text: '\u2192 Ticket resolved. CSAT: \u2605\u2605\u2605\u2605\u2605   [0 humans involved]', dim: true },
        ],
      },
      {
        id: 'leads', tag: 'Lead Generation AI', heading: 'Qualify. Route. Convert.',
        body: 'Intelligent agents that engage visitors, qualify intent, score leads against your ICP, and route hot prospects directly to your sales team with full context.',
        mockupLines: [
          { speaker: 'VISITOR', text: 'Looking for enterprise pricing.' },
          { speaker: '', text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', dim: true },
          { speaker: 'AGENT', text: 'Team size and primary use case?' },
          { speaker: 'VISITOR', text: '200 seats, B2B SaaS automation.' },
          { speaker: 'AGENT', text: 'ICP MATCH: HIGH \u2192 Routing to AE...', highlight: true },
          { speaker: '', text: '\u2192 Meeting booked. Pipeline value: $48,000/yr', dim: true, highlight: true },
        ],
      },
      {
        id: 'internal', tag: 'Internal AI Assistants', heading: 'Your Team\u2019s Private Brain',
        body: 'Secure, private knowledge bases that give your team instant answers from internal docs, SOPs, CRM data, and codebases\u2014without ever leaving your infrastructure.',
        mockupLines: [
          { speaker: 'TEAM', text: 'What\u2019s our refund policy for SaaS plans?' },
          { speaker: '', text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', dim: true },
          { speaker: 'ASSIST', text: 'From Policy Doc v3.2 (Apr 2026):' },
          { speaker: 'ASSIST', text: 'Pro: 14-day full refund. Enterprise: custom.' },
          { speaker: 'ASSIST', text: 'See \u00a74.1 for exceptions. [Source linked]', highlight: true },
          { speaker: '', text: '\u2192 Grounded. Private. Zero hallucination risk.', dim: true },
        ],
      },
      {
        id: 'workflow', tag: 'Workflow Automation', heading: 'Connect Everything.',
        body: 'We wire your CRMs, databases, Slack, email, and APIs into unified automated pipelines\u2014eliminating the manual handoffs that silently drain your team\u2019s capacity.',
        mockupLines: [
          { speaker: 'TRIGGER', text: 'New deal closed in HubSpot.' },
          { speaker: '', text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', dim: true },
          { speaker: 'AUTO', text: '\u2192 Slack: #sales-wins notified' },
          { speaker: 'AUTO', text: '\u2192 Jira: onboarding epic created' },
          { speaker: 'AUTO', text: '\u2192 Email: welcome sequence started' },
          { speaker: '', text: '\u2192 3 tools synced. 0 human actions.', dim: true, highlight: true },
        ],
      },
      {
        id: 'data', tag: 'Data Analysis AI', heading: 'Instant Insight. Any Dataset.',
        body: 'Natural language queries against your databases, dashboards, and CSVs. Ask business questions, get precise answers. No SQL required. No analyst bottleneck.',
        mockupLines: [
          { speaker: 'QUERY', text: 'Which product had highest churn Q1?' },
          { speaker: '', text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500', dim: true },
          { speaker: 'RESULT', text: 'Plan B: 34% churn (\u219112% vs Q4 2025)', highlight: true },
          { speaker: 'RESULT', text: 'Primary driver: onboarding drop-off Day 3.' },
          { speaker: 'SUGGEST', text: 'A/B test: email + in-app at Day 2?' },
          { speaker: '', text: '\u2192 Analyzed 1.2M rows in 1.4 seconds.', dim: true, highlight: true },
        ],
      },
    ],
  },

  team: {
    label: 'Our Team',
    headingLines: ['Minds Behind', 'the Machines.'],
    outlineIndex: 1,
    intro: 'A dedicated core of specialists building the future of enterprise intelligence. No layers, no account managers\u2014you work directly with the people who build.',
    members: [
      { num: '01 / AI', name: 'Syed Ahmed Iqbal', role: 'CTO', focus: 'Technical strategy, AI architecture, and scalable full-stack solutions.', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781074799/kxqqacil2p5keayxni8o.jpg' },
      { num: '02 / Management', name: 'Shoaib Ahmed Sheikh', role: 'CEO', focus: 'Business strategy and operations.', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781081695/s1iiek9euw41pqqv0ieu.jpg' },
      { num: '03 / UX', name: 'Mujtaba Asif', role: 'UI & UX Expert', focus: 'Premium SaaS interfaces and human-computer interaction design.', imageUrl: 'https://res.cloudinary.com/dwnllmjtv/image/upload/v1781074814/tjsl6ubpkvm4w74id4mg.jpg' },
      { num: '04 / Development', name: 'Alisha Kanwal', role: 'AI Engineer \u00b7 Full-Stack', focus: 'Scalable agentic architecture and workflows.', imageUrl: 'https://res.cloudinary.com/dlktkucvl/image/upload/v1781711773/IMG-20260612-WA0033_rint7j.jpg' },
    ],
    ctaLabel: 'Meet Our Extended Engineering Team \u2192',
  },

  cases: {
    label: 'Proven Impact',
    headingLines: ['Numbers', "Don't", 'Lie.'],
    outlineIndex: 1,
    cards: [
      { industry: 'Real Estate \u00b7 Lead Ops', metric: '+40%', metricLabel: 'Lead Conversion Rate', quote: '"Thorvix automated our property descriptions and follow-up sequences. The AI handles 80% of our inbound without us touching it."' },
      { industry: 'E-commerce \u00b7 Customer Support', metric: '-60%', metricLabel: 'Ticket Resolution Time', quote: '"Their custom AI agent handles our entire Tier-1 support volume. CSAT went up, team headcount stayed the same."' },
      { industry: 'SaaS \u00b7 Engineering', metric: '3\u00d7', metricLabel: 'Faster Feature Shipping', quote: '"The dedicated React/Node team integrated perfectly within 48 hours. They shipped features our in-house team had queued for months."' },
    ],
  },

  testimonials: {
    label: 'Client Voices',
    headingText: 'What Our',
    headingHighlight: 'Clients Say.',
    slides: [
      { quote: 'Thorvix didn\u2019t just write code\u2014they <strong>understood our business logic</strong> and built around it. The AI integration was seamless, the team was senior, and the results were immediate.', attribution: 'Marketing Head, Ren Solutions', location: 'Lahore, Pakistan' },
      { quote: 'The team moved fast, communicated clearly, and shipped exactly what we needed. We saw <strong>value from the first week.</strong>', attribution: 'Operations Lead, NovaCore', location: 'Dubai, UAE' },
      { quote: 'They made a complicated process feel simple. The <strong>product quality and follow-through</strong> were both excellent.', attribution: 'Founder, Apex Studio', location: 'London, UK' },
      { quote: 'Outstanding execution across the board. Their AI agents <strong>increased our support capacity by 3\u00d7</strong> without adding headcount.', attribution: 'VP Customer Success, TechFlow', location: 'San Francisco, USA' },
      { quote: 'We needed a dedicated team fast, and they delivered <strong>production-ready engineers in 48 hours.</strong> Game changer for us.', attribution: 'CTO, InnovateLabs', location: 'Toronto, Canada' },
      { quote: 'The process automation they built saved us <strong>20+ hours per week</strong> in manual data entry. ROI was immediate.', attribution: 'Head of Operations, DataCore', location: 'Berlin, Germany' },
    ],
  },

  cta: {
    headingLines: ['Ready to', 'Break Through?'],
    accentLine: 'Break Through?',
    sub: 'Stop letting technical debt and hiring delays stall your growth. One call. A custom roadmap. Results in weeks.',
    buttonLabel: 'Schedule a Free Strategy Call \u2192',
    note: 'No commitment. 30 min. We come prepared.',
    bgText: 'STORM',
  },

  footer: {
    brandTagline: 'The Stormbreaker to Your Problems. AI-powered engineering, deployed fast.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'AI Agents', href: '#solutions' },
          { label: 'Staff Augmentation', href: '#' },
          { label: 'Custom Software', href: '#' },
          { label: 'Process Automation', href: '#' },
          { label: 'AI Automation', href: '#' },
        ],
      },
      {
        title: 'Contact',
        contact: { email: 'thorvix3@gmail.com', phone: '+92 3284477845', location: 'Lahore, PK / Global Remote' },
      },
    ],
    copyright: '\u00a9 2026 THORVIX \u00b7 ALL RIGHTS RESERVED',
    policyLinks: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },

  modal: {
    title: 'Schedule Your Strategy Call',
    subtitle: "Let's discuss how we can break your bottlenecks. No commitment, 30 minutes, fully prepared.",
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true },
      { id: 'company', label: 'Company', type: 'text', placeholder: 'Your company', required: true },
      { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', required: true },
      { id: 'interest', label: 'Primary Interest', type: 'select', placeholder: 'Select an option', required: true, options: ['AI Agents & Chatbots', 'AI Automation', 'Dedicated Dev Teams', 'Staff Augmentation', 'Custom Software', 'Process Optimization'] },
      { id: 'message', label: 'Message (Optional)', type: 'textarea', placeholder: 'Tell us about your challenge...' },
    ],
    submitLabel: 'Book Call',
    cancelLabel: 'Cancel',
  },
};

export const SiteContentContext = createContext<SiteContent>(content);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
