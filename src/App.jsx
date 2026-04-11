import { useMemo, useState } from 'react'
import './index.css'

const navItems = [
  { id: 'home', label: 'Quick Actions', icon: '⚡' },
  { id: 'execute', label: 'Run Task', icon: '▶' },
  { id: 'results', label: 'Results', icon: '◫' },
  { id: 'marketplace', label: 'Marketplace', icon: '👤' },
  { id: 'architecture', label: 'Architecture', icon: '⌘' },
]

const scenarios = [
  {
    id: 'property-listing',
    segment: 'Real Estate',
    icon: '🏡',
    title: 'Create Property Listing',
    summary: 'Generate listing copy, ad creative, and buyer follow-up in one AI workflow.',
    taskType: 'ai_instant',
    confidenceThreshold: 0.74,
    credits: 6,
    workflow: ['Listing Agent', 'Ad Agent', 'Email Agent'],
    outputLabels: ['Title', 'Description', 'Facebook Ad Copy', 'Email Version'],
    form: [
      { key: 'address', label: 'Property address', type: 'text', placeholder: '12 Ocean View Rd, Bondi' },
      { key: 'propertyType', label: 'Property type', type: 'select', options: ['Apartment', 'House', 'Townhouse'] },
      { key: 'bedrooms', label: 'Bedrooms', type: 'number', placeholder: '3' },
      { key: 'highlights', label: 'Key highlights', type: 'textarea', placeholder: 'Ocean views, renovated kitchen, close to transport' },
    ],
  },
  {
    id: 'google-review',
    segment: 'Local Business',
    icon: '🍔',
    title: 'Reply to Google Reviews',
    summary: 'Draft polished review responses and follow-up outreach in seconds.',
    taskType: 'ai_instant',
    confidenceThreshold: 0.76,
    credits: 3,
    workflow: ['Sentiment Agent', 'Reply Agent'],
    outputLabels: ['Professional Reply', 'Friendly Version', 'Follow-up Message'],
    form: [
      { key: 'businessName', label: 'Business name', type: 'text', placeholder: 'Sunset Burger Bar' },
      { key: 'reviewRating', label: 'Review rating', type: 'select', options: ['1 star', '2 star', '3 star', '4 star', '5 star'] },
      { key: 'reviewText', label: 'Review text', type: 'textarea', placeholder: 'Paste the customer review here' },
      { key: 'tone', label: 'Preferred tone', type: 'select', options: ['Professional', 'Warm', 'Apologetic', 'Playful'] },
    ],
  },
  {
    id: 'care-notes',
    segment: 'Aged Care',
    icon: '👵',
    title: 'Generate Care Notes',
    summary: 'Convert shift details into structured care notes and family-safe summaries.',
    taskType: 'hybrid_review',
    confidenceThreshold: 0.8,
    credits: 5,
    workflow: ['Clinical Notes Agent', 'Family Update Agent'],
    outputLabels: ['Care Note Summary', 'Clinical Observation List', 'Family Update Message'],
    form: [
      { key: 'residentName', label: 'Resident first name', type: 'text', placeholder: 'Margaret' },
      { key: 'shiftSummary', label: 'Shift summary', type: 'textarea', placeholder: 'Mobility stable, appetite reduced at lunch, family visited at 3pm' },
      { key: 'incident', label: 'Incident or concern', type: 'select', options: ['No incident', 'Minor concern', 'Escalation needed'] },
      { key: 'language', label: 'Preferred family language', type: 'select', options: ['English', 'Chinese', 'Arabic', 'Vietnamese'] },
    ],
  },
  {
    id: 'trade-quote',
    segment: 'Trades',
    icon: '🔧',
    title: 'Generate Quote',
    summary: 'Turn a rough job request into a customer-ready quote, invoice draft, and SMS follow-up.',
    taskType: 'hybrid_review',
    confidenceThreshold: 0.72,
    credits: 4,
    workflow: ['Quote Agent', 'Invoice Agent', 'SMS Agent'],
    outputLabels: ['Quote Summary', 'Line Items', 'Invoice Draft', 'Follow-up SMS'],
    form: [
      { key: 'jobType', label: 'Job type', type: 'text', placeholder: 'Hot water system replacement' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Parramatta' },
      { key: 'scope', label: 'Scope details', type: 'textarea', placeholder: 'Old unit leaking, customer wants replacement this week' },
      { key: 'urgency', label: 'Urgency', type: 'select', options: ['Standard', 'Urgent', 'Emergency'] },
    ],
  },
]

const schemaBlueprint = [
  {
    entity: 'Task',
    description: 'Extends the existing task record for AI-first execution while keeping backward compatibility.',
    fields: ['id', 'title', 'description', 'scenario_type', 'input_data', 'status', 'ai_confidence_score', 'requires_human', 'created_by'],
  },
  {
    entity: 'TaskExecution',
    description: 'Stores execution runs for AI, human, or hybrid processing.',
    fields: ['id', 'task_id', 'execution_mode', 'executor_id', 'logs', 'output', 'quality_score', 'started_at', 'completed_at'],
  },
  {
    entity: 'MarketplaceJob',
    description: 'Secondary marketplace object created only when AI confidence is low or user requests human help.',
    fields: ['id', 'linked_task_id', 'budget', 'status', 'assigned_human_id', 'bids_count'],
  },
  {
    entity: 'AgentRoute',
    description: 'Maps each scenario to one or more agents and workflow steps.',
    fields: ['scenario_type', 'agent_ids[]', 'fallback_policy', 'confidence_threshold', 'workflow_template'],
  },
]

const marketplaceJobs = [
  {
    id: 'job-1001',
    linkedTaskId: 'task-care-notes',
    title: 'Review family update before sending',
    segment: 'Aged Care',
    budget: '$45',
    status: 'posted_to_marketplace',
    reason: 'AI confidence below threshold',
    bids: 3,
  },
  {
    id: 'job-1002',
    linkedTaskId: 'task-trade-quote',
    title: 'Site visit required for final trade quote',
    segment: 'Trades',
    budget: '$120',
    status: 'assigned_to_human',
    reason: 'Physical work needed',
    bids: 2,
  },
]

const subscriptionPlans = [
  { name: 'Starter', price: '$49/mo', detail: '120 AI credits, email support' },
  { name: 'Growth', price: '$149/mo', detail: '500 AI credits, hybrid review workflows' },
  { name: 'Ops', price: '$349/mo', detail: 'Unlimited AI routing, team seats, priority fallback' },
]

const initialFormState = Object.fromEntries(
  scenarios.flatMap((scenario) => scenario.form.map((field) => [field.key, '']))
)

function buildStructuredOutput(scenario, values) {
  switch (scenario.id) {
    case 'property-listing':
      return {
        Title: `${values.bedrooms || '3'} bedroom ${values.propertyType || 'home'} in ${values.address || 'prime location'}`,
        Description: `Beautifully presented ${values.propertyType?.toLowerCase() || 'property'} featuring ${values.highlights || 'modern finishes and great lifestyle access'}.`,
        'Facebook Ad Copy': `Just listed in ${values.address || 'your suburb'}: ${values.highlights || 'move-in-ready and full of light'}. Book an inspection today.`,
        'Email Version': `Hi buyer, this ${values.propertyType?.toLowerCase() || 'property'} at ${values.address || 'our latest listing'} could be a strong fit. Key highlights: ${values.highlights || 'excellent condition and lifestyle convenience'}.`,
      }
    case 'google-review':
      return {
        'Professional Reply': `Hi from ${values.businessName || 'our team'}, thank you for your ${values.reviewRating || ''} review. We appreciate the feedback and will use it to keep improving.`,
        'Friendly Version': `Thanks so much for stopping by ${values.businessName || 'our business'} and sharing your thoughts. We really appreciate it.`,
        'Follow-up Message': `Hi, thanks again for your feedback. If you'd like, we'd love to invite you back and make the next visit even better.`,
      }
    case 'care-notes':
      return {
        'Care Note Summary': `${values.residentName || 'Resident'} remained stable during the shift. Summary: ${values.shiftSummary || 'No summary provided.'}`,
        'Clinical Observation List': `Incident level: ${values.incident || 'No incident'}. Monitor appetite, mobility, and mood changes from the shift notes.`,
        'Family Update Message': `Hello, here is a short update for ${values.residentName || 'your family member'}: ${values.shiftSummary || 'The shift was stable overall.'}`,
      }
    default:
      return {
        'Quote Summary': `Draft quote for ${values.jobType || 'the requested job'} in ${values.location || 'your area'}.`,
        'Line Items': `Inspection, materials, labour, contingency based on scope: ${values.scope || 'details to be confirmed'}.`,
        'Invoice Draft': `Invoice draft prepared for ${values.jobType || 'service job'} with urgency level ${values.urgency || 'Standard'}.`,
        'Follow-up SMS': `Hi, thanks for your enquiry about ${values.jobType || 'the job'}. I’ve prepared a draft quote and can confirm next steps shortly.`,
      }
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedScenarioId, setSelectedScenarioId] = useState('property-listing')
  const [taskMode, setTaskMode] = useState('AI Instant Mode')
  const [formValues, setFormValues] = useState(initialFormState)
  const [result, setResult] = useState(null)
  const [lifecycleState, setLifecycleState] = useState('draft')
  const [showMarketplaceEscalation, setShowMarketplaceEscalation] = useState(false)

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0]

  const suggestedAgents = useMemo(() => {
    return selectedScenario.workflow.map((agent, index) => ({
      name: agent,
      fit: Number((0.91 - index * 0.08).toFixed(2)),
      quality: Number((0.94 - index * 0.05).toFixed(2)),
    }))
  }, [selectedScenario])

  const executionPreview = useMemo(() => {
    const confidence = selectedScenario.segment === 'Aged Care' ? 0.68 : selectedScenario.segment === 'Trades' ? 0.73 : 0.89
    const quality = selectedScenario.segment === 'Local Business' ? 0.92 : 0.87
    return { confidence, quality }
  }, [selectedScenario])

  const updateField = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const runTask = () => {
    const confidence = executionPreview.confidence
    const output = buildStructuredOutput(selectedScenario, formValues)
    const needsHuman = taskMode === 'Human Mode' || confidence < selectedScenario.confidenceThreshold

    setLifecycleState(needsHuman ? 'needs_human' : 'ai_completed')
    setShowMarketplaceEscalation(needsHuman)
    setResult({
      scenarioType: selectedScenario.id,
      output,
      confidence,
      quality: executionPreview.quality,
      executionMode: taskMode === 'Human Mode' ? 'HUMAN' : taskMode === 'Hybrid Mode' ? 'HYBRID' : 'AI',
      taskState: needsHuman ? 'needs_human' : 'ai_completed',
    })
    setActiveTab('results')
  }

  const sendToHuman = () => {
    setLifecycleState('posted_to_marketplace')
    setShowMarketplaceEscalation(true)
    setActiveTab('marketplace')
  }

  const renderScenarioCard = (scenario) => (
    <button
      key={scenario.id}
      className={selectedScenarioId === scenario.id ? 'scenario-card active-card' : 'scenario-card'}
      onClick={() => {
        setSelectedScenarioId(scenario.id)
        setActiveTab('execute')
      }}
    >
      <div className="scenario-head">
        <span className="scenario-icon">{scenario.icon}</span>
        <div>
          <p className="eyebrow">{scenario.segment}</p>
          <strong>{scenario.title}</strong>
        </div>
      </div>
      <p>{scenario.summary}</p>
      <div className="chip-row">
        <span>{scenario.credits} credits</span>
        <span>{scenario.taskType === 'ai_instant' ? 'AI first' : 'Hybrid ready'}</span>
      </div>
    </button>
  )

  const renderField = (field) => {
    if (field.type === 'textarea') {
      return <textarea value={formValues[field.key]} onChange={(e) => updateField(field.key, e.target.value)} rows={4} placeholder={field.placeholder} />
    }
    if (field.type === 'select') {
      return (
        <select value={formValues[field.key]} onChange={(e) => updateField(field.key, e.target.value)}>
          <option value="">Select</option>
          {field.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      )
    }
    return <input type={field.type} value={formValues[field.key]} onChange={(e) => updateField(field.key, e.target.value)} placeholder={field.placeholder} />
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">GigHub</p>
          <h1>AI-first Task Marketplace with Human-in-the-loop</h1>
          <p className="subtext">AI completes tasks instantly by default. Humans step in only when needed.</p>
        </div>
        <div className="topbar-actions">
          <span className="status-pill active">AI first. Human second.</span>
          <span className="status-pill">Credits + commission model</span>
        </div>
      </header>

      <nav className="navbar">
        {navItems.map((item) => (
          <button key={item.id} className={activeTab === item.id ? 'nav-pill active' : 'nav-pill'} onClick={() => setActiveTab(item.id)}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {activeTab === 'home' && (
        <>
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow">Scenario-based entry</p>
              <h2>What do you need today?</h2>
              <p className="hero-text">Choose a business scenario, fill a short structured form, and let AI run the workflow. If confidence is low, GigHub automatically falls back to the human marketplace.</p>
              <div className="mode-strip">
                <span className="pill">AI Instant Mode</span>
                <span className="pill muted">Hybrid Mode</span>
                <span className="pill muted">Human Mode</span>
              </div>
            </div>
            <div className="hero-card">
              <strong>Task lifecycle</strong>
              <div className="stack-list compact-stack">
                {['draft', 'running_ai', 'ai_completed', 'needs_human', 'posted_to_marketplace', 'assigned_to_human', 'completed'].map((state) => (
                  <div key={state} className={state === lifecycleState ? 'simple-row strong-row active-row' : 'simple-row'}>{state}</div>
                ))}
              </div>
            </div>
          </section>

          <section className="scenario-grid">
            {scenarios.map(renderScenarioCard)}
          </section>

          <section className="section-grid three-column">
            <article className="panel compact-panel">
              <div className="panel-head"><h3>AI Quick Actions</h3></div>
              <div className="stack-list compact-stack">
                {scenarios.map((scenario) => (
                  <button key={scenario.id} className="quick-action" onClick={() => { setSelectedScenarioId(scenario.id); setActiveTab('execute') }}>
                    <span>{scenario.icon}</span>
                    <span>{scenario.title}</span>
                  </button>
                ))}
              </div>
            </article>

            <article className="panel compact-panel">
              <div className="panel-head"><h3>Target segments</h3></div>
              <div className="stack-list compact-stack text-list">
                <div className="simple-row">🏡 Real Estate Agents</div>
                <div className="simple-row">🍔 Local Businesses</div>
                <div className="simple-row">👵 Aged Care Facilities</div>
                <div className="simple-row">🔧 Trades</div>
              </div>
            </article>

            <article className="panel compact-panel">
              <div className="panel-head"><h3>Monetization</h3></div>
              <div className="stack-list compact-stack text-list">
                {subscriptionPlans.map((plan) => (
                  <div key={plan.name} className="simple-row strong-row blocky">
                    <div>
                      <strong>{plan.name}</strong>
                      <p>{plan.detail}</p>
                    </div>
                    <span>{plan.price}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      )}

      {activeTab === 'execute' && (
        <section className="section-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Structured task form</p>
                <h3>{selectedScenario.icon} {selectedScenario.title}</h3>
              </div>
              <div className="action-row slim">
                {['AI Instant Mode', 'Hybrid Mode', 'Human Mode'].map((mode) => (
                  <button key={mode} className={taskMode === mode ? 'filter-chip active' : 'filter-chip'} onClick={() => setTaskMode(mode)}>{mode}</button>
                ))}
              </div>
            </div>
            <div className="form-grid">
              {selectedScenario.form.map((field) => (
                <label key={field.key}>
                  <span>{field.label}</span>
                  {renderField(field)}
                </label>
              ))}
            </div>
            <div className="action-row">
              <button className="primary-button" onClick={() => { setLifecycleState('running_ai'); runTask() }}>Run Task</button>
              <button className="ghost-button" onClick={() => setFormValues(initialFormState)}>Reset</button>
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">AI routing</p>
                <h3>Execution engine preview</h3>
              </div>
            </div>
            <div className="detail-block">
              <span>Scenario</span>
              <strong>{selectedScenario.segment} / {selectedScenario.id}</strong>
            </div>
            <div className="detail-block">
              <span>Suggested agents</span>
              <div className="stack-list compact-stack">
                {suggestedAgents.map((agent) => (
                  <div key={agent.name} className="simple-row strong-row">
                    <span>{agent.name}</span>
                    <span>fit {agent.fit} · quality {agent.quality}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="detail-block">
              <span>Confidence scoring</span>
              <strong>{executionPreview.confidence} threshold {selectedScenario.confidenceThreshold}</strong>
            </div>
            <div className="detail-block">
              <span>Fallback rule</span>
              <strong>If confidence is low, output is unsatisfactory, or physical work is needed, post to marketplace.</strong>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'results' && (
        <section className="section-grid two-column">
          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Structured output</p>
                <h3>{selectedScenario.title} results</h3>
              </div>
              <span className={result?.taskState === 'needs_human' ? 'status-pill' : 'status-pill active'}>{result?.taskState || 'draft'}</span>
            </div>
            <div className="stack-list">
              {result ? Object.entries(result.output).map(([label, value]) => (
                <div key={label} className="detail-block">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              )) : <div className="detail-block"><strong>No task run yet</strong></div>}
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Result controls</p>
                <h3>Improve or escalate</h3>
              </div>
            </div>
            <div className="detail-block">
              <span>Confidence / quality</span>
              <strong>{result ? `${result.confidence} / ${result.quality}` : 'Waiting for execution'}</strong>
            </div>
            <div className="action-row">
              <button className="primary-button" onClick={() => setActiveTab('execute')}>Improve with AI</button>
              <button className="ghost-button" onClick={sendToHuman}>Send to human</button>
            </div>
            <div className="detail-block">
              <span>Execution mode</span>
              <strong>{result?.executionMode || taskMode}</strong>
            </div>
            <div className="detail-block">
              <span>Human-in-the-loop</span>
              <strong>{showMarketplaceEscalation ? 'Marketplace job will be created as fallback.' : 'No fallback triggered yet.'}</strong>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'marketplace' && (
        <section className="section-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Secondary marketplace</p>
                <h3>Only used after AI step</h3>
              </div>
            </div>
            <div className="stack-list">
              {marketplaceJobs.map((job) => (
                <div key={job.id} className="list-card active-card">
                  <div className="list-card-top">
                    <strong>{job.title}</strong>
                    <span>{job.budget}</span>
                  </div>
                  <p>{job.segment} · {job.reason}</p>
                  <div className="chip-row">
                    <span>{job.status}</span>
                    <span>{job.bids} bids</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Human fallback system</p>
                <h3>Airtasker-style marketplace reuse</h3>
              </div>
            </div>
            <div className="stack-list text-list">
              <div className="simple-row">1. AI runs first by default</div>
              <div className="simple-row">2. Low confidence or dissatisfaction triggers escalation</div>
              <div className="simple-row">3. Marketplace job is created with linked task ID</div>
              <div className="simple-row">4. Humans bid, accept, and complete the fallback work</div>
            </div>
            <div className="detail-block">
              <span>Commission model</span>
              <strong>10% to 20% commission on human marketplace work</strong>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'architecture' && (
        <section className="section-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Deliverables</p>
                <h3>Refactor plan and API updates</h3>
              </div>
            </div>
            <div className="stack-list text-list">
              <div className="simple-row">1. Refactor homepage into scenario-based entry</div>
              <div className="simple-row">2. Extend backend schema for AI-first tasks and human fallback</div>
              <div className="simple-row">3. Add structured task execution forms and result pages</div>
              <div className="simple-row">4. Define AI execution engine with confidence and quality evaluation</div>
              <div className="simple-row">5. Reuse marketplace as fallback-only human layer</div>
              <div className="simple-row">6. Prepare API surfaces for task run, evaluation, and escalation</div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Updated schema</p>
                <h3>Future-ready system design</h3>
              </div>
            </div>
            <div className="schema-grid">
              {schemaBlueprint.map((item) => (
                <article key={item.entity} className="schema-card">
                  <strong>{item.entity}</strong>
                  <p>{item.description}</p>
                  <span>{item.fields.join(' • ')}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
