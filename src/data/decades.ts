import { Decade } from './types';

/**
 * The primary Explore index.
 *
 * Modern periods use exact decade boundaries. Ancient/medieval periods use approximate
 * date ranges -- their `startYear` and `endYear` are representative, not authoritative.
 * Only the 1980s and the Indus Valley era have curated content in this prototype.
 */
export const DECADES: Decade[] = [
  // Ancient ---------------------------------------------------------------
  {
    id: 'indus-valley-era',
    startYear: -2700,
    endYear: -1300,
    displayLabel: 'Indus Valley Era',
    description:
      'Explore the archaeology, city planning, water systems, trade networks, and craftsmanship of the Indus Valley Civilisation (c. 2700-1300 BCE).',
    status: 'active',
  },
  {
    id: 'early-historic-india',
    startYear: -600,
    endYear: 320,
    displayLabel: 'Early Historic India',
    description:
      'The age of the Mahajanapadas, Mauryan Empire, and early Buddhist and Jain traditions (c. 600 BCE - 320 CE). A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: 'gupta-era',
    startYear: 320,
    endYear: 550,
    displayLabel: 'Gupta Period',
    description:
      'Science, mathematics, art, and statecraft during the Gupta Empire. A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: 'medieval-india',
    startYear: 700,
    endYear: 1526,
    displayLabel: 'Medieval India',
    description:
      'Regional kingdoms, the Bhakti movement, Vijayanagara Empire, and Delhi Sultanate. A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: 'early-modern-india',
    startYear: 1526,
    endYear: 1857,
    displayLabel: 'Early Modern India',
    description:
      'The Mughal period, regional powers, and early colonial contact. A future curated collection.',
    status: 'coming_soon',
  },
  // Modern ----------------------------------------------------------------
  {
    id: '1890s',
    startYear: 1890,
    endYear: 1899,
    displayLabel: '1890s',
    description:
      'Famine, plague, tribal uprisings, and early cultural awakenings at the turn of the century.',
    status: 'active',
  },
  {
    id: '1940s',
    startYear: 1940,
    endYear: 1949,
    displayLabel: '1940s',
    description:
      'Independence, constitutional drafting, integration of states, and significant agricultural movements.',
    status: 'active',
  },
  {
    id: '1950s',
    startYear: 1950,
    endYear: 1959,
    displayLabel: '1950s',
    description:
      'The early Republic -- planning commissions, dam construction, and Nehru-era foreign policy. A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: '1960s',
    startYear: 1960,
    endYear: 1969,
    displayLabel: '1960s',
    description:
      'Green Revolution, wars with China and Pakistan. A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: '1970s',
    startYear: 1970,
    endYear: 1979,
    displayLabel: '1970s',
    description:
      'Bangladesh War, Emergency, space programme beginnings. A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: '1980s',
    startYear: 1980,
    endYear: 1989,
    displayLabel: '1980s',
    description: 'Explore events, people, ideas, and changes that shaped India during the decade.',
    status: 'active',
  },
  {
    id: '1990s',
    startYear: 1990,
    endYear: 1999,
    displayLabel: '1990s',
    description:
      'Liberalisation, Babri Masjid demolition, and Pokhran II. A future curated collection.',
    status: 'coming_soon',
  },
  {
    id: '2000s',
    startYear: 2000,
    endYear: 2009,
    displayLabel: '2000s',
    description: 'A future curated decade collection.',
    status: 'coming_soon',
  },
  {
    id: '2010s',
    startYear: 2010,
    endYear: 2019,
    displayLabel: '2010s',
    description: 'Economic reforms, landmark legal judgments, space exploration, and state reorganization.',
    status: 'active',
  },
  {
    id: '2020s',
    startYear: 2020,
    endYear: 2029,
    displayLabel: '2020s',
    description: 'A future curated decade collection.',
    status: 'coming_soon',
  },
];
