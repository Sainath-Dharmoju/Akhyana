import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

text = text.replace("color={color} ", "")
text = text.replace("function TabIcon({ name, focused, color }: { name: SymbolViewProps['name']; focused: boolean; color: string })", "function TabIcon({ name, focused }: { name: SymbolViewProps['name']; focused: boolean })")

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
