import { useMemo, useState } from 'react'
import './index.css'

const freelancerLevels = [
  {
    name: 'Level 1 Explorer',
    xp: '0-250 XP',
    focus: 'Small quick-turn jobs',
    perks: ['Up to 5 active bids', 'Rush Board access', 'Starter badge pack'],
  },
  {
    name: 'Level 2 Operator',
    xp: '250-900 XP',
    focus: 'Higher value client work',
    perks: ['Instant Match priority', 'Lower platform fee', 'Team invites'],
  },
  {
    name: 'Level 3 Pro',
    xp: '900+ XP',
    focus: 'Premium retainers and studio tools',
    perks: ['VIP client pool', 'Custom storefront', 'Early payout access'],
  },
]

const jobs = [
  {
    id: 1,
    title: 'Landing page redesign for AI bookkeeping startup',
    budget: '$320',
    type: 'Instant Match',
    level: 'Level 2+',
    eta: 'Starts in 8 min',
    category: 'Design',
    client: 'Orbitly',
    brief: 'Need a cleaner hero, pricing block refresh, and mobile-first polish for investor traffic.',
  },
  {
    id: 2,
    title: '3 ad creatives for a skincare launch',
    budget: '$90',
    type: 'Rush Board',
    level: 'Level 1+',
    eta: 'Due today',
    category: 'Ads',
    client: 'Veloura',
    brief: 'Meta-ready static creatives for a weekend promotion with soft luxury visual language.',
  },
  {
    id: 3,
    title: 'Brand kit contest for a Web3 events app',
    budget: '$650',
    type: 'Contest',
    level: 'Level 2+',
    eta: '3 days left',
    category: 'Branding',
    client: 'BlockWave',
    brief: 'Create a flexible visual system with logo, colors, and social post templates.',
  },
  {
    id: 4,
    title: 'Pitch deck cleanup for seed round intro',
    budget: '$140',
    type: 'Rush Board',
    level: 'Level 1+',
    eta: 'Due tomorrow',
    category: 'Presentation',
    client: 'Northlane AI',
    brief: 'Tighten typography, improve chart readability, and bring slides into one cohesive system.',
  },
  {
    id: 5,
    title: 'UGC edit pack for wellness app ads',
    budget: '$220',
    type: 'Instant Match',
    level: 'Level 2+',
    eta: 'Starts in 20 min',
    category: 'Video',
    client: 'Calma',
    brief: 'Turn raw mobile footage into five punchy paid social edits with hooks and subtitles.',
  },
  {
    id: 6,
    title: 'Homepage hero refresh for Shopify brand',
    budget: '$180',
    type: 'Rush Board',
    level: 'Level 1+',
    eta: 'Due in 6 hours',
    category: 'Design',
    client: 'Nori Home',
    brief: 'Create a cleaner premium hero section with stronger conversion focus and clearer CTA hierarchy.',
  },
]

const freelancers = [
  {
    id: 1,
    name: 'Mia Carter',
    role: 'Brand Designer',
    score: '4.9',
    jobs: 48,
    badge: 'Streak x12',
    level: 'Level 3',
    city: 'Sydney',
    earnings: '$8.4k',
    headline: 'Fast identity systems for startup launches and product refreshes.',
  },
  {
    id: 2,
    name: 'Noah Lee',
    role: 'Landing Page Builder',
    score: '4.8',
    jobs: 31,
    badge: 'Top Closer',
    level: 'Level 2',
    city: 'Melbourne',
    earnings: '$5.9k',
    headline: 'Converts messy startup messaging into clean, high-performing web flows.',
  },
  {
    id: 3,
    name: 'Ava Brooks',
    role: 'UGC Video Editor',
    score: '5.0',
    jobs: 22,
    badge: 'Rising Star',
    level: 'Level 2',
    city: 'Brisbane',
    earnings: '$4.7k',
    headline: 'Short-form edits built for paid social and founder-led brands.',
  },
  {
    id: 4,
    name: 'Leo Walker',
    role: 'Ad Creative Designer',
    score: '4.7',
    jobs: 67,
    badge: 'Elite Pro',
    level: 'Level 3',
    city: 'Perth',
    earnings: '$11.3k',
    headline: 'High-volume ad systems for brands that test weekly and scale aggressively.',
  },
  {
    id: 5,
    name: 'Zoe Patel',
    role: 'Social Design Specialist',
    score: '4.9',
    jobs: 19,
    badge: 'Fast Replies',
    level: 'Level 1',
    city: 'Adelaide',
    earnings: '$2.6k',
    headline: 'Social packs, carousels, and launch visuals with tight turnaround.',
  },
  {
    id: 6,
    name: 'Kai Morgan',
    role: 'Pitch Deck Designer',
    score: '4.8',
    jobs: 27,
    badge: 'Client Favorite',
    level: 'Level 2',
    city: 'Auckland',
    earnings: '$6.2k',
    headline: 'Investor-ready decks that make strategy and traction easier to understand.',
  },
]

