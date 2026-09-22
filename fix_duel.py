import re

with open('src/components/ludo/duel-overlay.tsx', 'r') as f:
    text = f.read()

# Fix the missing `card: {`
fixed_text = text.replace("""  overlayInner: {
    flexGrow: 1,
    justifyContent: 'center',
  },
    borderWidth: 1,""", """  overlayInner: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,""")

with open('src/components/ludo/duel-overlay.tsx', 'w') as f:
    f.write(fixed_text)
