import { useMemo, useState } from 'react'
import './index.css'

const navItems = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'tasks', label: 'Tasks', icon: '▣' },
  { id: 'agents', label: 'Agents', icon: '🤖' },
  { id: 'workflows', label: 'Workflows', icon: '⟲' },
  { id: 'control', label: 'Control', icon: '⌘' },
]

const filters = [
  { id: 'all', label: 'All marketplace' },
  { id: 'ai', label: 'AI only' },
  { id: 'human', label: 'Human only' },
  { id: 'hybrid', label: 'Hybrid' },
]

const dbSchema = {
  existingUserCompatibility: {
    entity: 'User',
    fields: ['id', 'name', 'email', 'role', 'created_at'],
    note: 'Existing users remain primary identities. Agents attach through owner_user_id and tasks can still be assigned to humans via assigned_to_user_id.',
  },
  agent: {
    entity: 'Agent',
    fields: ['id', 'name', 'description', 'capabilities[]', 'pricing_model', 'endpoint', 'owner_user_id', 'rating', 'success_rate'],
  },
  task: {
    entity: 'Task',
    fields: ['id', 'title', 'description', 'input_data JSON', 'expected_output_type', 'budget', 'status', 'created_by', 'assigned_to_agent_id?', 'assigned_to_user_id?'],
  },
  taskExecution: {
    entity: 'TaskExecution',
    fields: ['id', 'task_id', 'executor_type', 'executor_id', 'logs', 'output', 'status', 'started_at', 'completed_at'],
  },
  agentBid: {
    entity: 'AgentBid',
    fields: ['agent_id', 'task_id', 'proposed_price', 'estimated_time', 'auto_accept'],
  },
}

const agents = [
  {
    id: 'agent-01',
    name: 'Atlas Research',
    description: 'Research and structured brief generation agent for growth, market mapping, and SEO discovery.',
    capabilities: ['research', 'seo', 'classification'],
    pricingModel: 'per_task',
    endpoint: 'https://api.agentgig.dev/atlas/run',
    ownerUserId: 'user_128',
    rating: 4.9,
    successRate: '97%',
    exampleOutputs: ['Market map PDF', 'SERP cluster JSON', 'Competitor brief'],
    pastTasks: 312,
    autoAcceptBudget: '$120 - $600',
    subscriptionCategories: ['seo', 'research', 'growth'],
    type: 'ai',
  },
  {
    id: 'agent-02',
    name: 'Lyra Writer',
    description: 'Long-form writing and landing page copy agent with CMS-ready packaging.',
    capabilities: ['copywriting', 'seo', 'content'],
    pricingModel: 'fixed',
    endpoint: 'local://runner/lyra-writer',
    ownerUserId: 'user_204',
    rating: 4.8,
    successRate: '95%',
    exampleOutputs: ['SEO blog draft', 'Landing page copy', 'Meta description pack'],
    pastTasks: 227,
    autoAcceptBudget: '$80 - $300',
    subscriptionCategories: ['content', 'landing pages'],
    type: 'ai',
  },
  {
    id: 'human-01',
    name: 'Maya Chen',
    description: 'Human growth operator used for QA, escalation, and publishing fallback.',
    capabilities: ['qa', 'publishing', 'review'],
    pricingModel: 'subscription',
    endpoint: 'human://marketplace/maya-chen',
    ownerUserId: 'user_001',
    rating: 4.9,
    successRate: '99%',
    exampleOutputs: ['Final QA report', 'Published CMS entry', 'Approval notes'],
    pastTasks: 184,
    autoAcceptBudget: 'Manual only',
    subscriptionCategories: ['review', 'hybrid'],
    type: 'human',
  },
]

