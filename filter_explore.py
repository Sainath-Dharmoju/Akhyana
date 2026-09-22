import re

with open('src/app/(tabs)/explore.tsx', 'r') as f:
    text = f.read()

# Filter out indus-valley-era and other ancient/medieval periods from matchingDecades
# Or better yet, just show only modern decades (1890s, 1940s, 1980s, 2010s) 
# Let's filter out 'indus-valley-era', 'early-historic-india', 'gupta-era', 'medieval-india', 'early-modern-india'
text = text.replace(
    'return DECADES.filter((d) =>',
    '''return DECADES.filter(d => !['indus-valley-era', 'early-historic-india', 'gupta-era', 'medieval-india', 'early-modern-india'].includes(d.id)).filter((d) =>'''
)

with open('src/app/(tabs)/explore.tsx', 'w') as f:
    f.write(text)
