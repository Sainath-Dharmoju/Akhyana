with open('src/components/ludo/turn-bar.tsx', 'r') as f:
    text = f.read()

text = text.replace('title="Roll"', 'title="Challenge"')

with open('src/components/ludo/turn-bar.tsx', 'w') as f:
    f.write(text)
