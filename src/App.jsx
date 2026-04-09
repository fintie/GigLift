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
    title: 'Landing page redesign for AI bookkeeping startup',
    budget: '$320',
    type: 'Instant Match',
    level: 'Level 2+',
    eta: 'Starts in 8 min',
    category: 'Design',
  },
  {
    title: '3 ad creatives for a skincare launch',
    budget: '$90',
    type: 'Rush Board',
    level: 'Level 1+',
    eta: 'Due today',
    category: 'Ads',
  },
  {
    title: 'Brand kit contest for a Web3 events app',
    budget: '$650',
    type: 'Contest',
    level: 'Level 2+',
    eta: '3 days left',
    category: 'Branding',
  },
  {
    title: 'Pitch deck cleanup for seed round intro',
    budget: '$140',
    type: 'Rush Board',
    level: 'Level 1+',
    eta: 'Due tomorrow',
    category: 'Presentation',
  },
  {
    title: 'UGC edit pack for wellness app ads',
    budget: '$220',
    type: 'Instant Match',
    level: 'Level 2+',
    eta: 'Starts in 20 min',
    category: 'Video',
  },
  {
    title: 'Homepage hero refresh for Shopify brand',
    budget: '$180',
    type: 'Rush Board',
    level: 'Level 1+',
    eta: 'Due in 6 hours',
    category: 'Design',
  },
]

const freelancers = [
  {
    name: 'Mia Carter',
    role: 'Brand Designer',
    score: '4.9',
    jobs: 48,
    badge: 'Streak x12',
    level: 'Level 3',
    city: 'Sydney',
    earnings: '$8.4k',
  },
  {
    name: 'Noah Lee',
    role: 'Landing Page Builder',
    score: '4.8',
    jobs: 31,
    badge: 'Top Closer',
    level: 'Level 2',
    city: 'Melbourne',
    earnings: '$5.9k',
  },
  {
    name: 'Ava Brooks',
    role: 'UGC Video Editor',
    score: '5.0',
    jobs: 22,
    badge: 'Rising Star',
    level: 'Level 2',
    city: 'Brisbane',
    earnings: '$4.7k',
  },
  {
    name: 'Leo Walker',
    role: 'Ad Creative Designer',
    score: '4.7',
    jobs: 67,
    badge: 'Elite Pro',
    level: 'Level 3',
    city: 'Perth',
    earnings: '$11.3k',
  },
  {
    name: 'Zoe Patel',
    role: 'Social Design Specialist',
    score: '4.9',
    jobs: 19,
    badge: 'Fast Replies',
    level: 'Level 1',
    city: 'Adelaide',
    earnings: '$2.6k',
  },
  {
    name: 'Kai Morgan',
    role: 'Pitch Deck Designer',
    score: '4.8',
    jobs: 27,
    badge: 'Client Favorite',
    level: 'Level 2',
    city: 'Auckland',
    earnings: '$6.2k',
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

const navItems = [
  ['overview', 'Overview'],
  ['marketplace', 'Marketplace'],
  ['dashboard', 'Dashboard'],
  ['growth', 'Growth'],
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

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = useMemo(() => ['All', ...new Set(jobs.map((job) => job.category))], [])

  const visibleJobs = useMemo(() => {
    if (activeCategory === 'All') return jobs
    return jobs.filter((job) => job.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="page-shell">
      <header id="overview" className="hero-card">
        <nav className="topbar">
          <div className="brand">
            <div className="brand-mark">G</div>
            <div>
              <strong>GigLift</strong>
              <p>Fast freelance work, leveled up</p>
            </div>
          </div>
          <div className="nav-actions">
            {navItems.map(([href, label]) => (
              <a key={href} href={`#${href}`}>
                {label}
              </a>
            ))}
            <button type="button">Launch demo</button>
          </div>
        </nav>

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
              <button type="button">Explore jobs</button>
              <button type="button" className="ghost-button">
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

      <main>
        <section id="marketplace" className="content-card">
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
              <article key={job.title} className="job-card">
                <span>{job.type}</span>
                <h3>{job.title}</h3>
                <p>{job.level}</p>
                <div className="job-meta">
                  <strong>{job.budget}</strong>
                  <small>{job.eta}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="dashboard" className="content-card">
          <SectionTitle
            eyebrow="Freelancer dashboard"
            title="A dashboard that feels alive, not empty"
            text="The prototype includes realistic earnings, dispatch stats, referral progress, and live activity so the platform feels launch-ready."
          />
          <div className="dashboard-grid">
            <div className="stats-grid">
              {dashboardStats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <small>{stat.note}</small>
                </article>
              ))}
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
          </div>
        </section>

        <section id="levels" className="content-card split-layout">
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
            <span className="side-label">Today&apos;s quests</span>
            <h3>Gamified loops that keep freelancers active</h3>
            <ul className="quest-list">
              {quests.map((quest) => (
                <li key={quest}>{quest}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="content-card">
          <SectionTitle
            eyebrow="Mock talent"
            title="Showcase realistic freelancer activity from day one"
            text="The demo includes mocked freelancers, ratings, badges, city tags, and earnings snapshots so the marketplace already feels populated."
          />
          <div className="freelancer-grid">
            {freelancers.map((freelancer) => (
              <article key={freelancer.name} className="freelancer-card">
                <div className="avatar">{freelancer.name.charAt(0)}</div>
                <div>
                  <h3>{freelancer.name}</h3>
                  <p>{freelancer.role}</p>
                </div>
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

        <section id="growth" className="content-card split-layout">
          <div>
            <SectionTitle
              eyebrow="Growth loop"
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
      </main>
    </div>
  )
}

export default App
