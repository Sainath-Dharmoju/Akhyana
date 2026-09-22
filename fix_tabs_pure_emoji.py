import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

# Replace TabIcon component and Tabs.Screen to use pure Emojis
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

tabicon_replacement = """
function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const colors = Colors.light;
  
  // Render the actual emoji characters directly as visible text/glyphs.
  // We use color to tint on supporting platforms, but omit shadow/opacity hacks
  // that cause emojis to vanish or render as pale circular blobs on Android.
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <Text style={{
        fontSize: 22,
        color: focused ? colors.oliveDeep : colors.oliveDark,
        textAlign: 'center',
        includeFontPadding: false,
      }}>
        {name}
      </Text>
    </View>
  );
}
"""
text = re.sub(r'function TabIcon\(\{ source, focused \}.*?\n\}\n', tabicon_replacement.strip() + '\n', text, flags=re.DOTALL)
text = text.replace("import { View, StyleSheet, Platform, Text, Image } from 'react-native';", "import { View, StyleSheet, Platform, Text } from 'react-native';")

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
