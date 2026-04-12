const routeMap = {
  'home-repairs': {
    agents: ['repair-scope-agent', 'quote-agent', 'message-agent'],
    threshold: 0.76,
  },
  'rental-support': {
    agents: ['tenancy-agent', 'evidence-agent', 'message-agent'],
    threshold: 0.78,
  },
  'home-care': {
    agents: ['care-notes-agent', 'schedule-agent', 'family-update-agent'],
    threshold: 0.8,
  },
  'moving-help': {
    agents: ['moving-agent', 'checklist-agent', 'provider-agent'],
    threshold: 0.74,
  },
}

export class AgentRouterService {
  getRouteForScenario(scenarioType) {
    return routeMap[scenarioType] ?? {
      agents: ['generalist-agent'],
      threshold: 0.75,
    }
  }
}
