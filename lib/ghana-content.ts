export const growthCycle = [
  { id: 'research', label: 'Research', title: 'Understand the enterprise in context.', copy: 'Interviews, field observation, financial and operational evidence, market data, and stakeholder perspectives are selected to fit the engagement.' },
  { id: 'diagnose', label: 'Diagnose', title: 'Find the constraint behind the symptom.', copy: 'Providence tests competing explanations before defining the problem. Slow growth may reflect demand, pricing, capacity, finance, systems, people, or market fit.' },
  { id: 'baseline', label: 'Baseline', title: 'Establish the starting point.', copy: 'Company-specific baselines create an honest reference for financial health, operations, market readiness, management capability, digital maturity, and governance.' },
  { id: 'co-design', label: 'Co-design', title: 'Build with the people who will implement.', copy: 'Management and employee knowledge is combined with research, analysis, market evidence, and external perspective to create a practical growth roadmap.' },
  { id: 'experiment', label: 'Experiment', title: 'Test, learn, and refine.', copy: 'Where appropriate, controlled pilots reduce risk before major investment: customer discovery, a limited launch, measurement, refinement, and then scale.' },
  { id: 'implement', label: 'Implement', title: 'Turn strategy into accountable action.', copy: 'Initiatives are structured around owners, objectives, indicators, timelines, resources, milestones, dependencies, risks, and expected outcomes.' },
  { id: 'measure', label: 'Measure', title: 'Evaluate continuously.', copy: 'Periodic reviews examine what changed, what did not, why assumptions held or failed, and what should be adapted or scaled.' },
  { id: 'scale', label: 'Scale & transfer', title: 'Build capability beyond the engagement.', copy: 'Knowledge, systems, and decision-making capability are transferred into the organization so progress does not depend permanently on Providence.' },
] as const;

export const servicePillars = [
  { number: '01', title: 'Strategy & Growth', copy: 'Enterprise diagnostics, strategic planning, business-model development, growth strategy, organizational strategy, and expansion planning.' },
  { number: '02', title: 'Financial & Investment Readiness', copy: 'Financial planning, budgeting, controls, cash-flow analysis, reporting improvement, funding strategy, and readiness for investor conversations.' },
  { number: '03', title: 'Operations & Organizational Development', copy: 'Operating-model design, process improvement, organizational structures, workforce planning, performance management, procurement, and operating efficiency.' },
  { number: '04', title: 'Market Access & Expansion', copy: 'Market research, customer discovery, go-to-market strategy, export readiness, regional expansion, partnerships, and distribution strategy.' },
  { number: '05', title: 'Digital Transformation', copy: 'Technology assessment, digital strategy, workflow digitization, data systems, CRM or ERP adoption support, connectivity, and productivity technology.' },
  { number: '06', title: 'SME & Enterprise Development', copy: 'Business diagnostics, management capacity building, advisory, training, growth planning, implementation, monitoring, and enterprise-support programs.' },
] as const;

export const programStages = [
  'Program design', 'Enterprise sourcing / selection', 'Baseline assessment', 'Individual development plans', 'Training & capacity building', 'One-on-one advisory', 'Implementation support', 'Periodic monitoring', 'Impact evaluation', 'Institutional reporting', 'Knowledge transfer / scale',
] as const;

export const focusIndustries = [
  ['Agribusiness', 'Value chains, producer enterprises, processing, distribution, market access, and operational growth.'],
  ['Manufacturing', 'Capacity, productivity, quality systems, finance, workforce, procurement, and route-to-market questions.'],
  ['Telecommunications & Technology', 'Digital adoption, connectivity, technology-enabled services, commercialization, and operating systems.'],
  ['Healthcare', 'Enterprise and institutional operating questions across care delivery and supporting services.'],
  ['Hospitality & Tourism', 'Customer experience, operations, workforce, financial discipline, and market positioning.'],
  ['Logistics & Transportation', 'Network design, fleet and process performance, service reliability, technology, and regional trade.'],
  ['Retail & Consumer', 'Customer insight, merchandising, distribution, unit economics, digital channels, and expansion.'],
  ['Professional Services', 'Positioning, delivery systems, talent, knowledge management, sales, and scalable operations.'],
  ['Infrastructure', 'Enterprise participation, procurement readiness, delivery capability, partnerships, and local value creation.'],
] as const;

export const audiencePaths = [
  ['African businesses', 'Strengthen strategy, operations, finance, market access, technology, and organizational capability.'],
  ['Development organizations', 'Design and deliver evidence-led private-sector and enterprise-development initiatives.'],
  ['Funding & institutional partners', 'Build accountable programs around SME growth, jobs, investment readiness, and economic outcomes.'],
  ['Governments & public institutions', 'Structure enterprise-development initiatives with clear objectives, baselines, delivery, and learning.'],
  ['Investors & financial institutions', 'Improve the readiness and operating capacity of enterprises before and after capital.'],
  ['Research & strategic partners', 'Collaborate on market evidence, sector knowledge, field research, and technical delivery.'],
] as const;

export const policyPlaceholders = [
  'Code of Conduct', 'Anti-Bribery & Corruption', 'Conflict of Interest', 'Privacy & Data Protection', 'Whistleblowing / Reporting', 'Safeguarding', 'Procurement', 'Environmental & Social Responsibility',
] as const;
