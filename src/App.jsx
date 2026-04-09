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
    scope: ['Hero redesign', 'Pricing section cleanup', 'Mobile responsiveness pass'],
    deliverables: ['Figma file', 'Responsive landing page mockups', 'Design notes for developer handoff'],
    stack: ['Figma', 'SaaS', 'Conversion design'],
    status: 'Reviewing proposals',
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
    scope: ['3 static concepts', '1 revised final direction', 'Export pack for Meta ads'],
    deliverables: ['1080x1350 exports', 'Editable source file', 'CTA copy suggestions'],
    stack: ['Meta ads', 'Photoshop', 'Beauty brand creative'],
    status: 'Awaiting designer match',
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
    scope: ['Logo direction', 'Color and typography system', 'Social starter pack'],
    deliverables: ['Primary logo', 'Brand guide', '6 social post templates'],
    stack: ['Brand identity', 'Startup branding', 'Web3'],
    status: 'Contest live',
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
    scope: ['12-slide cleanup', 'Chart readability refresh', 'Visual consistency pass'],
    deliverables: ['Updated deck', 'Master slide system', 'Investor-ready export'],
    stack: ['Pitch decks', 'PowerPoint', 'Fundraising'],
    status: 'Shortlisting freelancers',
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
    scope: ['5 short-form edits', 'Subtitle styling', 'Hook testing variations'],
    deliverables: ['5 vertical exports', 'Caption suggestions', 'Thumbnail frames'],
    stack: ['Premiere Pro', 'UGC editing', 'Paid social'],
    status: 'Matched',
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
    scope: ['Hero section redesign', 'CTA improvement', 'Premium ecom mood direction'],
    deliverables: ['Desktop + mobile concept', 'Source file', 'Visual notes'],
    stack: ['Shopify', 'Ecommerce', 'Homepage design'],
    status: 'New rush brief',
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
    avatar: 'MC',
    accent: 'violet',
    responseTime: 'Replies in 2 min',
    availability: 'Available now',
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
    avatar: 'NL',
    accent: 'cyan',
    responseTime: 'Replies in 6 min',
    availability: 'In a project, free tomorrow',
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
    avatar: 'AB',
    accent: 'pink',
    responseTime: 'Replies in 4 min',
    availability: 'Available for rush work',
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
    avatar: 'LW',
    accent: 'gold',
    responseTime: 'Replies in 9 min',
    availability: 'Booked this afternoon',
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
    avatar: 'ZP',
    accent: 'green',
    responseTime: 'Replies in 3 min',
    availability: 'Available now',
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
    avatar: 'KM',
    accent: 'blue',
    responseTime: 'Replies in 5 min',
    availability: 'Available this evening',
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

const liveMetrics = [
  { label: 'Active briefs', value: '24', note: '6 need responses in the next hour' },
  { label: 'Designers online', value: '83', note: '17 currently marked available now' },
  { label: 'Avg first reply', value: '4 min', note: 'Faster than last week by 18%' },
  { label: 'Jobs funded today', value: '$12.8k', note: 'Across rush, contest, and direct invite flows' },
]

