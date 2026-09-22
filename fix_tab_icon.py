import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

tabicon_replacement = """
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const colors = Colors.light;
  // Render the exact emoji characters directly without tinting hacks
  // to guarantee they are crisp, recognizable, and do not render as squares/blobs.
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <Text style={{
        fontSize: 24,
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
