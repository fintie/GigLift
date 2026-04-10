import { useMemo, useState } from 'react'
import './index.css'

const bottomNav = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'services', label: 'Services', icon: '▦' },
  { id: 'activity', label: 'Activity', icon: '◷' },
  { id: 'profile', label: 'My Profile', icon: '◎' },
]

const serviceTiles = [
  { title: 'Logo', badge: 'Hot', icon: '✦' },
  { title: 'UI/UX', badge: 'Fast', icon: '◫' },
  { title: 'Video', badge: 'New', icon: '▶' },
  { title: 'Dev', badge: 'Pro', icon: '</>' },
  { title: 'Ads', badge: '30%', icon: '◉' },
  { title: 'Pitch Deck', badge: 'Rush', icon: '▣' },
  { title: '3D', badge: 'Beta', icon: '◇' },
  { title: 'UGC', badge: 'Promo', icon: '☻' },
]

const jobs = [
  {
    id: 1,
    title: 'AI startup landing page redesign',
    client: 'Orbitly',
    price: '$320',
    eta: '13 min',
    level: 'Lvl 2+',
    tag: 'Instant Match',
    category: 'Design',
    online: true,
  },
  {
    id: 2,
    title: '3 Meta ad creatives for skincare brand',
    client: 'Veloura',
    price: '$90',
    eta: 'Today',
    level: 'Lvl 1+',
    tag: 'Rush',
    category: 'Ads',
    online: true,
  },
  {
    id: 3,
    title: 'React homepage build for SaaS launch',
    client: 'Northlane AI',
    price: '$420',
    eta: '8 hrs',
    level: 'Lvl 2+',
    tag: 'Featured',
    category: 'Dev',
    online: true,
  },
  {
    id: 4,
    title: 'UGC edit pack for wellness app',
    client: 'Calma',
    price: '$220',
    eta: '6 hrs',
    level: 'Lvl 1+',
    tag: 'Popular',
    category: 'Video',
    online: false,
  },
]

const benefits = [
  {
    title: 'GigLift Plus',
    text: 'Lower fees, priority distribution, early payouts, and premium client access.',
  },
  {
    title: 'Daily missions',
    text: 'Finish tasks to unlock XP, points, referral boosts, and better visibility.',
  },
  {
    title: 'Invite rewards',
    text: 'Bring in friends, earn cash credits, and climb the ranking leaderboard faster.',
  },
]

const profileCards = [
  { label: 'Points', value: '12,480' },
  { label: 'Open tasks', value: '06' },
  { label: 'Invites', value: '18' },
  { label: 'Rank', value: '#24' },
]

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const activeJobs = useMemo(() => jobs.filter((job) => job.online), [])

  return (
    <div className="app uber-theme">
      <div className="phone-shell">
        <header className="top-strip">
          <div>
            <p className="eyebrow">GigLift</p>
            <h1>Move fast, hire faster</h1>
          </div>
          <div className="verified-chip">
            <span className="verified-icon">✓</span>
            Verified
          </div>
        </header>

        <section className="search-hero">
          <div className="search-bar">
            <span className="search-icon">⌕</span>
            <span>Where to? Search jobs, talent, or services</span>
            <button className="later-pill">Later</button>
          </div>

          <div className="hero-copy">
            <div>
              <p className="section-label">For you</p>
              <h2>Uber-style freelance home, rebuilt for GigLift</h2>
            </div>
            <button className="primary-cta">Post a job</button>
          </div>
        </section>

        <section className="tile-section">
          <div className="section-head">
            <h3>For you</h3>
            <span>Recommended categories</span>
          </div>

          <div className="service-grid">
            {serviceTiles.map((tile) => (
              <article key={tile.title} className="service-card">
                <span className="tile-badge">{tile.badge}</span>
                <div className="tile-icon">{tile.icon}</div>
                <strong>{tile.title}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="job-section">
          <div className="section-head">
            <div>
              <h3>Online jobs</h3>
              <span>Live briefs ready to accept</span>
            </div>
            <button className="ghost-link">See all</button>
          </div>

          <div className="job-list">
            {activeJobs.map((job) => (
              <article key={job.id} className="job-card">
                <div className="job-badges">
                  <span className="job-tag">{job.tag}</span>
                  <span className="live-dot">● Online</span>
                </div>
                <h4>{job.title}</h4>
                <p>{job.client} · {job.category}</p>
                <div className="job-meta">
                  <span>{job.price}</span>
                  <span>{job.eta}</span>
                  <span>{job.level}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="benefit-section">
          <div className="section-head">
            <div>
              <h3>Member benefits</h3>
              <span>Membership, rewards, and progression</span>
            </div>
          </div>

          <div className="benefit-list">
            {benefits.map((item) => (
              <article key={item.title} className="benefit-card">
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <div className="section-head">
            <div>
              <h3>My Profile</h3>
              <span>Points, tasks, invites, membership</span>
            </div>
            <div className="profile-badge">Lvl 2 Creator</div>
          </div>

          <div className="profile-hero">
            <div className="avatar-wrap">
              <div className="avatar">GL</div>
              <div>
                <strong>Fintie Studio</strong>
                <p>Verified seller · 4.9 rating</p>
              </div>
            </div>
            <button className="ghost-light">View dashboard</button>
          </div>

          <div className="profile-grid">
            {profileCards.map((card) => (
              <article key={card.label} className="profile-stat">
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </article>
            ))}
          </div>

          <div className="mission-panel">
            <div>
              <p className="section-label">Today’s task</p>
              <strong>Complete 2 rush jobs to unlock +800 XP</strong>
            </div>
            <button className="primary-cta small">Start task</button>
          </div>
        </section>

        <nav className="bottom-nav">
          {bottomNav.map((item) => (
            <button
              key={item.id}
              className={item.id === activeTab ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab(item.id)}
            >
              <span>{item.icon}</span>
              <small>{item.label}</small>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default App
