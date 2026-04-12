export type ScenarioType = 'home-repairs' | 'rental-support' | 'home-care' | 'moving-help'
export type TaskMode = 'ai_instant' | 'hybrid' | 'human'
export type TaskLifecycle =
  | 'draft'
  | 'running_ai'
  | 'ai_completed'
  | 'needs_human'
  | 'posted_to_marketplace'
  | 'assigned_to_human'
  | 'completed'
  | 'failed'

export type UserRole = 'resident' | 'tenant' | 'landlord' | 'family_carer'
export type Industry = 'apartment' | 'house' | 'rental_property' | 'supported_living' | 'other'
export type BusinessSize = 'just_me' | 'couple' | 'family' | 'multi_property'

export interface ScenarioFieldOption {
  value: string
  label: string
}

export interface ScenarioField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'select'
  placeholder?: string
  required?: boolean
  options?: ScenarioFieldOption[]
}

export interface ScenarioDefinition {
  id: ScenarioType
  title: string
  segment: string
  summary: string
  mode: TaskMode
  confidenceThreshold: number
  fields: ScenarioField[]
}

export interface StructuredOutput {
  headline: string
  summary: string
  deliverables: string[]
  nextSteps: string[]
}

export interface TaskResult {
  taskId: string
  title: string
  scenarioType: ScenarioType
  mode: TaskMode
  lifecycle: TaskLifecycle
  confidence: number
  qualityScore: number
  output: StructuredOutput
  routedAgents: string[]
  fallbackRecommended: boolean
}

export interface DashboardMetric {
  label: string
  value: string
  detail: string
}

export interface DashboardTask {
  id: string
  title: string
  status: TaskLifecycle
  owner: string
  updatedAt: string
}

export interface MarketplaceJob {
  id: string
  linkedTaskId?: string
  title: string
  budget: string
  eta?: string
  category?: string
  location?: string
  status: 'open' | 'assigned' | 'completed' | 'posted_to_marketplace' | 'assigned_to_human'
  bids?: number
  reason?: string
}

export interface OnboardingFormValues {
  role: UserRole
  industry: Industry
  businessSize: BusinessSize
  goals: string[]
}

export interface ApiTask {
  id: string
  title: string
  description: string
  scenario_type: ScenarioType
  input_data: Record<string, string>
  status: TaskLifecycle
  ai_confidence_score: number | null
  requires_human: boolean
  created_by?: string
  output_data?: unknown
}

export interface ApiExecution {
  id: string
  task_id: string
  execution_mode: 'agent' | 'human' | 'hybrid'
  output?: unknown
  quality_score?: number
  confidence_score?: number
  status?: string
}

export interface CreateTaskPayload {
  title: string
  description: string
  scenario_type: ScenarioType
  input_data: Record<string, string>
  created_by?: string
}
