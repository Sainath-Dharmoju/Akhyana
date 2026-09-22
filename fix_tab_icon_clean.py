import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

tabicon_replacement = """
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const colors = Colors.light;
  
  // Render the literal emoji. We apply color for systems that support monochrome emoji tinting,
  // but avoid all shadow/opacity hacks so that color emojis render perfectly safely on Android.
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <Text style={{
        fontSize: 22,
        color: focused ? colors.oliveDeep : colors.oliveDark,
        textAlign: 'center',
        lineHeight: 28,
      }}>
        {name}
      </Text>
    </View>
  );
}
"""

text = re.sub(r'function TabIcon\(\{ name, focused \}.*?\n\}\n', tabicon_replacement.strip() + '\n', text, flags=re.DOTALL)

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
