import re

with open('src/data/decades.ts', 'r') as f:
    content = f.read()

# Add 1890s
if "'1890s'" not in content:
    eighteen_nineties = """
  {
    id: '1890s',
    startYear: 1890,
    endYear: 1899,
    displayLabel: '1890s',
    description:
      'Famine, plague, tribal uprisings, and early cultural awakenings at the turn of the century.',
    status: 'active',
  },"""
    content = content.replace('// Modern ----------------------------------------------------------------', 
                              '// Modern ----------------------------------------------------------------' + eighteen_nineties)

# Update statuses
content = re.sub(
    r"(id: '1940s',[^}]+status:\s*)'[^']+'",
    r"\1'active'",
    content
)
content = re.sub(
    r"(id: '2010s',[^}]+status:\s*)'[^']+'",
    r"\1'active'",
    content
)
content = re.sub(
    r"(id: '1940s',[^}]+description:\s*)'[^']+'",
    r"\1'Independence, constitutional drafting, integration of states, and significant agricultural movements.'",
    content
)
content = re.sub(
    r"(id: '2010s',[^}]+description:\s*)'[^']+'",
    r"\1'Economic reforms, landmark legal judgments, space exploration, and state reorganization.'",
    content
)

with open('src/data/decades.ts', 'w') as f:
    f.write(content)
