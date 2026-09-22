import re

with open('src/data/types.ts', 'r') as f:
    text = f.read()

# Just extract InteractiveStep and replace it exactly.
pattern = r"export interface InteractiveStep \{[\s\S]*?\n\}"

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

# Fix any lingering messy bits like `video?: LearningVideo;\n}` that might be left over from previous botched regexes.
text = re.sub(r'export interface InteractiveStep \{[\s\S]*?context\?: string;\n\}\n  video\?: LearningVideo;\n\}', replacement, text)

# Just run a general clean up
text = text.replace("""export interface InteractiveStep {
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
  video?: LearningVideo;
}""", replacement)


with open('src/data/types.ts', 'w') as f:
    f.write(text)
