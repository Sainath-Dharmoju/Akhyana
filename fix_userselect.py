import re

with open('src/components/chronosearch/word-grid.tsx', 'r') as f:
    text = f.read()

styles_replacement = """
const styles = StyleSheet.create({
  board: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: BorderRadius.xl,
    padding: 4,
    backgroundColor: '#EBEBE3', // very soft cream
    // @ts-ignore
    userSelect: 'none',
  },
"""

text = re.sub(r'const styles = StyleSheet\.create\(\{\s*board: \{\s*width: \'100%\',\s*aspectRatio: 1,\s*borderWidth: 2,\s*borderRadius: BorderRadius\.xl,\s*padding: 4,\s*backgroundColor: \'#EBEBE3\',\s*// very soft cream\s*\},', styles_replacement.strip(), text, flags=re.DOTALL)

with open('src/components/chronosearch/word-grid.tsx', 'w') as f:
    f.write(text)
