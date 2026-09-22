import re

# 1. game-hud.tsx
with open('src/components/chronosearch/game-hud.tsx', 'r') as f:
    text = f.read()
text = text.replace('"defaultSemiBold"', '"smallBold"')
with open('src/components/chronosearch/game-hud.tsx', 'w') as f:
    f.write(text)

# 2. word-grid.tsx
with open('src/components/chronosearch/word-grid.tsx', 'r') as f:
    text = f.read()
text = text.replace('"defaultSemiBold"', '"smallBold"')
text = text.replace('padding: Spacing.one,', 'padding: 4,')
with open('src/components/chronosearch/word-grid.tsx', 'w') as f:
    f.write(text)

# 3. duel-overlay.tsx
with open('src/components/ludo/duel-overlay.tsx', 'r') as f:
    text = f.read()
text = text.replace('...StyleSheet.absoluteFillObject,', '...StyleSheet.absoluteFill as any,')
with open('src/components/ludo/duel-overlay.tsx', 'w') as f:
    f.write(text)

# 4. ludo-board.tsx
with open('src/components/ludo/ludo-board.tsx', 'r') as f:
    text = f.read()
text = text.replace('borderColor: theme.borderStrong,', 'borderColor: \'#D8D8D0\',')
with open('src/components/ludo/ludo-board.tsx', 'w') as f:
    f.write(text)

# 5. rapid-fire-overlay.tsx
with open('src/components/ludo/rapid-fire-overlay.tsx', 'r') as f:
    text = f.read()
text = text.replace('"defaultSemiBold"', '"smallBold"')
text = text.replace('...StyleSheet.absoluteFillObject,', '...StyleSheet.absoluteFill as any,')
with open('src/components/ludo/rapid-fire-overlay.tsx', 'w') as f:
    f.write(text)
