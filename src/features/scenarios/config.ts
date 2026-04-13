import type { DashboardMetric, DashboardTask, MarketplaceJob, OnboardingFormValues, ScenarioDefinition, ScenarioType, StructuredOutput } from '../../types'

export const scenarioDefinitions: ScenarioDefinition[] = [
  {
    id: 'home-repairs',
    title: 'Repairs and renovation help',
    segment: 'Home maintenance',
    summary: 'Describe the issue, urgency, and budget. The system turns it into a tradie-ready scope, message draft, and next-step plan.',
    mode: 'hybrid',
    confidenceThreshold: 0.75,
    fields: [
      { key: 'issue', label: 'What needs fixing or renovating?', type: 'textarea', required: true, placeholder: 'Leaking shower, cracked tiles, repainting a bedroom...' },
      { key: 'propertyType', label: 'Property type', type: 'select', options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'townhouse', label: 'Townhouse' },
      ] },
      { key: 'suburb', label: 'Suburb', type: 'text', placeholder: 'Parramatta' },
      { key: 'urgency', label: 'Urgency', type: 'select', options: [
        { value: 'today', label: 'Needs action today' },
        { value: 'week', label: 'This week' },
        { value: 'flexible', label: 'Flexible timing' },
      ] },
      { key: 'budget', label: 'Budget range', type: 'text', placeholder: '$500 - $2,000' },
      { key: 'photos', label: 'Photo notes', type: 'textarea', placeholder: 'What the photos show, damage size, materials involved...' },
    ],
  },
  {
    id: 'rental-support',
    title: 'Rental issues and landlord communication',
    segment: 'Renting and leasing',
    summary: 'Handle repair requests, inspection notes, listing prep, and landlord-tenant communication with clear structured outputs.',
    mode: 'ai_instant',
    confidenceThreshold: 0.82,
    fields: [
      { key: 'role', label: 'Who are you?', type: 'select', options: [
        { value: 'tenant', label: 'Tenant' },
        { value: 'landlord', label: 'Landlord' },
        { value: 'property-manager', label: 'Property manager' },
      ] },
      { key: 'issueType', label: 'Issue type', type: 'select', options: [
        { value: 'repair', label: 'Repair / maintenance' },
        { value: 'inspection', label: 'Inspection notes' },
        { value: 'listing', label: 'Rental listing prep' },
        { value: 'bond', label: 'Bond / dispute support' },
      ] },
      { key: 'propertyAddress', label: 'Property address or suburb', type: 'text', placeholder: 'Chatswood NSW' },
      { key: 'details', label: 'What happened?', type: 'textarea', required: true, placeholder: 'The heater stopped working, mould is spreading, need a tenant update...' },
      { key: 'impact', label: 'How urgent is it for living conditions?', type: 'text', placeholder: 'Unsafe, annoying, manageable for now...' },
      { key: 'targetOutcome', label: 'What outcome do you want?', type: 'text', placeholder: 'Get repair approved, draft inspection summary, prepare listing copy...' },
    ],
  },
  {
    id: 'home-care',
    title: 'In-home care and family support',
    segment: 'Care coordination',
    summary: 'Organise home-care updates, support schedules, and family communication without losing context.',
    mode: 'hybrid',
    confidenceThreshold: 0.78,
    fields: [
      { key: 'personName', label: 'Who needs support?', type: 'text', required: true, placeholder: 'Mum, Grandpa Lee...' },
      { key: 'supportType', label: 'Support needed', type: 'select', options: [
        { value: 'daily-checkin', label: 'Daily check-in' },
        { value: 'personal-care', label: 'Personal care' },
        { value: 'medication', label: 'Medication support' },
        { value: 'meal-and-home-help', label: 'Meals and home help' },
      ] },
      { key: 'schedule', label: 'Needed frequency', type: 'text', placeholder: 'Every weekday morning' },
      { key: 'notes', label: 'Care notes or concerns', type: 'textarea', placeholder: 'Mobility concerns, appetite changes, fall risk...' },
      { key: 'familyUpdates', label: 'Need family updates?', type: 'select', options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ] },
      { key: 'location', label: 'Suburb', type: 'text', placeholder: 'Ashfield' },
    ],
  },
  {
    id: 'moving-help',
    title: 'Moving, cleaning, and settling in',
    segment: 'Home logistics',
    summary: 'Coordinate cleaning, removals, utility setup, and first-week home tasks in one AI-guided flow.',
    mode: 'hybrid',
    confidenceThreshold: 0.74,
    fields: [
      { key: 'moveStage', label: 'What stage are you in?', type: 'select', options: [
        { value: 'pre-move', label: 'Preparing to move' },
        { value: 'move-day', label: 'Move day' },
        { value: 'post-move', label: 'Just moved in' },
      ] },
      { key: 'helpNeeded', label: 'What do you need help with?', type: 'textarea', required: true, placeholder: 'End-of-lease clean, furniture assembly, redirect mail, unpacking...' },
      { key: 'fromTo', label: 'From / to suburb', type: 'text', placeholder: 'Burwood to Ryde' },
      { key: 'deadline', label: 'Deadline', type: 'text', placeholder: 'This Friday before 4pm' },
      { key: 'budget', label: 'Budget range', type: 'text', placeholder: '$300 - $900' },
      { key: 'specialItems', label: 'Special items or constraints', type: 'textarea', placeholder: 'No lift access, elderly parent, fragile TV, pet at home...' },
    ],
  },
]

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Tasks this week', value: '18', detail: 'Repairs, rental admin, care updates, and moving help' },
  { label: 'AI handled fully', value: '61%', detail: 'Resolved with AI drafts, summaries, or scope generation' },
  { label: 'Escalated to humans', value: '7', detail: 'Tradies, cleaners, carers, and rental specialists' },
]

