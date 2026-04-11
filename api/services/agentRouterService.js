const routeMap = {
  'property-listing': {
    agents: ['listing-agent', 'ad-agent', 'email-agent'],
    threshold: 0.74,
  },
  'google-review': {
    agents: ['sentiment-agent', 'reply-agent'],
    threshold: 0.76,
  },
  'care-notes': {
    agents: ['care-notes-agent', 'family-update-agent'],
    threshold: 0.8,
  },
  'trade-quote': {
    agents: ['quote-agent', 'invoice-agent', 'sms-agent'],
    threshold: 0.72,
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