const quests = [
  'Complete 1 rush job today for +40 XP',
  'Invite 2 freelancers and unlock a Boost token',
  'Keep your reply time under 3 minutes for +25 XP',
]

const leaderboard = [
  { name: 'Ava Brooks', xp: '1,820 XP', reward: '$120 Boost credit' },
  { name: 'Mia Carter', xp: '1,640 XP', reward: '$80 Boost credit' },
  { name: 'Leo Walker', xp: '1,410 XP', reward: 'Featured profile slot' },
]

const dashboardStats = [
  { label: 'Monthly earnings', value: '$4,780', note: '+18% vs last month' },
  { label: 'Rush acceptance rate', value: '92%', note: 'Top 12% this week' },
  { label: 'Referral points', value: '2,480', note: '2 boosts available' },
  { label: 'Client satisfaction', value: '4.9/5', note: '14 recent reviews' },
]

const activityFeed = [
  'New client from referral: Orbitly funded a $180 landing page refresh.',
  'Level up progress: 2 more completed jobs to unlock Level 2 Operator.',
  'Weekly mission unlocked: finish 3 rush jobs for a 0.5% fee discount.',
  'Leaderboard jump: Mia Carter moved up 3 positions after a repeat client order.',
]

const referrals = [
  {
    title: 'Invite a freelancer',
    reward: '+120 points',
    detail: 'Bonus triggers after profile verification and first completed job.',
  },
  {
    title: 'Invite a client',
    reward: '+200 points',
    detail: 'Unlocked when the referred client funds their first task or contest.',
  },
  {
    title: 'Weekly team race',
    reward: 'Boost x3',
    detail: 'Top referral chain wins homepage exposure and faster payouts.',
  },
]

const clientSteps = [
  'Client picks rush job, contest, or direct invite flow',
  'Platform suggests matched freelancers by level and response speed',
  'Job gets accepted, tracked, and rewarded with XP and loyalty points',
]

