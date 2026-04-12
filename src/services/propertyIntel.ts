import type { PropertyIntelSnapshot } from '../types'

export const propertyIntelSnapshot: PropertyIntelSnapshot = {
  regionLabel: 'Greater Sydney Area',
  lastUpdated: 'Public-data MVP snapshot',
  marketPulse: [
    { label: 'Median house trend', value: '+6.1% YoY', change: 'Inner-west and north-west remain resilient' },
    { label: 'Median unit trend', value: '+4.3% YoY', change: 'Units improving as affordability pressure shifts demand' },
    { label: 'Rental market', value: 'Tight vacancy', change: 'Higher asking rents across many Sydney subregions' },
  ],
  suburbInsights: [
    {
      suburb: 'Parramatta',
      medianHousePrice: '$1.48M',
      medianUnitPrice: '$690k',
      medianWeeklyRent: '$710/wk',
      rentalYield: '4.9%',
      note: 'Strong transport-led demand and ongoing apartment supply.',
    },
    {
      suburb: 'Chatswood',
      medianHousePrice: '$2.75M',
      medianUnitPrice: '$1.05M',
      medianWeeklyRent: '$890/wk',
      rentalYield: '4.2%',
      note: 'School zones, rail access, and constrained stock continue to support pricing.',
    },
    {
      suburb: 'Liverpool',
      medianHousePrice: '$1.02M',
      medianUnitPrice: '$540k',
      medianWeeklyRent: '$620/wk',
      rentalYield: '5.6%',
      note: 'Growth corridor appeal with relative affordability and investor interest.',
    },
  ],
  planningUpdates: [
    'More medium-density and TOD discussion around transport corridors in Greater Sydney.',
    'Council-level rezoning and precinct change remains a major driver for suburb-by-suburb upside or disruption.',
    'Knockdown rebuild, duplex, and small infill feasibility is increasingly tied to local planning overlays and build cost pressure.',
  ],
  rateWatch: [
    'Mortgage sensitivity remains high, so rate commentary still moves buyer sentiment quickly.',
    'Even when cash rate expectations stabilise, serviceability buffers continue shaping who can borrow and how much.',
    'Refinancing and investor lending news should be watched alongside headline property prices.',
  ],
  news: [
    {
      title: 'Sydney migration and supply imbalance keep rental pressure elevated',
      source: 'Market watchlist',
      summary: 'Population growth and limited new supply are still supporting rents across many Sydney corridors.',
      tag: 'Rentals',
    },
    {
      title: 'Redevelopment and transport-linked precincts continue to reshape buyer attention',
      source: 'Planning watchlist',
      summary: 'Infrastructure-led precinct changes are creating localized pockets of demand and uncertainty.',
      tag: 'Planning',
    },
    {
      title: 'Borrowing power remains the key lens for 2026 property momentum',
      source: 'Rates watchlist',
      summary: 'Rate expectations, lender policy, and household cash flow remain tightly linked to buyer depth.',
      tag: 'Rates',
    },
  ],
  dataSources: [
    'ABS for population, dwelling, CPI, and broader housing context',
    'data.gov.au for public planning, infrastructure, and government datasets',
    'SQM Research style rental and vacancy tracking as a market input layer',
    'Public rate and macro commentary for borrowing-condition context',
  ],
}

export const supportedSydneySuburbs = propertyIntelSnapshot.suburbInsights.map((item) => item.suburb)

export function getPropertyIntelJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'GigHub Greater Sydney Property Intel',
    description:
      'Greater Sydney property, rental, planning, and interest-rate watch page designed for residents, buyers, renters, owners, and AI agents.',
    url: 'https://fintie.github.io/GigLift/property-intel',
    keywords: [
      'Greater Sydney property intel',
      'Sydney housing market',
      'Sydney rent trends',
      'Sydney suburb insights',
      'AI-readable real estate summary',
      'ABS housing data',
      'data.gov.au housing',
    ],
    spatialCoverage: {
      '@type': 'Place',
      name: 'Greater Sydney Area',
    },
    creator: {
      '@type': 'Organization',
      name: 'GigHub',
      url: 'https://fintie.github.io/GigLift/',
    },
    distribution: [
      {
        '@type': 'DataDownload',
        name: 'Property intel page',
        contentUrl: 'https://fintie.github.io/GigLift/property-intel',
        encodingFormat: 'text/html',
      },
    ],
  }
}
