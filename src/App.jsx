import { useMemo, useState } from 'react'
import './index.css'

const tabs = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'services', label: 'Services', icon: '▦' },
  { id: 'activity', label: 'Activity', icon: '◷' },
  { id: 'profile', label: 'My Profile', icon: '◎' },
]

const services = [
  { id: 'logo', title: 'Logo', badge: 'Hot', icon: '✦', desc: 'Brand identity and quick logo jobs' },
  { id: 'uiux', title: 'UI/UX', badge: 'Fast', icon: '◫', desc: 'App screens and product design work' },
  { id: 'video', title: 'Video', badge: 'New', icon: '▶', desc: 'UGC edits, reels, and launch videos' },
  { id: 'dev', title: 'Dev', badge: 'Pro', icon: '</>', desc: 'React, Shopify, and product builds' },
  { id: 'ads', title: 'Ads', badge: '30%', icon: '◉', desc: 'Meta ads and creative testing packs' },
  { id: 'deck', title: 'Pitch Deck', badge: 'Rush', icon: '▣', desc: 'Investor decks and sales presentations' },
  { id: '3d', title: '3D', badge: 'Beta', icon: '◇', desc: 'Motion scenes and product visualization' },
  { id: 'ugc', title: 'UGC', badge: 'Promo', icon: '☻', desc: 'Creator-first short-form ad content' },
]

const jobs = [
  { id: 1, title: 'AI startup landing page redesign', client: 'Orbitly', price: '$320', eta: '13 min', level: 'Lvl 2+', tag: 'Instant Match', category: 'uiux', online: true, description: 'Redesign hero, pricing, and mobile flow for an AI bookkeeping startup.', ctas: ['Accept now', 'Save for later'] },
  { id: 2, title: '3 Meta ad creatives for skincare brand', client: 'Veloura', price: '$90', eta: 'Today', level: 'Lvl 1+', tag: 'Rush', category: 'ads', online: true, description: 'Create static ad variations with premium beauty direction and stronger CTA hooks.', ctas: ['Bid now', 'Message client'] },
  { id: 3, title: 'React homepage build for SaaS launch', client: 'Northlane AI', price: '$420', eta: '8 hrs', level: 'Lvl 2+', tag: 'Featured', category: 'dev', online: true, description: 'Build responsive marketing homepage from Figma with polished sections and motion.', ctas: ['Apply', 'See requirements'] },
  { id: 4, title: 'UGC edit pack for wellness app', client: 'Calma', price: '$220', eta: '6 hrs', level: 'Lvl 1+', tag: 'Popular', category: 'video', online: false, description: 'Turn raw creator clips into paid social edits with subtitles and hooks.', ctas: ['Join waitlist', 'View brief'] },
  { id: 5, title: 'Investor pitch deck cleanup', client: 'SeedLoop', price: '$140', eta: 'Tomorrow', level: 'Lvl 1+', tag: 'Rush', category: 'deck', online: true, description: 'Tighten typography, improve charts, and polish a 12-slide fundraise deck.', ctas: ['Take task', 'Preview slides'] },
]

const benefits = [
  { id: 'plus', title: 'GigLift Plus', text: 'Lower fees, priority matching, early payouts, and premium client access.' },
  { id: 'missions', title: 'Daily missions', text: 'Complete tasks to unlock XP, points, referral boosts, and extra exposure.' },
  { id: 'invite', title: 'Invite rewards', text: 'Bring in friends, earn cash credits, and climb the ranking leaderboard faster.' },
]

const activitySeed = [
  { id: 1, title: 'Rush job unlocked', note: 'You are eligible for 3 new ad creative jobs.', action: 'View jobs' },
  { id: 2, title: 'Referral bonus pending', note: 'Invite 1 more friend to unlock +500 points.', action: 'Invite now' },
  { id: 3, title: 'Membership perk ready', note: 'Your early payout feature can be activated today.', action: 'Activate' },
]