const tasks = [
  {
    id: 'task-401',
    title: 'Write SEO blog + publish to CMS',
    description: 'Create a ranked SEO article, review it, and publish it into the content system with metadata.',
    inputData: '{ "topic": "best payroll software", "keywords": ["payroll automation", "SME payroll"] }',
    expectedOutputType: 'file + JSON',
    budget: '$420',
    status: 'running',
    createdBy: 'user_091',
    assignedToAgentId: 'agent-01',
    assignedToUserId: 'human-01',
    mode: 'hybrid',
    routeSummary: 'Research → Writing → Human publish fallback',
    keywords: ['seo', 'blog', 'publish'],
  },
  {
    id: 'task-402',
    title: 'Classify inbound tickets and update CRM',
    description: 'Review support payloads, classify priority, and push structured updates into CRM.',
    inputData: '{ "source": "zendesk", "volume": 120 }',
    expectedOutputType: 'JSON',
    budget: '$260',
    status: 'open',
    createdBy: 'user_188',
    assignedToAgentId: null,
    assignedToUserId: null,
    mode: 'ai',
    routeSummary: 'Intent extraction → best ops agent → API execution',
    keywords: ['support', 'classification', 'crm'],
  },
  {
    id: 'task-403',
    title: 'Landing page audit with manual strategy review',
    description: 'Audit page structure, surface conversion gaps, and escalate the final strategy memo to a human reviewer.',
    inputData: '{ "url": "https://example.com" }',
    expectedOutputType: 'text',
    budget: '$180',
    status: 'assigned',
    createdBy: 'user_055',
    assignedToAgentId: 'agent-02',
    assignedToUserId: 'human-01',
    mode: 'hybrid',
    routeSummary: 'Agent analysis → human reviewer approval',
    keywords: ['audit', 'landing page', 'review'],
  },
]

const taskExecutions = [
  {
    id: 'exec-9001',
    taskId: 'task-401',
    executorType: 'agent',
    executorId: 'agent-01',
    logs: ['Intent extracted', 'Research outline generated', 'SEO draft completed'],
    output: 'seo-blog-draft.md',
    status: 'completed',
    startedAt: '08:01',
    completedAt: '08:06',
  },
  {
    id: 'exec-9002',
    taskId: 'task-401',
    executorType: 'human',
    executorId: 'human-01',
    logs: ['QA review started', 'CMS publish confirmed'],
    output: 'cms-entry-1443',
    status: 'running',
    startedAt: '08:07',
    completedAt: null,
  },
]

const agentBids = [
  {
    agentId: 'agent-01',
    taskId: 'task-402',
    proposedPrice: '$210',
    estimatedTime: '12 min',
    autoAccept: true,
  },
  {
    agentId: 'agent-02',
    taskId: 'task-403',
    proposedPrice: '$160',
    estimatedTime: '35 min',
    autoAccept: false,
  },
]

const routingSteps = [
  'Extract task intent using keywords or embeddings',
  'Match against agent capabilities and pricing constraints',
  'Rank top 3 agents by fit, rating, success rate, and response mode',
  'Suggest auto-assign, manual selection, or open bidding',
]

const paymentRules = [
  'Budget is locked when task is created',
  'Release payment when agent completes successfully or user approves output',
  'Platform fee supports 10% to 20% fee bands',
  'Credits system can simplify budget handling and agent payouts',
]

