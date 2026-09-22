import { ARTIFACTS } from './artifacts';
import { AchievementBadge, RevisionConcept, UserProgressProfile } from './types';

export const INITIAL_REVISION_DECK: RevisionConcept[] = [
  {
    id: 'rev-drainage-bitumen',
    topicId: 'ivc-water-systems',
    topicTitle: 'Water Management & Drainage',
    concept: 'Bitumen Waterproofing & Corbelled Outlets',
    masteryScore: 76,
    isWeak: true,
    scheduledDay: 'Day 2: Recall & Apply',
    prompt:
      'How did Mohenjo-daro engineers prevent contaminated wastewater from mixing with drinking well aquifers?',
    historicalContext:
      'Separate corbelled brick outflow drains lined with gypsum plaster and natural bitumen kept groundwater unpolluted.',
  },
  {
    id: 'rev-chert-ratios',
    topicId: 'ivc-trade-commerce',
    topicTitle: 'Maritime Trade & Standard Weights',
    concept: 'Binary-to-Decimal Weight Transition',
    masteryScore: 84,
    isWeak: false,
    scheduledDay: 'Day 5: Review',
    prompt:
      'At what multiple did the Harappan binary weight scale transition into decimal multipliers for bulk grain commerce?',
    historicalContext:
      'The binary sequence (1, 2, 4, 8, 16, 32, 64) scaled up to decimal fractions (160, 200, 320, 640) for macro trade.',
  },
];

export const ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach-grid-master',
    title: 'Cardinal Architect',
    description: 'Mastered the 1:2:4 burnt-brick ratio and orthogonal street planning of Harappa.',
    iconName: 'cube',
    unlocked: true,
    category: 'mastery',
  },
  {
    id: 'ach-hydraulic-engineer',
    title: 'Hydraulic Pioneer',
    description: 'Discovered the subterranean drain channels and Dholavira reservoir cascades.',
    iconName: 'water',
    unlocked: true,
    category: 'craft',
  },
  {
    id: 'ach-meluhha-trader',
    title: 'Meluhha Merchant',
    description: 'Charted the maritime trade dhow route from Lothal to Mesopotamia.',
    iconName: 'boat',
    unlocked: true,
    category: 'experience',
  },
  {
    id: 'ach-heritage-keeper',
    title: 'Grand Heritage Keeper',
    description: 'Attain 95%+ mastery across all ancient civilization modules.',
    iconName: 'shield',
    unlocked: false,
    category: 'curator',
  },
];

export const MOCK_USER_PROGRESS: UserProgressProfile = {
  name: 'Aryavarta Explorer',
  level: 3,
  rank: 'Explorer',
  currentXp: 1420,
  nextLevelXp: 2000,
  streakDays: 5,
  overallMastery: 87,
  completedExperiencesCount: 3,
  totalExperiencesCount: 4,
  topicMasteries: [
    {
      topicId: 'ivc-urban-planning',
      topicTitle: 'City Planning & Architecture',
      masteryScore: 92,
      isWeak: false,
    },
    {
      topicId: 'ivc-water-systems',
      topicTitle: 'Water Management & Drainage',
      masteryScore: 76,
      isWeak: true,
    },
    {
      topicId: 'ivc-trade-commerce',
      topicTitle: 'Maritime Trade & Standard Weights',
      masteryScore: 88,
      isWeak: false,
    },
    {
      topicId: 'ivc-crafts-seals',
      topicTitle: 'Craftsmanship, Seals & Script',
      masteryScore: 95,
      isWeak: false,
    },
  ],
  revisionDeck: INITIAL_REVISION_DECK,
  achievements: ACHIEVEMENTS,
  unlockedArtifacts: ARTIFACTS.filter((a) => a.unlocked),
};