const profileCards = [
  { id: 'points', label: 'Points', value: '12,480', detail: 'Redeem boosts, featured placement, and client unlocks.' },
  { id: 'tasks', label: 'Open tasks', value: '06', detail: 'Daily missions, membership checks, and profile boosts.' },
  { id: 'invites', label: 'Invites', value: '18', detail: 'Track accepted invites, rewards, and pending bonuses.' },
  { id: 'membership', label: 'Rank', value: '#24', detail: 'Leaderboard position based on completed gigs and streak.' },
]

const serviceProviders = {
  logo: [
    { id: 'l1', name: 'MarkStudio', meta: 'Logo systems · 4.9', note: 'Minimal brand systems for SaaS and creator brands.' },
    { id: 'l2', name: 'MonoMark', meta: 'Fast turnaround · 4.8', note: 'Sharp monograms and icon-first startup logos.' },
  ],
  uiux: [
    { id: 'u1', name: 'PixelOrbit', meta: 'Mobile UX · 5.0', note: 'High-conversion app flows and polished UI kits.' },
    { id: 'u2', name: 'FrameLab', meta: 'Product design · 4.9', note: 'Figma systems, dashboards, and onboarding revamps.' },
  ],
  video: [
    { id: 'v1', name: 'CutHouse', meta: 'UGC edits · 4.9', note: 'Performance-driven shorts and launch edits.' },
    { id: 'v2', name: 'MotionPort', meta: 'Brand video · 4.8', note: 'Premium product cuts and social campaign motion.' },
  ],
  dev: [
    { id: 'd1', name: 'LaunchStack', meta: 'React builds · 5.0', note: 'Fast landing pages and frontend product builds.' },
    { id: 'd2', name: 'ShipLab', meta: 'MVP delivery · 4.9', note: 'Startup web apps with strong execution speed.' },
  ],
  ads: [
    { id: 'a1', name: 'ScaleMedia', meta: 'Meta ads · 4.9', note: 'Creative testing systems for DTC brands.' },
    { id: 'a2', name: 'HookPilot', meta: 'Paid social · 4.8', note: 'Performance ad angles and conversion hooks.' },
  ],
  deck: [
    { id: 'p1', name: 'PitchCraft', meta: 'Investor decks · 4.9', note: 'Fundraise storylines with cleaner slides.' },
    { id: 'p2', name: 'SlideSprint', meta: 'Sales decks · 4.7', note: 'Fast polish for enterprise and startup decks.' },
  ],
  '3d': [
    { id: 't1', name: 'RenderClub', meta: '3D product scenes · 4.8', note: 'Glossy product renders and launch loops.' },
    { id: 't2', name: 'DepthLab', meta: 'Motion 3D · 4.7', note: 'Animated hero scenes and campaign visuals.' },
  ],
  ugc: [
    { id: 'g1', name: 'CreatorFlow', meta: 'UGC creators · 4.9', note: 'Authentic talking-head and lifestyle content.' },
    { id: 'g2', name: 'TrendSprint', meta: 'TikTok-first · 4.8', note: 'Hooky vertical content built for ads.' },
  ],
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedService, setSelectedService] = useState('all')
  const [selectedJobId, setSelectedJobId] = useState(1)
  const [selectedBenefit, setSelectedBenefit] = useState('plus')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activity, setActivity] = useState(activitySeed)
  const [toast, setToast] = useState('Ready to move faster on GigLift')
  const [taskStarted, setTaskStarted] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [selectedProfileCard, setSelectedProfileCard] = useState('points')
  const [savedJobs, setSavedJobs] = useState([])
  const [serviceDetailId, setServiceDetailId] = useState(null)

  const visibleJobs = useMemo(() => {
    const byCategory = selectedService === 'all' ? jobs : jobs.filter((job) => job.category === selectedService)
    const byQuery = searchQuery.trim()
      ? byCategory.filter((job) => `${job.title} ${job.client}`.toLowerCase().includes(searchQuery.toLowerCase()))
      : byCategory
    return byQuery
  }, [selectedService, searchQuery])

  const selectedJob = visibleJobs.find((job) => job.id === selectedJobId) || visibleJobs[0] || jobs[0]
  const activeBenefit = benefits.find((item) => item.id === selectedBenefit) || benefits[0]
  const activeProfileCard = profileCards.find((card) => card.id === selectedProfileCard) || profileCards[0]
  const activeService = services.find((item) => item.id === serviceDetailId)
  const activeProviders = serviceDetailId ? serviceProviders[serviceDetailId] || [] : []

  const pushToast = (message) => setToast(message)

  const openService = (serviceId) => {
    setSelectedService(serviceId)
    setServiceDetailId(serviceId === 'all' ? null : serviceId)
    setActiveTab('services')
    const service = services.find((item) => item.id === serviceId)
    pushToast(service ? `Opened ${service.title} section` : 'Showing all services')
  }

  const openJob = (jobId) => {
    setSelectedJobId(jobId)
    setActiveTab('home')
    const job = jobs.find((item) => item.id === jobId)
    if (job) pushToast(`Opened ${job.client} brief`)
  }

  const runJobAction = (action) => {
    const job = selectedJob
    if (!job) return

    if (action === 'Save for later') {
      setSavedJobs((prev) => (prev.includes(job.id) ? prev : [...prev, job.id]))
      pushToast(`Saved ${job.title}`)
      return
    }

    if (action === 'Message client') {
      setActiveTab('activity')
      pushToast(`Opened client thread for ${job.client}`)
      return
    }

    pushToast(`${action} on ${job.client}`)
    setActivity((prev) => [{ id: Date.now(), title: action, note: `${job.title} is now in your workflow.`, action: 'Review' }, ...prev])
  }

  const onSearchFocus = () => {
    setSearchOpen(true)
    setActiveTab('home')
    pushToast('Search opened')
  }

  const onPostJob = () => {
    setActiveTab('services')
    setSelectedService('all')
    setServiceDetailId(null)
    pushToast('Post job flow opened')
  }

  const onSeeAll = () => {
    setActiveTab('services')
    setServiceDetailId(null)
    pushToast('Viewing all live services and jobs')
  }

  const onBenefitClick = (id) => {
    setSelectedBenefit(id)
    pushToast(`Opened ${benefits.find((b) => b.id === id)?.title}`)
  }

  const onStartTask = () => {
    setTaskStarted(true)
    setActiveTab('activity')
    pushToast('Daily task started, progress added to Activity')
  }

  const onViewDashboard = () => {
    setDashboardOpen((prev) => !prev)
    pushToast(dashboardOpen ? 'Dashboard summary hidden' : 'Dashboard summary opened')
  }

  const onProfileCardClick = (id) => {
    setSelectedProfileCard(id)
    pushToast(`Opened ${profileCards.find((card) => card.id === id)?.label}`)
  }

  const openServicePage = (serviceId) => {
    setSelectedService(serviceId)
    setServiceDetailId(serviceId)
    setActiveTab('services')
    const service = services.find((item) => item.id === serviceId)
    if (service) pushToast(`Entered ${service.title} page`)
  }

  const onActivityAction = (item) => {
    pushToast(`${item.action} triggered`)
    if (item.action === 'View jobs') setActiveTab('home')
    if (item.action === 'Invite now') setActiveTab('profile')
  }

  return (
    <div className="app uber-theme">
      <div className="phone-shell">
        <header className="top-strip">
          <div>
            <p className="eyebrow">GigLift</p>
            <h1>Move fast, hire faster</h1>
          </div>
          <button className="verified-chip" onClick={() => pushToast('Verified account details opened')}>
            <span className="verified-icon">✓</span>
            Verified
          </button>
        </header>

        <div className="toast-bar">{toast}</div>

        {activeTab === 'home' && (
          <>
            <section className="search-hero">
              <div className="search-row">
                <button className="search-bar interactive" onClick={onSearchFocus}>
                <span className="search-icon">⌕</span>
                <span>{searchQuery || 'Where to? Search jobs, talent, or services'}</span>
                <span className="later-pill">Search</span>
                </button>
                <button className="primary-cta search-post" onClick={onPostJob}>Post a job</button>
              </div>

              {searchOpen && (
                <div className="search-panel">
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search Orbitly, UI/UX, ads..."
                  />
                  <div className="quick-actions">
                    <button onClick={() => setSearchQuery('design')}>Design</button>
                    <button onClick={() => setSearchQuery('ads')}>Ads</button>
                    <button onClick={() => setSearchQuery('React')}>React</button>
                    <button onClick={() => { setSearchQuery(''); setSearchOpen(false); pushToast('Search cleared') }}>Clear</button>
                  </div>
                </div>
              )}

            </section>

            <section className="tile-section">
              <div className="section-head">
                <h3>For you</h3>
                <button className="ghost-link" onClick={() => openService('all')}>All categories</button>
              </div>

              <div className="service-grid">
                {services.map((tile) => (
                  <button key={tile.id} className={selectedService === tile.id ? 'service-card active-card' : 'service-card'} onClick={() => openServicePage(tile.id)}>
                    <span className="tile-badge">{tile.badge}</span>
                    <div className="tile-icon">{tile.icon}</div>
                    <strong>{tile.title}</strong>
                  </button>
                ))}
              </div>
            </section>

            <section className="job-section">
              <div className="section-head">
                <div>
                  <h3>Online jobs</h3>
                  <span>{visibleJobs.length} briefs ready right now</span>
                </div>
                <button className="ghost-link" onClick={onSeeAll}>See all</button>
              </div>

              <div className="job-list">
                {visibleJobs.map((job) => (
                  <button key={job.id} className={selectedJob?.id === job.id ? 'job-card active-card' : 'job-card'} onClick={() => openJob(job.id)}>
                    <div className="job-badges">
                      <span className="job-tag">{job.tag}</span>
                      <span className="live-dot">{job.online ? '● Online' : '○ Offline'}</span>
                    </div>
                    <h4>{job.title}</h4>
                    <p>{job.client} · {services.find((item) => item.id === job.category)?.title || job.category}</p>
                    <div className="job-meta">
                      <span>{job.price}</span>
                      <span>{job.eta}</span>
                      <span>{job.level}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedJob && (
                <div className="detail-card">
                  <div className="section-head compact">
                    <div>
                      <h3>{selectedJob.client}</h3>
                      <span>{selectedJob.description}</span>
                    </div>
                    <button className="ghost-link" onClick={() => runJobAction('Save for later')}>
                      {savedJobs.includes(selectedJob.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>
                  <div className="quick-actions">
                    {selectedJob.ctas.map((action) => (
                      <button key={action} onClick={() => runJobAction(action)}>{action}</button>
                    ))}
                  </div>
                </div>
              )}
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
                  <button key={item.id} className={selectedBenefit === item.id ? 'benefit-card active-card' : 'benefit-card'} onClick={() => onBenefitClick(item.id)}>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>

              <div className="detail-card">
                <div className="section-head compact">
                  <div>
                    <h3>{activeBenefit.title}</h3>
                    <span>{activeBenefit.text}</span>
                  </div>
                  <button className="primary-cta small" onClick={() => pushToast(`${activeBenefit.title} activated`)}>Use now</button>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'services' && (
          <section className="tab-section">
            {serviceDetailId ? (
              <>
                <div className="section-head">
                  <div>
                    <h3>{activeService?.title}</h3>
                    <span>{activeService?.desc}</span>
                  </div>
                  <button className="ghost-link" onClick={() => { setServiceDetailId(null); setSelectedService('all'); pushToast('Back to services') }}>Back</button>
                </div>

                <div className="provider-hero">
                  <div>
                    <p className="section-label">Top service providers</p>
                    <strong>{activeProviders[0]?.name || 'Featured provider'}</strong>
                    <p>{activeProviders[0]?.meta || 'High quality delivery'} · {activeProviders[0]?.note || ''}</p>
                  </div>
                  <button className="primary-cta small" onClick={() => pushToast('Provider contact opened')}>Contact</button>
                </div>

                <div className="provider-list">
                  {activeProviders.map((provider) => (
                    <button key={provider.id} className="row-card" onClick={() => pushToast(`Opened ${provider.name} profile`)}>
                      <div>
                        <strong>{provider.name}</strong>
                        <p>{provider.meta}</p>
                        <p>{provider.note}</p>
                      </div>
                      <span className="job-tag">View</span>
                    </button>
                  ))}
                </div>

                <div className="detail-card">
                  <div className="section-head compact">
                    <div>
                      <h3>Open briefs in {activeService?.title}</h3>
                      <span>Jump straight into matching work from this provider page.</span>
                    </div>
                    <button className="ghost-link" onClick={() => { setActiveTab('home'); pushToast('Opened matching jobs on Home') }}>Open jobs</button>
                  </div>
                  <div className="quick-actions">
                    {jobs.filter((job) => job.category === serviceDetailId).map((job) => (
                      <button key={job.id} onClick={() => openJob(job.id)}>{job.client}</button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="section-head">
                  <div>
                    <h3>Services</h3>
                    <span>Pick a category and go directly into its provider page</span>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {activeTab === 'activity' && (
          <section className="tab-section">
            <div className="section-head">
              <div>
                <h3>Activity</h3>
                <span>Everything you started, saved, or unlocked</span>
              </div>
              <button className="ghost-link" onClick={() => { setActivity(activitySeed); pushToast('Activity refreshed') }}>Refresh</button>
            </div>

            <div className="activity-list">
              {activity.map((item) => (
                <article key={item.id} className="row-card static-card">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.note}</p>
                  </div>
                  <button className="ghost-light" onClick={() => onActivityAction(item)}>{item.action}</button>
                </article>
              ))}
            </div>

            {taskStarted && (
              <div className="detail-card success-card">
                <strong>Daily mission in progress</strong>
                <p>Complete 2 rush jobs to unlock +800 XP and a featured profile boost.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'profile' && (
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
              <button className="ghost-light" onClick={onViewDashboard}>{dashboardOpen ? 'Hide dashboard' : 'View dashboard'}</button>
            </div>

            <div className="profile-grid">
              {profileCards.map((card) => (
                <button key={card.id} className={selectedProfileCard === card.id ? 'profile-stat active-card' : 'profile-stat'} onClick={() => onProfileCardClick(card.id)}>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </button>
              ))}
            </div>

            <div className="detail-card">
              <div className="section-head compact">
                <div>
                  <h3>{activeProfileCard.label}</h3>
                  <span>{activeProfileCard.detail}</span>
                </div>
                <button className="primary-cta small" onClick={() => pushToast(`${activeProfileCard.label} tools opened`)}>Manage</button>
              </div>
            </div>

            <div className="mission-panel">
              <div>
                <p className="section-label">Today’s task</p>
                <strong>Complete 2 rush jobs to unlock +800 XP</strong>
              </div>
              <button className="primary-cta small" onClick={onStartTask}>{taskStarted ? 'In progress' : 'Start task'}</button>
            </div>

            {dashboardOpen && (
              <div className="detail-card">
                <strong>Dashboard summary</strong>
                <p>Saved jobs: {savedJobs.length} · Active filter: {selectedService === 'all' ? 'All' : services.find((item) => item.id === selectedService)?.title} · Search: {searchQuery || 'None'}</p>
                <div className="quick-actions">
                  <button onClick={() => pushToast('Invite link copied')}>Invite friends</button>
                  <button onClick={() => pushToast('Membership upgraded preview opened')}>Upgrade membership</button>
                  <button onClick={() => pushToast('Points redemption sheet opened')}>Redeem points</button>
                </div>
              </div>
            )}
          </section>
        )}

        <nav className="bottom-nav">
          {tabs.map((item) => (
            <button key={item.id} className={item.id === activeTab ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveTab(item.id); pushToast(`Opened ${item.label}`) }}>
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
