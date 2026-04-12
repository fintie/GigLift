import type { ApiTask, MarketplaceJob, TaskResult } from '../types'

function scenarioLabel(scenarioType: string) {
  switch (scenarioType) {
    case 'home-repairs':
      return 'Repairs and renovation help'
    case 'rental-support':
      return 'Rental issues and landlord communication'
    case 'home-care':
      return 'In-home care and family support'
    case 'moving-help':
      return 'Moving, cleaning, and settling in'
    default:
      return 'Resident support task'
  }
}

function titleFromTask(task: ApiTask) {
  return task.title || 'Resident task'
}

function summaryFromInput(task: ApiTask) {
  if (task.scenario_type === 'home-repairs') {
    return `AI prepared a repair plan for ${task.input_data.issue ?? 'the reported issue'} in ${task.input_data.suburb ?? 'Greater Sydney'}.`
  }

  if (task.scenario_type === 'rental-support') {
    return `AI structured the tenancy issue so it is ready to send with clearer facts, evidence, and next steps.`
  }

  if (task.scenario_type === 'home-care') {
    return `AI organised the home care support request into a cleaner handoff for family and providers.`
  }

  return `AI mapped the moving or cleaning request into a practical checklist and provider brief.`
}

function outputsFromTask(task: ApiTask) {
  const input = task.input_data ?? {}

  switch (task.scenario_type) {
    case 'home-repairs':
      return [
        { label: 'Issue', value: input.issue ?? 'General household issue' },
        { label: 'Location', value: input.suburb ?? 'Greater Sydney' },
        { label: 'Urgency', value: input.urgency ?? 'Standard priority' },
      ]
    case 'rental-support':
      return [
        { label: 'Issue type', value: input.issueType ?? 'General rental issue' },
        { label: 'Property', value: input.propertyAddress ?? input.suburb ?? 'Rental address not provided' },
        { label: 'Goal', value: input.goal ?? 'Prepare a clear message and action path' },
      ]
    case 'home-care':
      return [
        { label: 'Person', value: input.personName ?? 'Household member' },
        { label: 'Need', value: input.supportType ?? 'Care support' },
        { label: 'Timing', value: input.timing ?? 'To be confirmed' },
      ]
    default:
      return [
        { label: 'Move type', value: input.moveType ?? 'Move or clean-up' },
        { label: 'Area', value: input.fromTo ?? input.suburb ?? 'Greater Sydney' },
        { label: 'Deadline', value: input.deadline ?? 'Flexible' },
      ]
  }
}

export function toTaskResult(task: ApiTask, fallbackJob?: MarketplaceJob | null): TaskResult {
  const confidence = task.ai_confidence_score
  const needsHuman = Boolean(task.requires_human || task.status === 'needs_human' || task.status === 'posted_to_marketplace')

  return {
    title: titleFromTask(task),
    scenarioLabel: scenarioLabel(task.scenario_type),
    status: task.status,
    summary: summaryFromInput(task),
    outputs: outputsFromTask(task),
    nextActions: needsHuman
      ? ['Review the AI draft', 'Check if marketplace escalation is needed', 'Send or approve the next step']
      : ['Review the output', 'Send it onwards', 'Create the next household task if needed'],
    confidenceLabel: typeof confidence === 'number' ? `${Math.round(confidence * 100)}% confidence` : 'Confidence pending',
    needsHuman,
    humanFallbackReason: fallbackJob?.reason,
  }
}
