function buildOutput(scenarioType, inputData = {}) {
  if (scenarioType === 'property-listing') {
    return {
      title: `${inputData.bedrooms ?? '3'} bedroom ${inputData.propertyType ?? 'property'} in ${inputData.address ?? 'great location'}`,
      description: `Showcase the property with highlights: ${inputData.highlights ?? 'modern living and local convenience'}.`,
      facebookAdCopy: `New listing at ${inputData.address ?? 'a prime address'}. ${inputData.highlights ?? 'Book a viewing today.'}`,
      emailVersion: `Hi buyer, this ${inputData.propertyType ?? 'property'} could be a fit for you. Highlights include ${inputData.highlights ?? 'strong presentation and lifestyle access'}.`,
    }
  }

  if (scenarioType === 'google-review') {
    return {
      professionalReply: `Thanks for your feedback about ${inputData.businessName ?? 'our business'}. We appreciate your review and will continue improving.`,
      friendlyVersion: `Thanks so much for sharing your experience. We really appreciate the support.`,
      followUpMessage: `We would love to welcome you back soon and deliver an even better experience next time.`,
    }
  }

  if (scenarioType === 'care-notes') {
    return {
      careNoteSummary: `${inputData.residentName ?? 'Resident'} shift summary: ${inputData.shiftSummary ?? 'stable and monitored.'}`,
      clinicalObservationList: `Incident level: ${inputData.incident ?? 'No incident'}. Continue monitoring wellbeing indicators.`,
      familyUpdateMessage: `Hello, here is an update for ${inputData.residentName ?? 'your family member'}: ${inputData.shiftSummary ?? 'The shift was stable overall.'}`,
    }
  }

  return {
    quoteSummary: `Draft quote for ${inputData.jobType ?? 'requested job'} in ${inputData.location ?? 'service area'}.`,
    lineItems: `Labour, materials, travel, and contingency based on: ${inputData.scope ?? 'scope to confirm'}.`,
    invoiceDraft: `Invoice draft created for ${inputData.jobType ?? 'service work'}.`,
    followUpSms: `Thanks for your enquiry. Your draft quote is ready and I can confirm next steps shortly.`,
  }
}

function scoreScenario(scenarioType, mode) {
  if (mode === 'HUMAN') return { confidence: 0.25, quality: 0.95 }
  if (scenarioType === 'care-notes') return { confidence: 0.68, quality: 0.84 }
  if (scenarioType === 'trade-quote') return { confidence: 0.73, quality: 0.86 }
  return { confidence: 0.9, quality: 0.91 }
}

export class AiExecutionService {
  constructor({ agentRouterService, taskExecutionsModel }) {
    this.agentRouterService = agentRouterService
    this.taskExecutionsModel = taskExecutionsModel
  }

  execute(task) {
    const route = this.agentRouterService.getRouteForScenario(task.scenario_type)
    const scores = scoreScenario(task.scenario_type, task.mode)
    const output = buildOutput(task.scenario_type, task.input_data)

    const execution = this.taskExecutionsModel.create({
      task_id: task.id,
      execution_mode: task.mode,
      executor_id: route.agents.join(','),
      logs: [`Scenario identified: ${task.scenario_type}`, `Routed to agents: ${route.agents.join(' -> ')}`, `Execution finished with confidence ${scores.confidence}`],
      output,
      quality_score: scores.quality,
      completed_at: new Date().toISOString(),
    })

    return {
      route,
      execution,
      confidence: scores.confidence,
      quality: scores.quality,
      output,
      requiresHuman: task.mode === 'HUMAN' || scores.confidence < route.threshold,
    }
  }
}
