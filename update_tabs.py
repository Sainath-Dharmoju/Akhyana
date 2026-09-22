import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

# Change map to compass for explore
text = text.replace('"map.fill"', '"compass.fill"')
text = text.replace('"map"', '"compass"')

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
