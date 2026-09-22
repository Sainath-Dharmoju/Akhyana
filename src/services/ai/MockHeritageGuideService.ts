import { HISTORICAL_SOURCES } from '@/data/sources';
import { TOPICS } from '@/data/topics';
import {
    AIHeritageGuideRequest,
    AIHeritageGuideResponse,
    IAIHeritageGuideService,
} from './types';

export class MockHeritageGuideService implements IAIHeritageGuideService {
  async askGuide(request: AIHeritageGuideRequest): Promise<AIHeritageGuideResponse> {
    const topic = TOPICS.find((t) => t.id === request.topicId);
    const sources = topic ? topic.sources : [HISTORICAL_SOURCES.asi_mohenjodaro];

    const q = request.userQuestion.toLowerCase();

    let answer = `According to verified excavations documented by the Archaeological Survey of India, Harappan urban structures adhered strictly to cardinal orientation and standardized brick ratios (1:2:4). This civic layout maximized airflow through natural valley winds and provided an integrated municipal drainage channel for every home.`;

    if (q.includes('drain') || q.includes('water') || q.includes('bath') || q.includes('sanitation')) {
      answer = `Harappan sanitation was the ancient world's pinnacle of municipal engineering. Mohenjo-daro houses drained into subterranean brick-vaulted street sewers with periodic silt settling sumps. The Great Bath utilized 3cm thick natural bitumen (asphalt) gypsum mortar lining to create a 100% watertight reservoir without contaminating underground wells.`;
    } else if (q.includes('trade') || q.includes('weight') || q.includes('lothal') || q.includes('sea')) {
      answer = `At Lothal (Gujarat), archaeologists discovered the world's earliest tidal dockyard (214m x 36m). Harappans used binary-calibrated cubical chert weights (1:2:4:8:16:32:64) that were accepted across Persian Gulf ports (Dilmun/Bahrain) and Mesopotamian city-states like Ur and Kish.`;
    } else if (q.includes('dancing girl') || q.includes('art') || q.includes('seal') || q.includes('script')) {
      answer = `The bronze 'Dancing Girl' (c. 2300 BCE, National Museum New Delhi) showcases the lost-wax (cire-perdue) casting technique. Harappan steatite seals served as commercial cargo authentication seals, bearing intricate animal engravings and undeciphered pictographic scripts.`;
    }

    return {
      answer,
      groundedSources: sources,
      sourceAttribution: sources.map((s) => `${s.title} (${s.authorOrInstitution})`).join(' • '),
      isAIAssistedExplanation: true,
      relatedCuratedTopics: topic ? [topic.title] : ['Indus Valley Urban Planning'],
      suggestedFollowUps: [
        'How did Harappan weights maintain trade honesty?',
        'What was the purpose of the Great Bath?',
        'Why are there no monarchical monuments in Indus cities?',
      ],
    };
  }

  async getTopicQuickInsights(topicId: string): Promise<string[]> {
    const topic = TOPICS.find((t) => t.id === topicId);
    if (!topic) {
      return [
        'Civic planning was standardized across 1,000+ settlements.',
        'Bricks were manufactured in an exact 1:2:4 height-width-length ratio.',
      ];
    }
    return [
      `Grounded in ${topic.sources.length} primary archaeological excavation dossiers.`,
      `Demonstrates ${topic.masteryPercent}% community comprehension benchmark.`,
    ];
  }

  async generateContextualHint(stepPrompt: string, topicId: string): Promise<string> {
    if (stepPrompt.toLowerCase().includes('cardinal') || stepPrompt.toLowerCase().includes('grid')) {
      return 'Hint: Consider how natural environmental winds acted as ancient cooling corridors before modern energy existed.';
    }
    if (stepPrompt.toLowerCase().includes('brick') || stepPrompt.toLowerCase().includes('ratio')) {
      return 'Hint: Think about why uniform brick dimensions across 1,000 kilometers require deliberate municipal regulation.';
    }
    return 'Hint: Look closely at the excavation evidence uncovered by the Archaeological Survey of India.';
  }
}

export const heritageGuideService = new MockHeritageGuideService();

