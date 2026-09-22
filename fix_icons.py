import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

# Change safari to trophy
text = text.replace('"safari.fill"', '"trophy.fill"')
text = text.replace('"safari"', '"trophy"')

# Change TabIcon rendering
tab_icon_replacement = """
function TabIcon({ name, focused }: { name: SymbolViewProps['name']; focused: boolean }) {
  const colors = Colors.light;
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <SymbolView
        name={name}
        size={26}
        tintColor={focused ? colors.oliveDeep : colors.oliveDark}
        weight={focused ? 'bold' : 'semibold'}
      />
    </View>
  );
}
"""
text = re.sub(r'function TabIcon\(\{ name, focused.*?</View>\n  \);\n\}', tab_icon_replacement.strip(), text, flags=re.DOTALL)

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
