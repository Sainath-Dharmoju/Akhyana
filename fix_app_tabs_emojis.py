import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

# Replace SymbolView imports
text = text.replace("import { SymbolView, SymbolViewProps } from 'expo-symbols';", "import { Text } from 'react-native';")

# Replace the tabs config
tabs_replacement = """
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="📖" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="🎮" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="🧭" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="🏆" focused={focused} />
          ),
        }}
      />
"""
text = re.sub(r'\<Tabs\.Screen\n\s*name="index".*?\</Tabs\.Screen\>', tabs_replacement.strip(), text, flags=re.DOTALL)

# Replace TabIcon component
tabicon_replacement = """
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const colors = Colors.light;
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <Text style={{
        fontSize: 22,
        color: focused ? colors.oliveDeep : colors.oliveDark,
        opacity: focused ? 1 : 0.85,
        textShadowColor: 'rgba(36, 54, 36, 0.4)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
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