export const dashboardTasks: DashboardTask[] = [
  { id: 'task_001', title: 'Bathroom leak scope for two plumbers', status: 'posted_to_marketplace', owner: 'Resident', updatedAt: '12 min ago' },
  { id: 'task_002', title: 'Landlord repair request draft for mould issue', status: 'ai_completed', owner: 'Tenant', updatedAt: '28 min ago' },
  { id: 'task_003', title: 'Weekly family care update for Mum', status: 'running_ai', owner: 'Family carer', updatedAt: 'Just now' },
]

export const marketplaceJobs: MarketplaceJob[] = [
  { id: 'job_001', linkedTaskId: 'task_001', title: 'Licensed plumber for bathroom leak inspection', budget: '$180 - $350', eta: '2 replies in 30 min', category: 'Repairs', location: 'Parramatta', status: 'posted_to_marketplace', bids: 2, reason: 'On-site inspection needed' },
  { id: 'job_002', linkedTaskId: 'task_004', title: 'End-of-lease cleaner for 2-bed apartment', budget: '$250 - $420', eta: '4 cleaners available', category: 'Cleaning', location: 'Mascot', status: 'open', bids: 4, reason: 'Physical completion required' },
  { id: 'job_003', linkedTaskId: 'task_005', title: 'Home-care support worker for weekday mornings', budget: '$55/hr', eta: 'Screening in progress', category: 'Care support', location: 'Ashfield', status: 'assigned', bids: 1, reason: 'Ongoing human care required' },
]

export const onboardingGoals = [
  'Handle home repairs faster',
  'Stay on top of rental admin',
  'Coordinate family care updates',
  'Organise moving and cleaning tasks',
]

export const defaultOnboardingValues: OnboardingFormValues = {
  role: 'resident',
  industry: 'house',
  businessSize: 'family',
  goals: ['Handle home repairs faster', 'Stay on top of rental admin'],
}

export function getScenarioDefinition(id: ScenarioType) {
  return scenarioDefinitions.find((scenario) => scenario.id === id) ?? scenarioDefinitions[0]
}

export function createInitialFormValues(id: ScenarioType) {
  return getScenarioDefinition(id).fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = field.options?.[0]?.value ?? ''
    return acc
  }, {})
}

export function buildMockStructuredOutput(scenarioId: ScenarioType): StructuredOutput {
  if (scenarioId === 'home-repairs') {
    return {
      headline: 'Repair brief ready for a tradie or landlord',
      summary: 'The system turned the issue into a clear scope, urgency note, and quote request so you do not have to explain the same thing three times.',
      deliverables: ['Repair scope', 'Tradie message draft', 'Urgency checklist'],
      nextSteps: ['Send to two providers', 'Compare quotes', 'Book site visit if needed'],
    }
  }

  if (scenarioId === 'rental-support') {
    return {
      headline: 'Rental communication package prepared',
      summary: 'Your issue summary, evidence checklist, and landlord or tenant message are ready to send.',
      deliverables: ['Structured issue summary', 'Message draft', 'Documentation checklist'],
      nextSteps: ['Review wording', 'Attach photos', 'Send through email or property portal'],
    }
  }

  if (scenarioId === 'home-care') {
    return {
      headline: 'Care plan update and family summary prepared',
      summary: 'The system organised the support request, daily notes, and follow-up communication into a single handoff.',
      deliverables: ['Support summary', 'Family update message', 'Risk watchlist'],
      nextSteps: ['Confirm care schedule', 'Share with family', 'Escalate to provider if risk grows'],
    }
  }

  return {
    headline: 'Move coordination plan is ready',
    summary: 'Your moving, cleaning, and setup tasks are organised into a timeline with who-does-what next steps.',
    deliverables: ['Move-day checklist', 'Provider brief', 'Utility setup reminders'],
    nextSteps: ['Book cleaner or mover', 'Confirm access times', 'Track completion on dashboard'],
  }
}
