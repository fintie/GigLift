import { useEffect, useMemo, useState } from 'react'
import './index.css'

const navItems = [
  { id: 'home', label: 'Overview', icon: '⌂' },
  { id: 'jobs', label: 'Jobs', icon: '⚡' },
  { id: 'freelancers', label: 'Talent', icon: '◉' },
  { id: 'job-detail', label: 'Spotlight', icon: '▣' },
  { id: 'post-job', label: 'Post', icon: '✎' },
  { id: 'membership', label: 'Plans', icon: '◆' },
  { id: 'referrals', label: 'Rewards', icon: '✦' },
]

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
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=420&q=80',
    discipline: 'Designer',
    responseTime: 'Replies in 2 min',
    availability: 'Available now',
    status: 'online',
    skills: ['Brand systems', 'Figma', 'Landing pages'],
    portfolio: [
      {
        title: 'Orbitly brand refresh',
        type: 'Design system',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        summary: 'Refined SaaS visual identity, homepage hero, and onboarding assets for investor demos.',
      },
      {
        title: 'Northlane investor deck',
        type: 'Presentation design',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
        summary: 'Rebuilt a 14-slide fundraising narrative with clearer data storytelling and premium layout.',
      },
      {
        title: 'Veloura ad creative pack',
        type: 'Paid social',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
        summary: 'Produced test-ready creative variations for Meta and TikTok campaigns.',
      },
    ],
  },
  {
    id: 2,
    name: 'Noah Lee',
    role: 'Frontend Developer',
    score: '4.8',
    jobs: 31,
    badge: 'Top Closer',
    level: 'Level 2',
    city: 'Melbourne',
    earnings: '$5.9k',
    headline: 'Converts messy startup messaging into clean, high-performing web flows.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=420&q=80',
    discipline: 'Developer',
    responseTime: 'Replies in 6 min',
    availability: 'In a project, free tomorrow',
    status: 'away',
    skills: ['React', 'Vite', 'Animation'],
    portfolio: [
      {
        title: 'SaaS landing page build',
        type: 'React + motion',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
        summary: 'Implemented a conversion-focused homepage with modular sections and polished interactions.',
      },
      {
        title: 'Client dashboard UI',
        type: 'Product frontend',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        summary: 'Shipped dashboard tables, usage charts, and auth states for a B2B product.',
      },
      {
        title: 'Freelancer profile app',
        type: 'Prototype engineering',
        image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80',
        summary: 'Built an interactive profile flow with stateful filtering and mock API integration.',
      },
    ],
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
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=420&q=80',
    discipline: 'Designer',
    responseTime: 'Replies in 4 min',
    availability: 'Available for rush work',
    status: 'online',
    skills: ['Short-form video', 'Hooks', 'Paid social'],
    portfolio: [
      {
        title: 'Calma ad edit pack',
        type: 'UGC editing',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
        summary: 'Created five mobile-first ad cuts with hook variations and subtitle systems.',
      },
      {
        title: 'Creator launch montage',
        type: 'Social campaign',
        image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80',
        summary: 'Blended raw creator footage into launch-day edits optimized for conversion.',
      },
    ],
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
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=420&q=80',
    discipline: 'Designer',
    responseTime: 'Replies in 9 min',
    availability: 'Booked this afternoon',
    status: 'busy',
    skills: ['Ads', 'Performance creative', 'Testing systems'],
    portfolio: [
      {
        title: 'Skincare launch ads',
        type: 'Creative testing set',
        image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
        summary: 'Scaled an ad library for weekly testing across acquisition funnels.',
      },
      {
        title: 'DTC seasonal campaign',
        type: 'Creative direction',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
        summary: 'Built modular campaign creative for paid social and landing page alignment.',
      },
    ],
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
    avatarUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=420&q=80',
    discipline: 'Designer',
    responseTime: 'Replies in 3 min',
    availability: 'Available now',
    status: 'online',
    skills: ['Launch graphics', 'Carousels', 'Brand visuals'],
    portfolio: [
      {
        title: 'Startup waitlist launch',
        type: 'Social package',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80',
        summary: 'Delivered launch visuals, story variants, and countdown assets in one rush pack.',
      },
      {
        title: 'Carousel series',
        type: 'Content design',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
        summary: 'Turned founder notes into clean educational carousel templates.',
      },
    ],
  },
  {
    id: 6,
    name: 'Kai Morgan',
    role: 'Product Developer',
    score: '4.8',
    jobs: 27,
    badge: 'Client Favorite',
    level: 'Level 2',
    city: 'Auckland',
    earnings: '$6.2k',
    headline: 'Investor-ready decks that make strategy and traction easier to understand.',
    avatarUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=420&q=80',
    discipline: 'Developer',
    responseTime: 'Replies in 5 min',
    availability: 'Available this evening',
    status: 'online',
    skills: ['Product engineering', 'APIs', 'Dashboard UI'],
    portfolio: [
      {
        title: 'Founder analytics dashboard',
        type: 'Full-stack prototype',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80',
        summary: 'Connected backend metrics to a clean web UI for weekly investor updates.',
      },
      {
        title: 'Marketplace dispatch logic',
        type: 'Frontend systems',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        summary: 'Built simulated dispatch, status badges, and talent filtering for a hiring platform.',
      },
    ],
  },
]

