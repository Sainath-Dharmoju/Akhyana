import { HistoricalSource } from '@/data/types';

export type ExplanationStyle = 'concise' | 'detailed' | 'scholarly';

export interface AIHeritageGuideRequest {
  civilizationId: string;
  topicId?: string;
  userQuestion: string;
  contextNarrative?: string;
  style?: ExplanationStyle;
}

export interface AIHeritageGuideResponse {
  answer: string;
  groundedSources: HistoricalSource[];
  sourceAttribution: string;
  isAIAssistedExplanation: boolean;
  relatedCuratedTopics: string[];
  suggestedFollowUps: string[];
}

export interface IAIHeritageGuideService {
  askGuide(request: AIHeritageGuideRequest): Promise<AIHeritageGuideResponse>;
  getTopicQuickInsights(topicId: string): Promise<string[]>;
  generateContextualHint(stepPrompt: string, topicId: string): Promise<string>;
}

