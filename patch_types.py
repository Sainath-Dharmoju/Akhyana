with open('src/data/types.ts', 'r') as f:
    text = f.read()

# I will just write a new definition for InteractiveStep.
replacement = """export interface InteractiveStep {
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
}"""

import re
# Find the start of InteractiveStep and replace until the end of it (];)
text = re.sub(r'export interface InteractiveStep \{.*?\}\n\[\];', replacement, text, flags=re.DOTALL)

with open('src/data/types.ts', 'w') as f:
    f.write(text)