const defaultMessages = {
  1: [
    { id: 1, author: 'Orbitly', text: 'We need a premium landing page refresh for an AI bookkeeping startup.', time: '21:58' },
  ],
  2: [{ id: 1, author: 'Northlane AI', text: 'Would you be open to a homepage redesign later this week?', time: '20:44' }],
  3: [{ id: 1, author: 'Calma', text: 'Need 5 quick UGC edits for wellness ads. Tight turnaround.', time: '21:10' }],
  4: [{ id: 1, author: 'Veloura', text: 'We need ad creative with stronger CTR angles for a skincare launch.', time: '19:32' }],
  5: [{ id: 1, author: 'Launchly', text: 'Can you help with 6 launch graphics for a startup waitlist push?', time: '22:00' }],
  6: [{ id: 1, author: 'Fundboard', text: 'Looking for a seed deck cleanup before investor intros next week.', time: '18:11' }],
}

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

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function HomePage({ onOpenPage, onOpenFreelancer, featuredFreelancers }) {
  return (
    <>
      <header className="hero-card">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="pill">Design-first freelance marketplace</span>
            <h1>The outsourcing platform that blends Uber speed, Upwork trust, and gamified growth loops.</h1>
            <p>
              GigLift is built for freelancers who want to pull jobs fast, level up through completed work,
              and grow through referrals, streaks, badges, and leaderboard momentum.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => onOpenPage('jobs')}>
                Explore jobs
              </button>
              <button type="button" className="ghost-button" onClick={() => onOpenPage('freelancers')}>
                View talent
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
          eyebrow="Featured talent"
          title="Real-face profiles feel more premium and trustworthy"
          text="A sharper freelancer layer makes the prototype feel closer to a marketplace users would actually browse."
        />
        <div className="talent-strip">
          {featuredFreelancers.map((freelancer) => (
            <button key={freelancer.id} type="button" className="talent-card" onClick={() => onOpenFreelancer(freelancer.id)}>
              <img src={freelancer.avatarUrl} alt={freelancer.name} className="talent-avatar" />
              <div>
                <strong>{freelancer.name}</strong>
                <p>{freelancer.role}</p>
                <span>{freelancer.discipline} • {freelancer.city}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="metric-grid">
        {liveMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <p>{metric.note}</p>
          </article>
        ))}
      </section>

      <section className="content-card two-column-grid">
        <div>
          <SectionTitle eyebrow="Live timeline" title="Marketplace activity" text="Signals that make the product feel alive." />
          <div className="feed-list">
            {liveTimeline.map((item) => (
              <div key={`${item.time}-${item.event}`} className="feed-item">
                <strong>{item.time}</strong>
                <div>
                  <p>{item.event}</p>
                  <span>{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle eyebrow="Momentum" title="What keeps users returning" text="XP, referrals, and ranking make the funnel sticky." />
          <ul className="bullet-list">
            {activityFeed.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function JobsPage({ onOpenJob }) {
  return (
    <section className="content-card">
      <SectionTitle
        eyebrow="Open gigs"
        title="Rush jobs, contests, and instant match opportunities"
        text="Prototype job cards that sell urgency and clear freelancer fit."
      />
      <div className="job-grid">
        {jobs.map((job) => (
          <article key={job.id} className="job-card">
            <div className="job-topline">
              <span>{job.type}</span>
              <strong>{job.budget}</strong>
            </div>
            <h3>{job.title}</h3>
            <p>{job.brief}</p>
            <div className="tag-row compact">
              <span>{job.level}</span>
              <span>{job.eta}</span>
              <span>{job.category}</span>
            </div>
            <button type="button" onClick={() => onOpenJob(job.id)}>
              View brief
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function FreelancersPage({
  selectedFreelancer,
  onSelectFreelancer,
  messages,
  newMessage,
  onMessageChange,
  onMessageSubmit,
}) {
  return (
    <section className="content-card freelancer-layout">
      <div>
        <SectionTitle
          eyebrow="Talent roster"
          title="Select a freelancer to preview profile, portfolio, and leave a real message"
          text="The old fake chat preview is gone. This version uses a real front-end留言区 so visitors can actually type and submit inquiries."
        />
        <div className="freelancer-grid">
          {freelancers.map((freelancer) => (
            <button
              key={freelancer.id}
              type="button"
              className={`freelancer-card ${selectedFreelancer.id === freelancer.id ? 'active' : ''}`}
              onClick={() => onSelectFreelancer(freelancer.id)}
            >
              <div className="freelancer-card-top">
                <img src={freelancer.avatarUrl} alt={freelancer.name} className="freelancer-avatar" />
                <div>
                  <strong>{freelancer.name}</strong>
                  <p>{freelancer.role}</p>
                  <span>{freelancer.city}</span>
                </div>
              </div>
              <div className="tag-row compact wrap">
                <span>{freelancer.level}</span>
                <span>{freelancer.score} ★</span>
                <span>{freelancer.badge}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <aside className="profile-panel">
        <div className="profile-header">
          <img src={selectedFreelancer.avatarUrl} alt={selectedFreelancer.name} className="profile-avatar" />
          <div>
            <span className="pill small">{selectedFreelancer.discipline}</span>
            <h3>{selectedFreelancer.name}</h3>
            <p>{selectedFreelancer.role} • {selectedFreelancer.city}</p>
            <strong>{selectedFreelancer.headline}</strong>
          </div>
        </div>

        <div className="profile-stats">
          <div>
            <span>Jobs</span>
            <strong>{selectedFreelancer.jobs}</strong>
          </div>
          <div>
            <span>Rating</span>
            <strong>{selectedFreelancer.score}</strong>
          </div>
          <div>
            <span>Earnings</span>
            <strong>{selectedFreelancer.earnings}</strong>
          </div>
        </div>

        <div className="tag-row wrap">
          {selectedFreelancer.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <div className="message-board">
          <div className="panel-heading align-start">
            <div>
              <h4>Leave a message</h4>
              <p className="muted-text">This is now an actual留言板 UI, ready to connect to backend later.</p>
            </div>
            <span>{selectedFreelancer.responseTime}</span>
          </div>

          <form className="message-form" onSubmit={onMessageSubmit}>
            <textarea
              value={newMessage}
              onChange={onMessageChange}
              placeholder={`Write a message to ${selectedFreelancer.name} about your project...`}
              rows={4}
            />
            <button type="submit">Send inquiry</button>
          </form>

          <div className="message-list">
            {messages.map((message) => (
              <article key={message.id} className="message-item">
                <div className="message-meta">
                  <strong>{message.author}</strong>
                  <span>{message.time}</span>
                </div>
                <p>{message.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="portfolio-section">
          <div className="panel-heading">
            <h4>{selectedFreelancer.discipline === 'Developer' ? 'Built projects' : 'Featured work'}</h4>
            <span>{selectedFreelancer.portfolio.length} samples</span>
          </div>
          <div className="portfolio-grid">
            {selectedFreelancer.portfolio.map((item) => (
              <article key={item.title} className="portfolio-card">
                <img src={item.image} alt={item.title} />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.type}</span>
                  <p>{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </section>
  )
}

function JobDetailPage({ job, selectedFreelancer, onOpenFreelancers }) {
  return (
    <section className="content-card two-column-grid">
      <div>
        <SectionTitle eyebrow={job.type} title={job.title} text={job.brief} />
        <div className="detail-card">
          <div className="detail-row"><span>Budget</span><strong>{job.budget}</strong></div>
          <div className="detail-row"><span>Client</span><strong>{job.client}</strong></div>
          <div className="detail-row"><span>Eligibility</span><strong>{job.level}</strong></div>
          <div className="detail-row"><span>Status</span><strong>{job.status}</strong></div>
        </div>

        <div className="detail-block">
          <h3>Scope</h3>
          <ul className="bullet-list">
            {job.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="detail-block">
          <h3>Deliverables</h3>
          <ul className="bullet-list">
            {job.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="side-panel soft-panel">
        <span className="side-label">Matched freelancer</span>
        <div className="matched-profile">
          <img src={selectedFreelancer.avatarUrl} alt={selectedFreelancer.name} className="freelancer-avatar large" />
          <div>
            <h3>{selectedFreelancer.name}</h3>
            <p>{selectedFreelancer.role}</p>
            <span>{selectedFreelancer.responseTime}</span>
          </div>
        </div>
        <div className="tag-row wrap">
          {job.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <button type="button" onClick={() => onOpenFreelancers()}>
          Browse more freelancers
        </button>
      </aside>
    </section>
  )
}

function MembershipPage() {
  return (
    <section className="content-card">
      <SectionTitle eyebrow="Monetization" title="Membership tiers for growing freelancers and teams" text="Simple pricing placeholders for the prototype." />
      <div className="plan-grid">
        {pricingPlans.map((plan) => (
          <article key={plan.name} className="plan-card">
            <span>{plan.name}</span>
            <strong>{plan.price}</strong>
            <p>{plan.note}</p>
            <ul className="bullet-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function ReferralsPage() {
  return (
    <section className="content-card two-column-grid">
      <div>
        <SectionTitle eyebrow="Referral center" title="Reward loops inspired by Temu-style growth" text="Invite freelancers, clients, and teams to unlock boosts and point ladders." />
        <div className="referral-grid">
          {referrals.map((item) => (
            <article key={item.title} className="referral-card">
              <h3>{item.title}</h3>
              <strong>{item.reward}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <div>
        <SectionTitle eyebrow="Top performers" title="Leaderboard snapshot" text="A social proof layer that makes competition visible." />
        <div className="leaderboard-list">
          {leaderboard.map((item, index) => (
            <div key={item.name} className="leaderboard-item">
              <b>0{index + 1}</b>
              <div>
                <strong>{item.name}</strong>
                <p>{item.xp}</p>
              </div>
              <span>{item.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PostJobPage() {
  return (
    <section className="content-card two-column-grid">
      <div>
        <SectionTitle eyebrow="Client onboarding" title="Fast posting flow" text="A lean form preview that shows how clients enter the dispatch system." />
        <div className="onboarding-grid">
          {onboardingSteps.map((step, index) => (
            <article key={step.title} className="step-card">
              <b>0{index + 1}</b>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="dashboard-grid">
        {dashboardStats.map((item) => (
          <article key={item.label} className="metric-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function AuthModal({ mode, form, onChange, onClose, onSubmit }) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="auth-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="panel-heading">
          <h3>{mode === 'login' ? 'Welcome back' : 'Create account'}</h3>
          <button type="button" className="icon-button small-icon" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="muted-text">
          {mode === 'login'
            ? 'Mocked auth flow for the prototype. Use any email and password to enter the app.'
            : 'Front-end signup state for clients or freelancers. Perfect for demoing account entry.'}
        </p>
        <div className="auth-grid">
          <label>
            <span>Name</span>
            <input name="name" value={form.name} onChange={onChange} placeholder="Alex Chen" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" value={form.email} onChange={onChange} placeholder="alex@giglift.app" />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" />
          </label>
          <label>
            <span>Account type</span>
            <select name="accountType" value={form.accountType} onChange={onChange}>
              <option>Client</option>
              <option>Freelancer</option>
            </select>
          </label>
        </div>
        <button type="button" onClick={onSubmit}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  )
}

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedJobId, setSelectedJobId] = useState(1)
  const [selectedFreelancerId, setSelectedFreelancerId] = useState(1)
  const [authMode, setAuthMode] = useState('login')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState(null)
  const [authForm, setAuthForm] = useState({
    name: 'Alex Chen',
    email: 'alex@giglift.app',
    password: 'demo1234',
    accountType: 'Client',
  })
  const [messageBoard, setMessageBoard] = useState(defaultMessages)
  const [newMessage, setNewMessage] = useState('')

  const selectedJob = useMemo(() => jobs.find((job) => job.id === selectedJobId) ?? jobs[0], [selectedJobId])
  const selectedFreelancer = useMemo(
    () => freelancers.find((freelancer) => freelancer.id === selectedFreelancerId) ?? freelancers[0],
    [selectedFreelancerId],
  )

  const featuredFreelancers = freelancers.slice(0, 4)
  const messages = messageBoard[selectedFreelancerId] ?? []

  useEffect(() => {
    setNewMessage('')
  }, [selectedFreelancerId])

  const handleOpenJob = (jobId) => {
    setSelectedJobId(jobId)
    setActivePage('job-detail')
  }

  const handleOpenFreelancer = (freelancerId) => {
    setSelectedFreelancerId(freelancerId)
    setActivePage('freelancers')
  }

  const handleAuthChange = (event) => {
    const { name, value } = event.target
    setAuthForm((current) => ({ ...current, [name]: value }))
  }

  const handleAuthSubmit = () => {
    setUser({
      name: authForm.name || 'Alex Chen',
      email: authForm.email,
      accountType: authForm.accountType,
    })
    setShowAuthModal(false)
  }

  const handleMessageSubmit = (event) => {
    event.preventDefault()

    if (!newMessage.trim()) {
      return
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setMessageBoard((current) => ({
      ...current,
      [selectedFreelancerId]: [
        ...(current[selectedFreelancerId] ?? []),
        {
          id: Date.now(),
          author: user?.name || 'Guest client',
          text: newMessage.trim(),
          time: timestamp,
        },
      ],
    }))

    setNewMessage('')
  }

  let pageContent = null

  if (activePage === 'home') {
    pageContent = <HomePage onOpenPage={setActivePage} onOpenFreelancer={handleOpenFreelancer} featuredFreelancers={featuredFreelancers} />
  } else if (activePage === 'jobs') {
    pageContent = <JobsPage onOpenJob={handleOpenJob} />
  } else if (activePage === 'freelancers') {
    pageContent = (
      <FreelancersPage
        selectedFreelancer={selectedFreelancer}
        onSelectFreelancer={setSelectedFreelancerId}
        messages={messages}
        newMessage={newMessage}
        onMessageChange={(event) => setNewMessage(event.target.value)}
        onMessageSubmit={handleMessageSubmit}
      />
    )
  } else if (activePage === 'job-detail') {
    pageContent = <JobDetailPage job={selectedJob} selectedFreelancer={selectedFreelancer} onOpenFreelancers={() => setActivePage('freelancers')} />
  } else if (activePage === 'membership') {
    pageContent = <MembershipPage />
  } else if (activePage === 'referrals') {
    pageContent = <ReferralsPage />
  } else {
    pageContent = <PostJobPage />
  }

  return (
    <div className="app-shell">
      <div className="app-frame">
        <header className="topbar feature-topbar">
          <div className="brand-lockup">
            <div className="brand-mark">GL</div>
            <div>
              <strong>GigLift</strong>
              <p>Speed-first freelance marketplace</p>
            </div>
          </div>

          <nav className="feature-nav" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`feature-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
                title={item.label}
                aria-label={item.label}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="feature-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="utility-rail">
            {user ? (
              <div className="user-chip compact-user-chip">
                <div className="user-dot" />
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.accountType}</span>
                </div>
              </div>
            ) : (
              <div className="auth-actions subtle-auth">
                <button
                  type="button"
                  className="ghost-button mini-action"
                  onClick={() => {
                    setAuthMode('login')
                    setShowAuthModal(true)
                  }}
                >
                  Log in
                </button>
                <button
                  type="button"
                  className="ghost-button mini-action"
                  onClick={() => {
                    setAuthMode('register')
                    setShowAuthModal(true)
                  }}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="page-stack">{pageContent}</main>
      </div>

      {showAuthModal ? (
        <AuthModal
          mode={authMode}
          form={authForm}
          onChange={handleAuthChange}
          onClose={() => setShowAuthModal(false)}
          onSubmit={handleAuthSubmit}
        />
      ) : null}
    </div>
  )
}

export default App