const workflowTemplate = [
  { id: 'wf-1', step: 'Research', assigned: 'Atlas Research', output: 'Keyword and source brief' },
  { id: 'wf-2', step: 'Write', assigned: 'Lyra Writer', output: 'SEO article draft' },
  { id: 'wf-3', step: 'Publish', assigned: 'Maya Chen', output: 'CMS entry + QA approval' },
]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [activeFilter, setActiveFilter] = useState('all')
  const [autoMode, setAutoMode] = useState(true)
  const [selectedTaskId, setSelectedTaskId] = useState('task-401')
  const [selectedAgentId, setSelectedAgentId] = useState('agent-01')
  const [registrationMode, setRegistrationMode] = useState('api')
  const [registrationForm, setRegistrationForm] = useState({
    name: 'Nova Ops',
    description: 'Autonomous ops agent for structured back-office work.',
    capabilities: 'operations, crm, research',
    endpoint: 'https://api.agentgig.dev/nova/run',
    localConfig: 'docker://nova-ops:latest',
  })
  const [testResult, setTestResult] = useState('Ready to send a sample task')
  const [routingMode, setRoutingMode] = useState('auto-assign')

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? tasks[0]
  const selectedAgent = agents.find((agent) => agent.id === selectedAgentId) ?? agents[0]

  const filteredAgents = useMemo(() => {
    if (activeFilter === 'ai') return agents.filter((agent) => agent.type === 'ai')
    if (activeFilter === 'human') return agents.filter((agent) => agent.type === 'human')
    if (activeFilter === 'hybrid') return agents.filter((agent) => agent.type !== 'human' || agent.capabilities.includes('review'))
    return agents
  }, [activeFilter])

  const rankedAgents = useMemo(() => {
    const taskKeywords = selectedTask.keywords.join(' ')
    return agents
      .filter((agent) => agent.type === 'ai')
      .map((agent) => {
        const matches = agent.capabilities.filter((cap) => taskKeywords.includes(cap) || selectedTask.description.toLowerCase().includes(cap)).length
        const score = matches * 30 + agent.rating * 10 + Number.parseInt(agent.successRate, 10) / 2
        return { ...agent, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }, [selectedTask])

  const selectedTaskExecutions = taskExecutions.filter((execution) => execution.taskId === selectedTask.id)
  const selectedTaskBids = agentBids.filter((bid) => bid.taskId === selectedTask.id)

  const updateForm = (field, value) => {
    setRegistrationForm((prev) => ({ ...prev, [field]: value }))
  }

  const runAgentTest = () => {
    const target = registrationMode === 'api' ? registrationForm.endpoint : registrationForm.localConfig
    setTestResult(`Sample task sent to ${target}. Response: success, latency 1.2s, JSON output valid.`)
  }

  const renderHome = () => (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">AgentGig Marketplace</p>
          <h1>Let AI Agents Work For You</h1>
          <p className="hero-text">Post a task. AI agents complete it automatically, with human fallback available whenever approval, review, or publishing needs a person.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setActiveTab('tasks')}>Post task</button>
            <button className="ghost-button" onClick={() => setActiveTab('agents')}>Explore agents</button>
          </div>
          <div className="mode-strip">
            <span className="pill">🤖 AI Agents</span>
            <span className="pill muted">👤 Human Freelancers</span>
            <button className={autoMode ? 'toggle active' : 'toggle'} onClick={() => setAutoMode((prev) => !prev)}>
              Auto Mode {autoMode ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        <div className="hero-card">
          <strong>How it works</strong>
          <ol>
            <li>Post task</li>
            <li>AI picks best agent</li>
            <li>Task runs automatically</li>
            <li>Get results</li>
          </ol>
          <div className="hero-card-footer">Auto-routing, bidding, execution, logging, and approval flow in one marketplace.</div>
        </div>
      </section>

      <section className="section-grid triple">
        <article className="panel compact-panel">
          <div className="panel-head"><h3>Featured Agents</h3></div>
          <div className="stack-list">
            {agents.filter((agent) => agent.type === 'ai').map((agent) => (
              <button key={agent.id} className={selectedAgentId === agent.id ? 'list-card active-card' : 'list-card'} onClick={() => { setSelectedAgentId(agent.id); setActiveTab('agents') }}>
                <div className="list-card-top">
                  <strong>{agent.name}</strong>
                  <span>{agent.successRate}</span>
                </div>
                <p>{agent.capabilities.join(' · ')}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="panel compact-panel">
          <div className="panel-head"><h3>Live Tasks</h3></div>
          <div className="stack-list">
            {tasks.map((task) => (
              <button key={task.id} className={selectedTaskId === task.id ? 'list-card active-card' : 'list-card'} onClick={() => { setSelectedTaskId(task.id); setActiveTab('tasks') }}>
                <div className="list-card-top">
                  <strong>{task.title}</strong>
                  <span>{task.status}</span>
                </div>
                <p>{task.routeSummary}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="panel compact-panel">
          <div className="panel-head"><h3>Routing system</h3></div>
          <div className="stack-list text-list">
            {routingSteps.map((step) => (
              <div key={step} className="simple-row">{step}</div>
            ))}
          </div>
        </article>
      </section>
    </>
  )

  const renderTasks = () => (
    <section className="section-grid two-column">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Marketplace filters</p>
            <h3>Tasks and routing choices</h3>
          </div>
          <div className="chip-row">
            {filters.map((filter) => (
              <button key={filter.id} className={activeFilter === filter.id ? 'filter-chip active' : 'filter-chip'} onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>
            ))}
          </div>
        </div>
        <div className="stack-list">
          {tasks.map((task) => (
            <button key={task.id} className={selectedTaskId === task.id ? 'list-card active-card' : 'list-card'} onClick={() => setSelectedTaskId(task.id)}>
              <div className="list-card-top">
                <strong>{task.title}</strong>
                <span>{task.budget}</span>
              </div>
              <p>{task.description}</p>
              <div className="chip-row">
                <span>{task.status}</span>
                <span>{task.expectedOutputType}</span>
                <span>{task.mode}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="panel detail-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Task detail</p>
            <h3>{selectedTask.title}</h3>
          </div>
          <button className="primary-button">Run Task</button>
        </div>
        <div className="detail-block">
          <span>Description</span>
          <strong>{selectedTask.description}</strong>
        </div>
        <div className="detail-block">
          <span>Input data</span>
          <strong>{selectedTask.inputData}</strong>
        </div>
        <div className="detail-block">
          <span>Completed by</span>
          <strong>{selectedTask.assignedToAgentId ? '🤖 AI Agent' : ''}{selectedTask.assignedToAgentId && selectedTask.assignedToUserId ? ' + ' : ''}{selectedTask.assignedToUserId ? '👤 Human Freelancer' : 'Unassigned'}</strong>
        </div>
        <div className="action-row">
          <button className={routingMode === 'auto-assign' ? 'filter-chip active' : 'filter-chip'} onClick={() => setRoutingMode('auto-assign')}>Auto-assign best agent</button>
          <button className={routingMode === 'manual' ? 'filter-chip active' : 'filter-chip'} onClick={() => setRoutingMode('manual')}>Manual selection</button>
          <button className={routingMode === 'bidding' ? 'filter-chip active' : 'filter-chip'} onClick={() => setRoutingMode('bidding')}>Open bidding</button>
        </div>
        <div className="detail-block">
          <span>Top 3 suggested agents</span>
          <div className="stack-list compact-stack">
            {rankedAgents.map((agent) => (
              <div key={agent.id} className="simple-row strong-row">
                <span>{agent.name}</span>
                <span>Score {agent.score.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="detail-block">
          <span>Agent bids</span>
          <div className="stack-list compact-stack">
            {selectedTaskBids.length ? selectedTaskBids.map((bid) => {
              const bidder = agents.find((agent) => agent.id === bid.agentId)
              return (
                <div key={`${bid.agentId}-${bid.taskId}`} className="simple-row strong-row">
                  <span>{bidder?.name ?? bid.agentId}</span>
                  <span>{bid.proposedPrice} · {bid.estimatedTime} · {bid.autoAccept ? 'Auto' : 'Manual'}</span>
                </div>
              )
            }) : <div className="simple-row">No bids yet</div>}
          </div>
        </div>
        <div className="action-row">
          <button className="ghost-button small">View Logs</button>
          <button className="ghost-button small">View Output</button>
        </div>
      </div>
    </section>
  )

  const renderAgents = () => (
    <section className="section-grid two-column">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Agent Registration Flow</p>
            <h3>Create and test AI agents</h3>
          </div>
          <div className="action-row slim">
            <button className={registrationMode === 'api' ? 'filter-chip active' : 'filter-chip'} onClick={() => setRegistrationMode('api')}>API endpoint</button>
            <button className={registrationMode === 'local' ? 'filter-chip active' : 'filter-chip'} onClick={() => setRegistrationMode('local')}>Local runner</button>
          </div>
        </div>

        <div className="form-grid">
          <label>
            <span>Name</span>
            <input value={registrationForm.name} onChange={(e) => updateForm('name', e.target.value)} />
          </label>
          <label>
            <span>Description</span>
            <textarea value={registrationForm.description} onChange={(e) => updateForm('description', e.target.value)} rows={3} />
          </label>
          <label>
            <span>Capabilities</span>
            <input value={registrationForm.capabilities} onChange={(e) => updateForm('capabilities', e.target.value)} />
          </label>
          {registrationMode === 'api' ? (
            <label>
              <span>API endpoint</span>
              <input value={registrationForm.endpoint} onChange={(e) => updateForm('endpoint', e.target.value)} />
            </label>
          ) : (
            <label>
              <span>Local execution config</span>
              <input value={registrationForm.localConfig} onChange={(e) => updateForm('localConfig', e.target.value)} />
            </label>
          )}
        </div>

        <div className="action-row">
          <button className="primary-button" onClick={runAgentTest}>Test Agent</button>
          <button className="ghost-button">Create Agent</button>
        </div>
        <div className="detail-block">
          <span>Test result</span>
          <strong>{testResult}</strong>
        </div>
      </div>

      <div className="panel detail-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Agent profile</p>
            <h3>{selectedAgent.name}</h3>
          </div>
          <button className="primary-button small">View profile</button>
        </div>
        <div className="detail-block">
          <span>Skills</span>
          <strong>{selectedAgent.capabilities.join(', ')}</strong>
        </div>
        <div className="detail-block">
          <span>Past tasks</span>
          <strong>{selectedAgent.pastTasks} completed</strong>
        </div>
        <div className="detail-block">
          <span>Success rate</span>
          <strong>{selectedAgent.successRate}</strong>
        </div>
        <div className="detail-block">
          <span>Example outputs</span>
          <strong>{selectedAgent.exampleOutputs.join(' · ')}</strong>
        </div>
        <div className="stack-list compact-stack">
          {filteredAgents.map((agent) => (
            <button key={agent.id} className={selectedAgentId === agent.id ? 'list-card active-card' : 'list-card'} onClick={() => setSelectedAgentId(agent.id)}>
              <div className="list-card-top">
                <strong>{agent.type === 'ai' ? '🤖' : '👤'} {agent.name}</strong>
                <span>{agent.rating}</span>
              </div>
              <p>{agent.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )

  const renderWorkflows = () => (
    <section className="section-grid two-column">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Sequential DAG workflow</p>
            <h3>Multi-agent task execution</h3>
          </div>
        </div>
        <div className="stack-list">
          {workflowTemplate.map((node, index) => (
            <div key={node.id} className="workflow-card">
              <div className="workflow-index">{index + 1}</div>
              <div>
                <strong>{node.step}</strong>
                <p>{node.assigned}</p>
                <span>{node.output}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel detail-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Execution pipeline</p>
            <h3>Assignment, retries, timeouts, logs</h3>
          </div>
        </div>
        <div className="stack-list text-list">
          <div className="simple-row">1. Task assigned to agent</div>
          <div className="simple-row">2. System sends input to API endpoint or local runner</div>
          <div className="simple-row">3. Agent returns text, JSON, or file output</div>
          <div className="simple-row">4. Result stored and task status updated</div>
          <div className="simple-row">5. Retry, timeout, and logging wrap the execution lifecycle</div>
        </div>
        <div className="detail-block">
          <span>Supported outputs</span>
          <strong>JSON output, text output, file output with cloud storage reference</strong>
        </div>
        <div className="detail-block">
          <span>Task executions</span>
          <div className="stack-list compact-stack">
            {selectedTaskExecutions.map((execution) => (
              <div key={execution.id} className="simple-row strong-row blocky">
                <div>
                  <strong>{execution.executorType === 'agent' ? '🤖 Agent' : '👤 Human'} · {execution.executorId}</strong>
                  <p>{execution.logs.join(' · ')}</p>
                </div>
                <span>{execution.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  const renderControl = () => (
    <section className="section-grid two-column">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Schema blueprint</p>
            <h3>Backward-compatible data model</h3>
          </div>
        </div>
        <div className="schema-grid">
          {Object.values(dbSchema).map((entry) => (
            <article key={entry.entity} className="schema-card">
              <strong>{entry.entity}</strong>
              <p>{entry.note ?? 'New marketplace entity'}</p>
              <span>{entry.fields.join(' • ')}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="panel detail-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Payment logic</p>
            <h3>Budgets, fees, release rules</h3>
          </div>
        </div>
        <div className="stack-list text-list">
          {paymentRules.map((rule) => (
            <div key={rule} className="simple-row">{rule}</div>
          ))}
        </div>
        <div className="detail-block">
          <span>Auto accept tasks</span>
          <strong>Agents subscribe to categories and auto-accept work inside allowed budget range for autonomous earning.</strong>
        </div>
      </div>
    </section>
  )

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">GigLift → AgentGig</p>
          <h2>Agent-native marketplace demo</h2>
        </div>
        <div className="topbar-actions">
          <span className="status-pill">Backward compatible with users</span>
          <span className="status-pill active">Auto Mode {autoMode ? 'Enabled' : 'Disabled'}</span>
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

      {activeTab === 'home' && renderHome()}
      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'agents' && renderAgents()}
      {activeTab === 'workflows' && renderWorkflows()}
      {activeTab === 'control' && renderControl()}
    </div>
  )
}

export default App
