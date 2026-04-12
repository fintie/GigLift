import type { DashboardMetric, DashboardTask, MarketplaceJob, OnboardingFormValues, ScenarioDefinition, ScenarioType, TaskResult } from '../../types'

export const scenarioDefinitions: ScenarioDefinition[] = [
  {
    id: 'property-listing',
    title: 'Property Listing Launch',
    segment: 'Real Estate',
    summary: 'Turn rough listing notes into polished copy, ad text, and campaign-ready assets.',
    mode: 'hybrid',
    confidenceThreshold: 0.74,
    fields: [
      { key: 'address', label: 'Property address', type: 'text', required: true, placeholder: '12 Beach Road, Bondi NSW' },
      { key: 'propertyType', label: 'Property type', type: 'select', required: true, options: [
        { value: 'apartment', label: 'Apartment' },
        { value: 'house', label: 'House' },
        { value: 'townhouse', label: 'Townhouse' },
      ] },
      { key: 'bedrooms', label: 'Bedrooms', type: 'number', required: true, placeholder: '2' },
      { key: 'highlights', label: 'Key highlights', type: 'textarea', required: true, placeholder: 'Ocean views, renovated kitchen, walk to beach' },
    ],
  },
  {
    id: 'google-review',
    title: 'Google Review Recovery',
    segment: 'Restaurant',
    summary: 'Draft a measured response, escalation notes, and a staff follow-up checklist.',
    mode: 'ai_instant',
    confidenceThreshold: 0.82,
    fields: [
      { key: 'businessName', label: 'Business name', type: 'text', required: true, placeholder: 'Harbour Brunch Co' },
      { key: 'reviewRating', label: 'Review rating', type: 'select', required: true, options: [
        { value: '1', label: '1 star' },
        { value: '2', label: '2 stars' },
        { value: '3', label: '3 stars' },
      ] },
      { key: 'reviewText', label: 'Review text', type: 'textarea', required: true, placeholder: 'Service was slow and coffee arrived cold...' },
    ],
  },
  {
    id: 'care-notes',
    title: 'Care Notes to Family Update',
    segment: 'Aged Care',
    summary: 'Convert shift notes into a family-friendly update with clear tone and action points.',
    mode: 'hybrid',
    confidenceThreshold: 0.76,
    fields: [
      { key: 'residentName', label: 'Resident name', type: 'text', required: true, placeholder: 'Margaret' },
      { key: 'shiftSummary', label: 'Shift notes', type: 'textarea', required: true, placeholder: 'Ate well, attended group activity, resting after lunch...' },
      { key: 'familyTone', label: 'Preferred tone', type: 'select', required: true, options: [
        { value: 'warm', label: 'Warm' },
        { value: 'formal', label: 'Formal' },
        { value: 'reassuring', label: 'Reassuring' },
      ] },
    ],
  },
  {
    id: 'trade-quote',
    title: 'Trade Quote Builder',
    segment: 'Trades',
    summary: 'Generate a quote draft, scope summary, and customer-ready follow-up message.',
    mode: 'hybrid',
    confidenceThreshold: 0.7,
    fields: [
      { key: 'jobType', label: 'Job type', type: 'text', required: true, placeholder: 'Hot water system replacement' },
      { key: 'siteLocation', label: 'Site location', type: 'text', required: true, placeholder: 'Parramatta NSW' },
      { key: 'scopeNotes', label: 'Scope notes', type: 'textarea', required: true, placeholder: 'Supply and install 250L system, remove old unit...' },
    ],
  },
]

export const defaultOnboardingValues: OnboardingFormValues = {
  role: 'business_owner',
  industry: 'real_estate',
  businessSize: '2_10',
  goals: ['automate admin'],
}

export const onboardingGoals = [
  'automate admin',
  'find workers',
  'outsource repetitive tasks',
  'deploy AI assistants',
  'manage requests/jobs',
]

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Active requests', value: '12', detail: '3 waiting on approval' },
  { label: 'AI automations', value: '28', detail: '7-day rolling total' },
  { label: 'Spend this month', value: '$3,480', detail: 'Including hybrid jobs' },
]

export const dashboardTasks: DashboardTask[] = [
  { id: 'task_101', title: 'Bondi listing campaign', status: 'running_ai', owner: 'Leasing team', updatedAt: '5 min ago' },
  { id: 'task_102', title: 'Family care update review', status: 'needs_human', owner: 'Facility ops', updatedAt: '18 min ago' },
  { id: 'task_103', title: 'Plumbing quote follow-up', status: 'completed', owner: 'Field admin', updatedAt: '1 hour ago' },
]

export const marketplaceJobs: MarketplaceJob[] = [
  { id: 'job_201', title: 'Human review for listing pack', budget: '$95', eta: '2 hours', category: 'Property Marketing', location: 'Sydney', status: 'open' },
  { id: 'job_202', title: 'After-hours family message QA', budget: '$65', eta: '90 mins', category: 'Care Communications', location: 'Melbourne', status: 'assigned' },
]

export function getScenarioDefinition(id: ScenarioType) {
  return scenarioDefinitions.find((scenario) => scenario.id === id) ?? scenarioDefinitions[0]
}

export function createInitialFormValues(id: ScenarioType) {
  const definition = getScenarioDefinition(id)
  return definition.fields.reduce<Record<string, string>>((acc, field) => {
    acc[field.key] = ''
    return acc
  }, {})
}

export function buildMockTaskResult(scenarioId: ScenarioType, values: Record<string, string>): TaskResult {
  const scenario = getScenarioDefinition(scenarioId)
  const taskId = `task_${Date.now()}`
  const confidence = scenarioId === 'google-review' ? 0.91 : scenarioId === 'trade-quote' ? 0.69 : 0.84
  const fallbackRecommended = confidence < scenario.confidenceThreshold

  return {
    taskId,
    title: scenario.title,
    scenarioType: scenarioId,
    mode: fallbackRecommended ? 'hybrid' : scenario.mode,
    lifecycle: fallbackRecommended ? 'needs_human' : 'ai_completed',
    confidence,
    qualityScore: fallbackRecommended ? 0.73 : 0.9,
    routedAgents: scenarioId === 'property-listing' ? ['listing-agent', 'ad-agent', 'email-agent'] : ['ops-agent', 'quality-agent'],
    fallbackRecommended,
    output: {
      headline: `${scenario.title} ready for review`,
      summary: `GigHub structured the brief for ${Object.values(values).filter(Boolean).slice(0, 2).join(' · ') || 'the submitted request'}.`,
      deliverables: [
        'Structured brief',
        'Recommended workflow',
        'Draft output pack',
      ],
      nextSteps: fallbackRecommended
        ? ['Send to human marketplace', 'Notify owner for approval', 'Track revised delivery']
        : ['Approve output', 'Send to customer', 'Reuse workflow template'],
    },
  }
}
