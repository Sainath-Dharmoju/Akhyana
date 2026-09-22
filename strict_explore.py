import re

with open('src/app/(tabs)/explore.tsx', 'r') as f:
    text = f.read()

# Make sure we filter out the ancient periods entirely from matchingDecades
text = text.replace(
    'if (!q) return DECADES;',
    "if (!q) return DECADES.filter(d => !['indus-valley-era', 'early-historic-india', 'gupta-era', 'medieval-india', 'early-modern-india'].includes(d.id));"
)

# And fix the placeholder from "e.g. 1980, Indus, Gupta…" to "e.g. 1890, 1940, 2010…"
text = text.replace(
    'placeholder="e.g. 1980, Indus, Gupta…"',
    'placeholder="e.g. 1890, 1940, 2010…"'
)

with open('src/app/(tabs)/explore.tsx', 'w') as f:
    f.write(text)
