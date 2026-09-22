import re

with open('src/components/chronosearch/game-hud.tsx', 'r') as f:
    text = f.read()

replacement = """
function HudStat({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.stat, { backgroundColor: '#F3F4F0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, flex: 1, marginHorizontal: 2, alignItems: 'center' }]}>
      <ThemedText type="annotation" style={{ color: '#50613E', fontSize: 10 }}>
        {label.toUpperCase()}
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={{ color: '#243624', marginTop: 2 }}>{value}</ThemedText>
    </View>
  );
}
"""

text = re.sub(r'function HudStat.*?\}\n', replacement, text, flags=re.DOTALL)
text = text.replace("flexDirection: 'row',", "flexDirection: 'row',\n    gap: Spacing.one,")

with open('src/components/chronosearch/game-hud.tsx', 'w') as f:
    f.write(text)