const pages = [
  ['home', 'Overview'],
  ['jobs', 'Jobs'],
  ['freelancers', 'Freelancers'],
  ['post-job', 'Post a Job'],
  ['membership', 'Membership'],
  ['referrals', 'Referral Center'],
]

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function HomePage({ onOpenPage }) {
  return (
    <>
      <header className="hero-card">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="pill">Design-first freelance marketplace</span>
            <h1>
              The outsourcing platform that blends Uber speed, Upwork trust, and Temu-style growth.
            </h1>
            <p>
              GigLift is built for freelancers who want to pull jobs fast, level up through completed work,
              and grow through referrals, streaks, badges, and leaderboard momentum.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => onOpenPage('jobs')}>
                Explore jobs
              </button>
              <button type="button" className="ghost-button" onClick={() => onOpenPage('freelancers')}>
                View freelancer flow
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <strong>1.2k+</strong>
                <span>mocked freelancers</span>
              </div>
              <div>
                <strong>320</strong>
                <span>active jobs simulated</span>
              </div>
              <div>
                <strong>97%</strong>
                <span>instant reply benchmark</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-card pulse">
              <div>
                <span>Live dispatch</span>
                <strong>New rush job in Sydney</strong>
              </div>
              <b>$140</b>
            </div>
            <div className="mini-card gradient-card">
              <span>XP progress</span>
              <strong>Level 2 unlock in 2 jobs</strong>
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
              <small>185 / 250 XP</small>
            </div>
            <div className="mini-card grid-two">
              <div>
                <span>Referral chain</span>
                <strong>+420 points</strong>
              </div>
              <div>
                <span>Weekly rank</span>
                <strong>#08</strong>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="content-card split-layout">
        <div>
          <SectionTitle
            eyebrow="Client journey"
            title="A flow that sells speed, clarity, and progress"
            text="Instead of a cold directory, GigLift guides clients into the right hiring mode and keeps freelancers moving with clear progression."
          />
          <div className="timeline-list">
            {clientSteps.map((step, index) => (
              <div key={step} className="timeline-item">
                <b>0{index + 1}</b>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="side-panel">
          <span className="side-label">Today&apos;s quests</span>
          <h3>Gamified loops that keep freelancers active</h3>
          <ul className="quest-list">
            {quests.map((quest) => (
              <li key={quest}>{quest}</li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  )
}

function JobsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(jobs.map((job) => job.category))], [])
  const visibleJobs = useMemo(() => {
    if (activeCategory === 'All') return jobs
    return jobs.filter((job) => job.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="content-card">
      <SectionTitle
        eyebrow="Marketplace"
        title="Fast job flows for modern freelancers"
        text="Mix instant dispatch, open rush board jobs, and curated contests so clients can hire in the way that fits the task."
      />
      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={category === activeCategory ? 'filter-chip active-chip' : 'filter-chip'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="job-grid">
        {visibleJobs.map((job) => (
          <article key={job.id} className="job-card detail-card">
            <span>{job.type}</span>
            <h3>{job.title}</h3>
            <p>{job.brief}</p>
            <div className="meta-row">
              <small>{job.client}</small>
              <small>{job.level}</small>
            </div>
            <div className="job-meta">
              <strong>{job.budget}</strong>
              <small>{job.eta}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FreelancersPage() {
  return (
    <section className="content-card">
      <SectionTitle
        eyebrow="Mock talent"
        title="Freelancer profiles with enough depth to feel real"
        text="The demo includes realistic freelancer snapshots, location tags, earnings, and positioning so client-side matching looks believable."
      />
      <div className="freelancer-grid">
        {freelancers.map((freelancer) => (
          <article key={freelancer.id} className="freelancer-card">
            <div className="avatar">{freelancer.name.charAt(0)}</div>
            <div>
              <h3>{freelancer.name}</h3>
              <p>{freelancer.role}</p>
            </div>
            <p>{freelancer.headline}</p>
            <div className="freelancer-meta">
              <strong>{freelancer.score} ★</strong>
              <small>{freelancer.jobs} jobs completed</small>
            </div>
            <div className="meta-row">
              <small>{freelancer.level}</small>
              <small>{freelancer.city}</small>
            </div>
            <div className="meta-row">
              <span className="badge">{freelancer.badge}</span>
              <small>{freelancer.earnings}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PostJobPage() {
  return (
    <section className="content-card split-layout">
      <div>
        <SectionTitle
          eyebrow="Post a job"
          title="A simple client flow instead of a giant form"
          text="This page shows how clients could choose job mode, set a budget, and get matched fast without the platform feeling heavy."
        />
        <div className="form-card">
          <div className="form-row">
            <label>Job title</label>
            <div className="fake-input">Design 5 static ads for a mobile fintech app</div>
          </div>
          <div className="form-row two-up">
            <div>
              <label>Job mode</label>
              <div className="fake-input">Rush Board</div>
            </div>
            <div>
              <label>Budget</label>
              <div className="fake-input">$150 - $250</div>
            </div>
          </div>
          <div className="form-row">
            <label>Creative brief</label>
            <div className="fake-input large-input">
              Need performance-focused ad creatives with a clean premium feel and fast turnaround.
            </div>
          </div>
          <div className="hero-actions">
            <button type="button">Publish job</button>
            <button type="button" className="ghost-button">
              Save draft
            </button>
          </div>
        </div>
      </div>
      <aside className="side-panel">
        <span className="side-label">Suggested matches</span>
        <h3>Freelancers ready right now</h3>
        <ul className="quest-list">
          <li>Mia Carter, Level 3, replies in 2 min</li>
          <li>Zoe Patel, Level 1, available for rush work</li>
          <li>Leo Walker, Level 3, strong ad testing experience</li>
        </ul>
      </aside>
    </section>
  )
}

function MembershipPage() {
  return (
    <section className="content-card split-layout">
      <div>
        <SectionTitle
          eyebrow="Membership"
          title="Free to start, unlocked by proof of work"
          text="New freelancers enter as Level 1 and unlock better jobs, lower fees, and better distribution as they complete work and maintain quality."
        />
        <div className="levels-list">
          {freelancerLevels.map((level) => (
            <article key={level.name} className="level-card">
              <span>{level.xp}</span>
              <h3>{level.name}</h3>
              <p>{level.focus}</p>
              <ul>
                {level.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <aside className="side-panel">
        <span className="side-label">Freelancer dashboard</span>
        <h3>Progress that encourages action</h3>
        <div className="stats-grid single-column-grid">
          {dashboardStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.note}</small>
            </article>
          ))}
        </div>
      </aside>
    </section>
  )
}

function ReferralsPage() {
  return (
    <section className="content-card split-layout">
      <div>
        <SectionTitle
          eyebrow="Referral center"
          title="Temu-inspired referrals, tuned for freelancers and clients"
          text="Users climb faster by inviting new clients and freelancers, earning points when referrals sign up, verify, land jobs, or spend on the platform."
        />
        <div className="growth-grid">
          {referrals.map((item) => (
            <article key={item.title}>
              <span>{item.title}</span>
              <strong>{item.reward}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <aside className="side-panel leaderboard-panel">
        <span className="side-label">This week</span>
        <h3>Top climbers</h3>
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <div key={entry.name} className="leaderboard-row">
              <b>#{index + 1}</b>
              <div>
                <strong>{entry.name}</strong>
                <span>{entry.xp}</span>
              </div>
              <small>{entry.reward}</small>
            </div>
          ))}
        </div>
      </aside>
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('home')

  return (
    <div className="page-shell">
      <nav className="topbar app-nav">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <strong>GigLift</strong>
            <p>Fast freelance work, leveled up</p>
          </div>
        </div>
        <div className="nav-actions">
          {pages.map(([pageId, label]) => (
            <button
              key={pageId}
              type="button"
              className={activePage === pageId ? 'nav-tab active-tab' : 'nav-tab'}
              onClick={() => setActivePage(pageId)}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {activePage === 'home' && <HomePage onOpenPage={setActivePage} />}
      {activePage === 'jobs' && <JobsPage />}
      {activePage === 'freelancers' && <FreelancersPage />}
      {activePage === 'post-job' && <PostJobPage />}
      {activePage === 'membership' && <MembershipPage />}
      {activePage === 'referrals' && <ReferralsPage />}

      <section className="content-card dashboard-grid">
        <div>
          <SectionTitle
            eyebrow="Live dashboard"
            title="A marketplace demo with motion, status, and energy"
            text="This lower panel keeps the prototype feeling active with mocked live updates, progress indicators, and earnings snapshots."
          />
          <div className="stats-grid">
            {dashboardStats.map((stat) => (
              <article key={stat.label} className="stat-card">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.note}</small>
              </article>
            ))}
          </div>
        </div>
        <div className="activity-card">
          <span className="side-label">Live activity</span>
          <h3>Momentum feed</h3>
          <ul className="activity-list">
            {activityFeed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App
