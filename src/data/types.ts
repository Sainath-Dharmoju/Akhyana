/**
 * Akhyana Domain Data Models & Types
 * Grounded in verified historical sources, consequence-based learning loops, and progress tracking.
 */

export type SourceType =
  | 'archaeological'
  | 'academic'
  | 'primary'
  | 'museum'
  | 'unesco'
  | 'government_archive';

export type ConfidenceLevel = 'verified' | 'scholarly_consensus' | 'under_excavation';

export interface HistoricalSource {
  id: string;
  title: string;
  authorOrInstitution: string; // e.g. Archaeological Survey of India (ASI), UNESCO, Oxford University Press
  yearOrPeriod?: string;
  sourceType: SourceType;
  confidence: ConfidenceLevel;
  referenceLocation?: string;
  notes?: string;
  url?: string;
  publicationDate?: string;
  archiveDate?: string;
  documentReference?: string;
  supportingPassageOrNote?: string;

}

export type ExperienceMode = 'explore' | 'story' | 'discover' | 'reconstruct';

export type HistoricalDatePrecision = 'range' | 'approximate' | 'century' | 'exact';

export interface TimePeriod {
  id: string;
  title: string;
  shortDescription: string;
  startDate?: string;
  endDate?: string;
  dateDisplay: string;
  datePrecision: HistoricalDatePrecision;
  order: number;
  topicIds: string[];
  status: 'active' | 'coming_soon';
}

export interface Decade {
  id: string;
  startYear: number;
  endYear: number;
  displayLabel: string;
  description: string;
  status: 'active' | 'coming_soon';
}

/** The time-window → event → subtopic → playlist model used by the modern Learn flow. */
export interface HistoricalVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  order: number;
  /** Explicit placeholder until a reviewed MP4 is bundled. */
  asset: string;
  poster: string;
  status: 'planned' | 'available';
}

export interface HistoricalSubtopic {
  id: string;
  title: string;
  factualContent: string;
  context: string;
  evidence: string;
  sources: HistoricalSource[];
  takeaway: string;
  videos: HistoricalVideo[];
}

export interface HistoricalEvent {
  id: string;
  timeWindowId: string;
  year: number;
  date: string;
  title: string;
  location: string;
  region: string;
  category: string;
  description: string;
  people: string[];
  organisations: string[];
  consequences: string[];
  significance: string;
  sources: HistoricalSource[];
  subtopics: HistoricalSubtopic[];
}

export interface InteractiveStep {
  stepNumber: number;
  title: string;
  narrative: string;
  historicalEvidence: string;
  visualReference?: string;
  explanation?: string;
  takeaway?: string;
  choicePrompt?: string;
  options?: {
    label: string;
    historicalConsequence: string;
    isHistoricallyAccurate: boolean;
    explanation: string;
  }[];
  video?: LearningVideo;
  videos?: LearningVideo[];
  sources?: HistoricalSource[];
  factualContent?: string;
  context?: string;
}

/** Kept as an alias while migrating the earlier "step" terminology. */
export type LearningSubtopic = InteractiveStep;

export interface Experience {
  id: string;
  topicId: string;
  civilizationId?: string;
  title: string;
  mode: ExperienceMode;
  estimatedMinutes: number;
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced';
  summary: string;
  learningObjectives: string[];
  historicalContext: string;
  video: LearningVideo;
  recapPoints: string[];
  /** Ordered sections of a museum-style learning experience. */
  subtopics: LearningSubtopic[];
  sources: HistoricalSource[];
  status: 'unlocked' | 'locked' | 'completed';
  xpReward: number;
}

/** A finished, reviewed film reference. Asset paths are intentionally optional until films are bundled. */

export interface LearningVideo {
  id?: string;

  title: string;
  durationSeconds: number;
  posterLabel: string;
  assetUri?: string;
  status: 'planned' | 'available';
}

export interface Topic {
  id: string;
  /** Timeline-first parent. Civilizations remain related entities, not the parent navigation model. */
  periodId?: string;
  decadeId?: string;
  year?: number;
  civilizationId?: string;
  subtitle: string;
  startDate?: string;
  endDate?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  era: string;
  dateDisplay: string;
  datePrecision: HistoricalDatePrecision;
  chronologicalPosition: number;
  journeyStage: string;
  significance: string;

  location?: string;
  geographicRegion?: string;
  domain?: string;
  organisations?: string[];
  immediateConsequences?: string;
  longTermSignificance?: string;

  category?: string;
  relatedPeople?: string[];
  relatedPlaces?: string[];
  relatedTopics?: string[];
  relatedCivilizationIds: string[];
  learningExperienceId: string;
  region: string;
  masteryPercent: number;
  isWeakConcept: boolean;
  experiences: Experience[];
  sources: HistoricalSource[];
}

export interface Civilization {
  id: string;
  name: string;
  period: string;
  timeRange: string;
  region: string;
  tagline: string;
  description: string;
  status: 'active' | 'coming_soon';
  featured: boolean;
  topicIds: string[];
  sources: HistoricalSource[];
}

export type GameCategory =
  | 'reconstruction'
  | 'chronology'
  | 'strategy_board'
  | 'investigation'
  | 'etymology_search';

export interface GameModule {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: GameCategory;
  categoryLabel: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  relatedCivilizationId: string;
  relatedTopicTitle: string;
  status: 'playable_preview' | 'coming_soon';
  playerMode: 'solo' | 'friends' | 'solo_and_friends';
  isLocked: boolean;
  progressPercent: number;
  illustrationKey?: string;
  learningLoop: string;
  gameplayPreview: string;
  xpReward: number;
}

export type HeritageRank =
  | 'Beginner'
  | 'Explorer'
  | 'Learner'
  | 'Researcher'
  | 'Historian'
  | 'Heritage Keeper';

export interface RevisionConcept {
  id: string;
  topicId: string;
  topicTitle: string;
  concept: string;
  masteryScore: number; // e.g. 76%
  isWeak: boolean;
  scheduledDay: string; // e.g. 'Day 2: Recall'
  prompt: string;
  historicalContext: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  category: 'mastery' | 'experience' | 'craft' | 'curator';
}

export interface ArtifactRecord {
  id: string;
  name: string;
  civilizationId: string;
  estimatedDate: string;
  material: string;
  excavationSite: string;
  currentLocation: string; // e.g. National Museum, New Delhi
  historicalStatus: 'Verified Archaeological Discovery' | 'Archaeological Fragment' | 'Historical Reconstruction';
  description: string;
  significance: string;
  sources: HistoricalSource[];
  unlocked: boolean;
}

export interface UserProgressProfile {
  name: string;
  level: number;
  rank: HeritageRank;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  overallMastery: number;
  completedExperiencesCount: number;
  totalExperiencesCount: number;
  topicMasteries: {
    topicId: string;
    topicTitle: string;
    masteryScore: number;
    isWeak: boolean;
  }[];
  revisionDeck: RevisionConcept[];
  achievements: AchievementBadge[];
  unlockedArtifacts: ArtifactRecord[];
}
