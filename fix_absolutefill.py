with open('src/components/ludo/duel-overlay.tsx', 'r') as f:
    text = f.read()

text = text.replace('...StyleSheet.absoluteFill,', '...StyleSheet.absoluteFillObject,')

with open('src/components/ludo/duel-overlay.tsx', 'w') as f:
    f.write(text)
