import re

with open('src/app/(tabs)/progress.tsx', 'r') as f:
    text = f.read()

text = text.replace('"defaultSemiBold"', '"smallBold"')

with open('src/app/(tabs)/progress.tsx', 'w') as f:
    f.write(text)
