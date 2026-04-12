import type { ApiExecution, ApiTask, TaskResult } from '../types'

export function toTaskResult(task: ApiTask, execution?: ApiExecution): TaskResult {
  const confidence = execution?.confidence_score ?? task.ai_confidence_score ?? 0
  const qualityScore = execution?.quality_score ?? 0.82

  const routedAgents = task.scenario_type === 'home-repairs'
    ? ['repair-scope-agent', 'quote-agent', 'message-agent']
    : task.scenario_type === 'rental-support'
      ? ['tenancy-agent', 'evidence-agent', 'message-agent']
      : task.scenario_type === 'home-care'
        ? ['care-notes-agent', 'schedule-agent', 'family-update-agent']
        : ['moving-agent', 'checklist-agent', 'provider-agent']

  const deliverables = task.scenario_type === 'home-repairs'
    ? ['Tradie-ready scope', 'Quote request draft', 'Urgency notes']
    : task.scenario_type === 'rental-support'
      ? ['Landlord or tenant message draft', 'Issue summary', 'Evidence checklist']
      : task.scenario_type === 'home-care'
        ? ['Care summary', 'Family update', 'Risk notes']
        : ['Move checklist', 'Provider brief', 'Deadline reminders']

  const nextSteps = task.requires_human
    ? ['Send to human fallback', 'Review provider shortlist', 'Track progress in dashboard']
    : ['Review AI output', 'Send or book from the draft', 'Keep task history in dashboard']

  return {
    taskId: task.id,
    title: task.title,
    scenarioType: task.scenario_type,
    mode: task.requires_human ? 'hybrid' : 'ai_instant',
    lifecycle: task.status,
    confidence,
    qualityScore,
    routedAgents,
    fallbackRecommended: task.requires_human,
    output: {
      headline: `${task.title} is ready for the next step`,
      summary: task.description,
      deliverables,
      nextSteps,
    },
  }
}
