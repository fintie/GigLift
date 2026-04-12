import { getScenarioDefinition } from '../features/scenarios/config'
import type { ApiExecution, ApiTask, TaskResult } from '../types'

export function toTaskResult(task: ApiTask, execution?: ApiExecution): TaskResult {
  const scenario = getScenarioDefinition(task.scenario_type)
  const confidence = execution?.confidence_score ?? task.ai_confidence_score ?? 0
  const qualityScore = execution?.quality_score ?? 0.82
  const routedAgents = task.scenario_type === 'property-listing'
    ? ['listing-agent', 'ad-agent', 'email-agent']
    : task.scenario_type === 'trade-quote'
      ? ['quote-agent', 'invoice-agent', 'sms-agent']
      : ['ops-agent', 'quality-agent']

  return {
    taskId: task.id,
    title: task.title,
    scenarioType: task.scenario_type,
    mode: task.requires_human ? 'hybrid' : scenario.mode,
    lifecycle: task.status,
    confidence,
    qualityScore,
    routedAgents,
    fallbackRecommended: task.requires_human,
    output: {
      headline: `${task.title} is ${task.status.replaceAll('_', ' ')}`,
      summary: task.description,
      deliverables: Array.isArray((execution?.output as { deliverables?: string[] } | undefined)?.deliverables)
        ? ((execution?.output as { deliverables?: string[] }).deliverables ?? [])
        : ['Structured brief', 'Execution log', 'Next-step recommendation'],
      nextSteps: task.requires_human
        ? ['Send to marketplace', 'Assign reviewer', 'Track SLA']
        : ['Approve output', 'Reuse workflow', 'Archive result'],
    },
  }
}
