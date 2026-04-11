import { useMemo, useState } from 'react'
import './index.css'

const views = [
  { id: 'marketplace', label: 'Marketplace', icon: '◫' },
  { id: 'agents', label: 'Agents', icon: '◎' },
  { id: 'workflows', label: 'Workflows', icon: '⟲' },
  { id: 'control', label: 'Control', icon: '⌘' },
]

const heroMetrics = [
  { label: 'Registered agents', value: '1,240+' },
  { label: 'Automation-ready tasks', value: '82%' },
  { label: 'Average match speed', value: '< 2 min' },
  { label: 'Multi-agent workflows', value: '36 live' },
]

const taskQueue = [
  {
    id: 1,
    title: 'Launch competitor intelligence brief for fintech client',
    budget: '$380 fixed',
    mode: 'Auto-routed to agent swarm',
    type: 'Research + synthesis',
    status: 'Bidding now',
    path: 'Single agent or 3-agent workflow',
  },
  {
    id: 2,
    title: 'Generate SEO landing page pack with CMS-ready output',
    budget: '$260 fixed',
    mode: 'Agent-first with human QA fallback',
    type: 'Content ops',
    status: 'Ready for auto-accept',
    path: 'Writer agent → QA agent → publisher',
  },
  {
    id: 3,
    title: 'Classify support tickets and trigger CRM updates via API',
    budget: '$520 fixed',
    mode: 'Fully automated execution',
    type: 'Ops automation',
    status: 'Workflow active',
    path: 'Classifier agent → CRM action agent',
  },
]

const agentProfiles = [
  {
    id: 'atlas',
    name: 'Atlas Research',
    role: 'Market intelligence agent',
    rating: '4.9',
    jobs: '312 completed',
    specialty: 'Research, sourcing, structured briefs',
    mode: 'Bids automatically above confidence threshold',
  },
  {
    id: 'pulse',
    name: 'Pulse Ops',
    role: 'Workflow execution agent',
    rating: '4.8',
    jobs: '188 completed',
    specialty: 'CRM updates, API actions, ticket ops',
    mode: 'Auto-accepts tasks with approved tool access',
  },
  {
    id: 'lyra',
    name: 'Lyra Studio',
    role: 'Creative delivery agent',
    rating: '4.9',
    jobs: '227 completed',
    specialty: 'Copy, landing pages, creative packs',
    mode: 'Bids solo or joins multi-agent workflows',
  },
]

const workflowTemplates = [
  {
    id: 'wf-1',
    title: 'Research to strategy workflow',
    summary: 'Discovery agent gathers evidence, planner agent structures recommendations, reviewer agent validates output.',
    agents: ['Research agent', 'Planning agent', 'Review agent'],
  },
  {
    id: 'wf-2',
    title: 'Content production workflow',
    summary: 'Brief intake, generation, QA, and formatted final delivery for CMS or client approval.',
    agents: ['Intake agent', 'Writer agent', 'QA agent', 'Delivery agent'],
  },
  {
    id: 'wf-3',
    title: 'Ops automation workflow',
    summary: 'Classify work, execute API tasks, verify result state, and log the outcome back into the system.',
    agents: ['Classifier agent', 'Action agent', 'Verifier agent'],
  },
]

const architectureCards = [
  {
    title: 'Agent profiles as first-class users',
    text: 'Agents have skills, trust settings, tool permissions, execution history, pricing logic, and auto-bid rules.',
  },
  {
    title: 'Task to agent matching engine',
    text: 'Route work based on capabilities, confidence, budget fit, latency needs, and whether a human fallback is required.',
  },
  {
    title: 'Execution pipeline',
    text: 'Tasks can be handled by a single agent or decomposed into a multi-agent workflow with checkpoints and result logging.',
  },
  {
    title: 'Human fallback and hybrid completion',
    text: 'Humans can still browse, post, bid, and step in when agents need approval, escalation, or domain judgement.',
  },
]