const liveTimeline = [
  { time: '22:04', event: 'Orbitly opened 3 proposals for landing page redesign', tag: 'Client review' },
  { time: '22:01', event: 'Mia Carter accepted a rush brand polish request', tag: 'Matched' },
  { time: '21:57', event: 'Calma funded a new UGC edit pack', tag: 'Funded' },
  { time: '21:54', event: 'Zoe Patel replied to a startup ad creative brief', tag: 'Message sent' },
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

const testimonials = [
  {
    quote: 'GigLift feels like Upwork if it actually understood speed and startup urgency.',
    name: 'Sophie Tran',
    title: 'Founder, Orbitly',
  },
  {
    quote: 'The leveling and rush system makes the marketplace feel alive instead of empty.',
    name: 'Jayden Cole',
    title: 'Creative Lead, Veloura',
  },
  {
    quote: 'This is the first freelance concept that feels like a product, not a directory.',
    name: 'Nina Park',
    title: 'Angel Investor',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    note: 'For new freelancers entering the system',
    features: ['Basic profile', 'Rush Board access', 'Referral rewards'],
  },
  {
    name: 'Pro',
    price: '$29/mo',
    note: 'For active freelancers who want priority visibility',
    features: ['Priority matching', 'Lower fees', 'Advanced analytics'],
  },
  {
    name: 'Studio',
    price: '$99/mo',
    note: 'For small teams and top-tier operators',
    features: ['Team workspace', 'Client vault', 'Premium lead access'],
  },
]

const onboardingSteps = [
  {
    title: 'Create your profile',
    text: 'Set category, level, city, and portfolio direction in under 3 minutes.',
  },
  {
    title: 'Unlock your first jobs',
    text: 'Start with fast-turn work and build your level through delivery quality and speed.',
  },
  {
    title: 'Grow through referrals',
    text: 'Invite clients and freelancers to build points, badges, boosts, and ranking momentum.',
  },
]

const pages = [
  ['home', 'Overview'],
  ['jobs', 'Jobs'],
  ['freelancers', 'Freelancers'],
  ['job-detail', 'Job Detail'],
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
              The outsourcing platform that blends Uber speed, Upwork trust, and gamified growth loops.
            </h1>
            <p>
              GigLift is built for freelancers who want to pull jobs fast, level up through completed work,
              and grow through referrals, streaks, badges, and leaderboard momentum.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => onOpenPage('jobs')}>
                Explore jobs
              </button>
              <button type="button" className="ghost-button" onClick={() => onOpenPage('job-detail')}>
                Open job detail
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

      <section className="content-card">
        <SectionTitle
          eyebrow="Onboarding"
          title="A lighter first-run experience for new freelancers"
          text="This makes the product easier to imagine as a real onboarding system rather than just a static showcase."
        />
        <div className="three-grid">
          {onboardingSteps.map((step) => (
            <article key={step.title} className="feature-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card">
        <SectionTitle
          eyebrow="Social proof"
          title="Add founder and investor reactions to make it pitch-ready"
          text="These mocked testimonials help the prototype feel closer to a launch deck or investor-facing product walkthrough."
        />
        <div className="three-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="feature-card quote-card">
              <p>“{item.quote}”</p>
              <div>
                <strong>{item.name}</strong>
                <small>{item.title}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function JobsPage({ onOpenPage, onSelectJob, selectedJobId }) {
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
          <article key={job.id} className={job.id === selectedJobId ? 'job-card detail-card selected-card' : 'job-card detail-card'}>
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
            <div className="meta-row">
              <small>{job.status}</small>
              <small>{job.category}</small>
            </div>
            <div className="card-actions">
              <button
                type="button"
                className="inline-button"
                onClick={() => {
                  onSelectJob(job.id)
                  onOpenPage('job-detail')
                }}
              >
                View details
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function FreelancersPage({ selectedFreelancerId, onSelectFreelancer }) {
  const selectedFreelancer = freelancers.find((item) => item.id === selectedFreelancerId) || freelancers[0]
  const [messageSent, setMessageSent] = useState(false)

  return (
    <section className="content-card split-layout freelancers-layout">
      <div>
        <SectionTitle
          eyebrow="Mock talent"
          title="Freelancer profiles with selection and contact flow"
          text="This now behaves more like a real marketplace. You can browse talent, select a profile, and open a lightweight message flow."
        />
        <div className="freelancer-grid">
          {freelancers.map((freelancer) => (
            <article
              key={freelancer.id}
              className={freelancer.id === selectedFreelancerId ? 'freelancer-card selected-card' : 'freelancer-card'}
              onClick={() => {
                onSelectFreelancer(freelancer.id)
                setMessageSent(false)
              }}
            >
              <div className={`avatar photo-avatar avatar-${freelancer.accent}`}>{freelancer.avatar}</div>
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
      </div>

      <aside className="side-panel contact-panel">
        <span className="side-label">Selected freelancer</span>
        <div className="contact-header">
          <div className={`avatar photo-avatar large-avatar avatar-${selectedFreelancer.accent}`}>{selectedFreelancer.avatar}</div>
          <div>
            <h3>{selectedFreelancer.name}</h3>
            <p>{selectedFreelancer.role}</p>
          </div>
        </div>

        <ul className="quest-list compact-list">
          <li>{selectedFreelancer.availability}</li>
          <li>{selectedFreelancer.responseTime}</li>
          <li>{selectedFreelancer.level} • {selectedFreelancer.city}</li>
        </ul>

        <div className="form-row">
          <label>Message</label>
          <div className="fake-input large-input">
            Hi {selectedFreelancer.name.split(' ')[0]}, I&apos;m looking for help on a fast-moving startup brief. Are you available to take a design task this week?
          </div>
        </div>

        <div className="hero-actions">
          <button type="button" onClick={() => setMessageSent(true)}>
            Send message
          </button>
          <button type="button" className="ghost-button">
            Save shortlist
          </button>
        </div>

        {messageSent && (
          <div className="success-box">
            Message sent to {selectedFreelancer.name}. Expected reply: {selectedFreelancer.responseTime.toLowerCase()}.
          </div>
        )}
      </aside>
    </section>
  )
}

function JobDetailPage({ selectedJob, onOpenPage }) {
  const [proposalSent, setProposalSent] = useState(false)

  return (
    <section className="content-card split-layout">
      <div>
        <SectionTitle
          eyebrow="Job detail"
          title={selectedJob.title}
          text={selectedJob.brief}
        />

        <div className="detail-summary-grid">
          <article className="feature-card">
            <span>{selectedJob.type}</span>
            <h3>{selectedJob.budget}</h3>
            <p>{selectedJob.client}</p>
          </article>
          <article className="feature-card">
            <span>Experience</span>
            <h3>{selectedJob.level}</h3>
            <p>{selectedJob.eta}</p>
          </article>
          <article className="feature-card">
            <span>Category</span>
            <h3>{selectedJob.category}</h3>
            <p>{selectedJob.stack.join(' · ')}</p>
          </article>
        </div>

        <div className="detail-panels">
          <article className="feature-card">
            <h3>Scope</h3>
            <ul>
              {selectedJob.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="feature-card">
            <h3>Deliverables</h3>
            <ul>
              {selectedJob.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      <aside className="side-panel apply-panel">
        <span className="side-label">Apply flow</span>
        <h3>Send a proposal in under 2 minutes</h3>

        <div className="form-row">
          <label>Your pitch</label>
          <div className="fake-input large-input">
            I can redesign this landing page with a stronger conversion hierarchy, cleaner pricing section,
            and mobile-first polish. I&apos;d deliver the first pass within 24 hours.
          </div>
        </div>

        <div className="form-row two-up">
          <div>
            <label>Timeline</label>
            <div className="fake-input">24 hours</div>
          </div>
          <div>
            <label>Bid amount</label>
            <div className="fake-input">{selectedJob.budget}</div>
          </div>
        </div>

        <div className="form-row">
          <label>Portfolio highlight</label>
          <div className="fake-input">SaaS landing page redesign, +22% trial CTA clicks</div>
        </div>

        <div className="hero-actions">
          <button type="button" onClick={() => setProposalSent(true)}>
            Submit proposal
          </button>
          <button type="button" className="ghost-button" onClick={() => onOpenPage('jobs')}>
            Back to jobs
          </button>
        </div>

        {proposalSent && (
          <div className="success-box">
            Proposal sent. Client response estimate: within 18 minutes.
          </div>
        )}
      </aside>
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
    <>
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

      <section className="content-card">
        <SectionTitle
          eyebrow="Plans"
          title="Optional pricing layers for future monetization"
          text="This gives the product a clearer business model if you want to pitch it as more than just a marketplace."
        />
        <div className="three-grid">
          {pricingPlans.map((plan) => (
            <article key={plan.name} className="feature-card pricing-card">
              <span>{plan.name}</span>
              <h3>{plan.price}</h3>
              <p>{plan.note}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function ReferralsPage() {
  return (
    <section className="content-card split-layout">
      <div>
        <SectionTitle
          eyebrow="Referral center"
          title="Referral rewards designed for freelancers and clients"
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

function LiveMarketplacePanel({ selectedJob, selectedFreelancer }) {
  return (
    <section className="content-card live-marketplace-shell">
      <div>
        <SectionTitle
          eyebrow="Live marketplace"
          title="A more realistic operations panel"
          text="Instead of generic showcase copy, this area now reads like an actual marketplace control surface with jobs, availability, and recent activity."
        />
        <div className="live-metrics-grid">
          {liveMetrics.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.note}</small>
            </article>
          ))}
        </div>
      </div>

      <div className="live-marketplace-grid">
        <article className="activity-card panel-card">
          <span className="side-label">Recent system activity</span>
          <h3>Timeline</h3>
          <div className="timeline-feed">
            {liveTimeline.map((item) => (
              <div key={`${item.time}-${item.event}`} className="timeline-feed-row">
                <strong>{item.time}</strong>
                <div>
                  <p>{item.event}</p>
                  <small>{item.tag}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="activity-card panel-card">
          <span className="side-label">Selected job</span>
          <h3>{selectedJob.title}</h3>
          <div className="panel-stack">
            <div className="meta-row">
              <small>{selectedJob.client}</small>
              <small>{selectedJob.status}</small>
            </div>
            <div className="meta-row">
              <strong>{selectedJob.budget}</strong>
              <small>{selectedJob.eta}</small>
            </div>
            <ul className="quest-list compact-list">
              {selectedJob.scope.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="activity-card panel-card">
          <span className="side-label">Selected freelancer</span>
          <h3>{selectedFreelancer.name}</h3>
          <div className="contact-header compact-contact-header">
            <div className={`avatar photo-avatar avatar-${selectedFreelancer.accent}`}>{selectedFreelancer.avatar}</div>
            <div>
              <p>{selectedFreelancer.role}</p>
              <small>{selectedFreelancer.availability}</small>
            </div>
          </div>
          <ul className="quest-list compact-list">
            <li>{selectedFreelancer.responseTime}</li>
            <li>{selectedFreelancer.level} • {selectedFreelancer.city}</li>
            <li>{selectedFreelancer.jobs} jobs completed • {selectedFreelancer.score} ★</li>
          </ul>
        </article>
      </div>
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedJobId, setSelectedJobId] = useState(1)
  const [selectedFreelancerId, setSelectedFreelancerId] = useState(1)
  const selectedJob = jobs.find((job) => job.id === selectedJobId) || jobs[0]
  const selectedFreelancer = freelancers.find((item) => item.id === selectedFreelancerId) || freelancers[0]

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
      {activePage === 'jobs' && (
        <JobsPage onOpenPage={setActivePage} onSelectJob={setSelectedJobId} selectedJobId={selectedJobId} />
      )}
      {activePage === 'freelancers' && (
        <FreelancersPage selectedFreelancerId={selectedFreelancerId} onSelectFreelancer={setSelectedFreelancerId} />
      )}
      {activePage === 'job-detail' && <JobDetailPage selectedJob={selectedJob} onOpenPage={setActivePage} />}
      {activePage === 'post-job' && <PostJobPage />}
      {activePage === 'membership' && <MembershipPage />}
      {activePage === 'referrals' && <ReferralsPage />}

      <LiveMarketplacePanel selectedJob={selectedJob} selectedFreelancer={selectedFreelancer} />

      <section className="content-card dashboard-grid">
        <div>
          <SectionTitle
            eyebrow="Marketplace energy"
            title="Ongoing progress, rewards, and platform activity"
            text="This lower section still keeps the product feeling alive, but now sits behind a more realistic live operations panel."
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
