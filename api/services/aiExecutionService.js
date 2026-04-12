function buildScenarioOutput(task) {
  const input = task.input_data ?? {}

  switch (task.scenario_type) {
    case 'home-repairs':
      return {
        summary: `Prepared a repair scope for ${input.issue ?? 'the reported issue'} in ${input.suburb ?? 'the property'}.`,
        deliverables: [
          'Tradie-ready scope of work',
          'Urgency and budget summary',
          'Message draft for contractor or landlord',
        ],
        next_steps: [
          'Review the scope',
          'Send to two providers or the landlord',
          'Book inspection if onsite assessment is needed',
        ],
      }
    case 'rental-support':
      return {
        summary: `Structured the ${input.issueType ?? 'rental'} issue into a send-ready communication pack.`,
        deliverables: [
          'Rental issue summary',
          'Evidence checklist',
          'Draft landlord or tenant message',
        ],
        next_steps: [
          'Attach photos or supporting evidence',
          'Send through the property channel',
          'Track response time and escalate if needed',
        ],
      }
    case 'home-care':
      return {
        summary: `Organised the care request for ${input.personName ?? 'the household member'} into a support handoff.`,
        deliverables: [
          'Support summary',
          'Family update draft',
          'Risk and follow-up notes',
        ],
        next_steps: [
          'Confirm the care schedule',
          'Share the family update',
          'Escalate to a provider if risks increase',
        ],
      }
    case 'moving-help':
      return {
        summary: `Mapped the moving and settle-in tasks for ${input.fromTo ?? 'the move'} into a practical checklist.`,
        deliverables: [
          'Move checklist',
          'Provider brief',
          'Deadline and access reminders',
        ],
        next_steps: [
          'Confirm access windows',
          'Book movers or cleaners',
          'Track completion in the dashboard',
        ],
      }
    default:
      return {
        summary: 'Prepared a structured output pack for the submitted task.',
        deliverables: ['Structured brief', 'Output draft', 'Follow-up steps'],
        next_steps: ['Review', 'Approve', 'Route if needed'],
      }
  }
}

function scoreScenario(task) {
  switch (task.scenario_type) {
    case 'home-repairs':
      return 0.72
    case 'rental-support':
      return 0.88
    case 'home-care':
      return 0.79
    case 'moving-help':
      return 0.75
    default:
      return 0.77
  }
}

export class AiExecutionService {
  constructor({ taskExecutionModel, agentRouterService }) {
    this.taskExecutionModel = taskExecutionModel
    this.agentRouterService = agentRouterService
  }

  async execute(task) {
    const route = this.agentRouterService.getRouteForScenario(task.scenario_type)
    const confidenceScore = scoreScenario(task)
    const output = buildScenarioOutput(task)

    const execution = this.taskExecutionModel.create({
      task_id: task.id,
      execution_mode: confidenceScore >= route.threshold ? 'agent' : 'hybrid',
      confidence_score: confidenceScore,
      quality_score: Math.min(0.96, confidenceScore + 0.08),
      status: confidenceScore >= route.threshold ? 'ai_completed' : 'needs_human',
      agents_used: route.agents,
      output,
    })

    return {
      execution,
      route,
      shouldEscalate: confidenceScore < route.threshold,
    }
  }
}
