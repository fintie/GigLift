export type ScenarioType = 'home-repairs' | 'rental-support' | 'home-care' | 'moving-help'

export interface ScenarioDefinition {
  id: ScenarioType
  title: string
  summary: string
  segment: string
  outcomes: string[]
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'textarea' | 'select'
    placeholder?: string
    options?: string[]
  }>
}

export interface CreateTaskPayload {
  title: string
  description?: string
  scenario_type: ScenarioType
  input_data: Record<string, string>
  created_by?: string
  mode?: 'AI' | 'HUMAN'
}

export interface ApiTask {
  id: string
  title: string
  description?: string
  scenario_type: ScenarioType
  input_data: Record<string, string>
  created_by?: string
  mode: 'AI' | 'HUMAN'
  status: string
  ai_confidence_score?: number | null
  requires_human?: boolean
  created_at?: string
  updated_at?: string
}

export interface ApiExecution {
  task: ApiTask
  execution?: {
    id: string
    task_id: string
    execution_mode: string
    confidence_score?: number
    quality_score?: number
    status?: string
    agents_used?: string[]
    output?: Record<string, unknown>
    created_at?: string
  }
  route?: {
    agents: string[]
    threshold: number
  }
  output?: Record<string, unknown>
  quality?: number
  fallbackJob?: MarketplaceJob | null
}

export interface DashboardMetric {
  label: string
  value: string
  detail: string
}

export interface DashboardTask {
  id: string
  title: string
  status: string
  owner: string
  updatedAt: string
}

export interface MarketplaceJob {
  id: string
  linkedTaskId?: string
  linked_task_id?: string
  title: string
  category?: string
  segment?: string
  location?: string
  budget: string
  eta?: string
  status: string
  reason: string
  bids?: number
  bids_count?: number
  assigned_human_id?: string | null
  created_at?: string
}

export interface TaskResult {
  title: string
  scenarioLabel: string
  status: string
  summary: string
  outputs: Array<{ label: string; value: string }>
  nextActions: string[]
  confidenceLabel: string
  needsHuman: boolean
  humanFallbackReason?: string
}

export interface OnboardingFormValues {
  goal: string
  householdType: string
  suburb: string
  propertyType: string
  supportNeed: string
}

export interface PropertyTrendPoint {
  label: string
  value: string
  change: string
}

export interface PropertyNewsItem {
  title: string
  source: string
  summary: string
  tag: string
}

export interface PropertySuburbInsight {
  suburb: string
  medianHousePrice: string
  medianUnitPrice: string
  medianWeeklyRent: string
  rentalYield: string
  note: string
}

export interface PropertyIntelSnapshot {
  regionLabel: string
  lastUpdated: string
  marketPulse: PropertyTrendPoint[]
  suburbInsights: PropertySuburbInsight[]
  planningUpdates: string[]
  rateWatch: string[]
  news: PropertyNewsItem[]
  dataSources: string[]
}
