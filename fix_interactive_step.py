import re

with open('src/data/types.ts', 'r') as f:
    text = f.read()

interactive_step_additions = """
  videos?: LearningVideo[];
  sources?: HistoricalSource[];
  factualContent?: string;
  context?: string;
}
"""

text = re.sub(
    r'(export interface InteractiveStep \{[^}]+\})',
    lambda m: m.group(1)[:-1] + interactive_step_additions,
    text,
    count=1
)

learning_video_additions = """
export interface LearningVideo {
  id?: string;
"""

text = re.sub(
    r'export interface LearningVideo \{',
    learning_video_additions,
    text,
    count=1
)

with open('src/data/types.ts', 'w') as f:
    f.write(text)