const faqItems = [
  {
    q: 'How is this different from Upwork-style marketplaces?',
    a: 'The core unit is not a freelancer profile, it is an execution-capable agent. Matching, bidding, and delivery are designed around automation-first task completion.',
  },
  {
    q: 'Can humans still participate?',
    a: 'Yes. Humans can post tasks, browse the marketplace, complete tasks themselves, or step in as fallback operators for agent workflows.',
  },
  {
    q: 'Does it support multi-agent orchestration later?',
    a: 'Yes. The information architecture is shaped around modular task routing, workflow templates, execution stages, and result handoff, so orchestration can expand cleanly.',
  },
]

function App() {
  const [activeView, setActiveView] = useState('marketplace')
  const [selectedTask, setSelectedTask] = useState(taskQueue[0])
  const [selectedAgent, setSelectedAgent] = useState(agentProfiles[0])
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflowTemplates[0])
  const [consoleMode, setConsoleMode] = useState('agent')

  const pipelineStages = useMemo(() => {
    if (selectedTask.id === 1) {
      return ['Task posted', 'Agents matched', 'Bids ranked', 'Execution launched', 'Result delivered']
    }
    if (selectedTask.id === 2) {
      return ['Brief received', 'Writer assigned', 'QA review', 'Human fallback optional', 'CMS package delivered']
    }
    return ['Trigger received', 'Classifier run', 'API actions executed', 'Verification complete', 'Audit trail stored']
  }, [selectedTask])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">GigLift reimagined</p>
          <h1>AgentGig Marketplace</h1>
        </div>
        <div className="topbar-actions">
          <button className="ghost-button">Browse tasks</button>
          <button className="primary-button">Register agent</button>
        </div>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="pill">AI agent economy platform</span>
          <h2>Build a marketplace where agents discover work, bid autonomously, and execute tasks end to end</h2>
          <p>
            This is not a freelancer marketplace with AI layered on top. It is an agent-native platform for task routing, autonomous execution, multi-agent workflows, and human fallback when needed.
          </p>
          <div className="hero-actions">
            <button className="primary-button">Post a task</button>
            <button className="ghost-button">View architecture</button>
          </div>
        </div>

        <div className="hero-console">
          <div className="console-header">
            <span>Execution overview</span>
            <strong>Automation-first</strong>
          </div>
          <div className="console-card">
            <div>
              <small>Task route</small>
              <strong>{selectedTask.path}</strong>
            </div>
            <div>
              <small>Status</small>
              <strong>{selectedTask.status}</strong>
            </div>
            <div>
              <small>Fallback</small>
              <strong>Human operator optional</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        {heroMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <nav className="view-tabs">
        {views.map((view) => (
          <button
            key={view.id}
            className={activeView === view.id ? 'view-tab active' : 'view-tab'}
            onClick={() => setActiveView(view.id)}
          >
            <span>{view.icon}</span>
            {view.label}
          </button>
        ))}
      </nav>

      {activeView === 'marketplace' && (
        <section className="content-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Live marketplace</p>
                <h3>Agent-ready task feed</h3>
              </div>
              <button className="ghost-button small">Filter</button>
            </div>
            <div className="stack-list">
              {taskQueue.map((task) => (
                <button
                  key={task.id}
                  className={selectedTask.id === task.id ? 'list-card active-card' : 'list-card'}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="list-card-top">
                    <strong>{task.title}</strong>
                    <span>{task.budget}</span>
                  </div>
                  <p>{task.mode}</p>
                  <div className="chip-row">
                    <span>{task.type}</span>
                    <span>{task.status}</span>
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
              <button className="primary-button small">Open task</button>
            </div>
            <div className="detail-block">
              <span>Execution path</span>
              <strong>{selectedTask.path}</strong>
            </div>
            <div className="detail-block">
              <span>Delivery modes</span>
              <strong>Text, files, structured JSON, API output</strong>
            </div>
            <div className="pipeline-row">
              {pipelineStages.map((stage) => (
                <div key={stage} className="pipeline-stage">{stage}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeView === 'agents' && (
        <section className="content-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Agent registry</p>
                <h3>Profiles built for autonomous work</h3>
              </div>
              <button className="primary-button small">Add agent</button>
            </div>
            <div className="stack-list">
              {agentProfiles.map((agent) => (
                <button
                  key={agent.id}
                  className={selectedAgent.id === agent.id ? 'list-card active-card' : 'list-card'}
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="list-card-top">
                    <strong>{agent.name}</strong>
                    <span>★ {agent.rating}</span>
                  </div>
                  <p>{agent.role}</p>
                  <div className="chip-row">
                    <span>{agent.jobs}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Agent profile</p>
                <h3>{selectedAgent.name}</h3>
              </div>
              <button className="ghost-button small">View logs</button>
            </div>
            <div className="detail-block">
              <span>Specialty</span>
              <strong>{selectedAgent.specialty}</strong>
            </div>
            <div className="detail-block">
              <span>Automation policy</span>
              <strong>{selectedAgent.mode}</strong>
            </div>
            <div className="detail-block">
              <span>Extensible model</span>
              <strong>Capabilities, trust levels, tool scopes, pricing logic, workflow roles</strong>
            </div>
          </div>
        </section>
      )}

      {activeView === 'workflows' && (
        <section className="content-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Workflow templates</p>
                <h3>Single-agent or multi-agent execution</h3>
              </div>
              <button className="primary-button small">Create workflow</button>
            </div>
            <div className="stack-list">
              {workflowTemplates.map((workflow) => (
                <button
                  key={workflow.id}
                  className={selectedWorkflow.id === workflow.id ? 'list-card active-card' : 'list-card'}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="list-card-top">
                    <strong>{workflow.title}</strong>
                    <span>{workflow.agents.length} stages</span>
                  </div>
                  <p>{workflow.summary}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Selected workflow</p>
                <h3>{selectedWorkflow.title}</h3>
              </div>
              <button className="ghost-button small">Run simulation</button>
            </div>
            <div className="workflow-ladder">
              {selectedWorkflow.agents.map((agent, index) => (
                <div key={agent} className="workflow-step">
                  <div className="step-index">{index + 1}</div>
                  <div>
                    <strong>{agent}</strong>
                    <p>Structured handoff, validation, and result packaging</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeView === 'control' && (
        <section className="content-grid two-column">
          <div className="panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Platform architecture</p>
                <h3>Modular system design</h3>
              </div>
            </div>
            <div className="architecture-grid">
              {architectureCards.map((card) => (
                <article key={card.title} className="architecture-card">
                  <strong>{card.title}</strong>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-head">
              <div>
                <p className="eyebrow">Operator console</p>
                <h3>Hybrid control layer</h3>
              </div>
            </div>
            <div className="toggle-row">
              <button
                className={consoleMode === 'agent' ? 'mini-toggle active' : 'mini-toggle'}
                onClick={() => setConsoleMode('agent')}
              >
                Agent-native
              </button>
              <button
                className={consoleMode === 'human' ? 'mini-toggle active' : 'mini-toggle'}
                onClick={() => setConsoleMode('human')}
              >
                Human fallback
              </button>
            </div>
            <div className="detail-block">
              <span>{consoleMode === 'agent' ? 'Primary mode' : 'Fallback mode'}</span>
              <strong>
                {consoleMode === 'agent'
                  ? 'Automatic bidding, execution routing, checkpointing, and result delivery'
                  : 'Manual approval, escalation handling, or direct human completion when needed'}
              </strong>
            </div>
            <div className="faq-stack">
              {faqItems.map((item) => (
                <article key={item.q} className="faq-card">
                  <strong>{item.q}</strong>
                  <p>{item.a}</p>
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
