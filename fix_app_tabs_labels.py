import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

text = text.replace("title: 'Experience',", "title: 'Progress',")

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
