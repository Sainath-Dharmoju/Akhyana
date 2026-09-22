import re

with open('src/components/app-tabs.tsx', 'r') as f:
    text = f.read()

# Add Image to react-native imports
text = text.replace("import { View, StyleSheet, Platform, Text } from 'react-native';", "import { View, StyleSheet, Platform, Text, Image } from 'react-native';")

# Replace tabs config
tabs_replacement = """
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/learn.png')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/games.png')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/explore.png')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/progress.png')} focused={focused} />
          ),
        }}
      />
"""
text = re.sub(r'\<Tabs\.Screen\n\s*name="index".*?\</Tabs\.Screen\>', tabs_replacement.strip(), text, flags=re.DOTALL)

# Replace TabIcon component
tabicon_replacement = """
function TabIcon({ source, focused }: { source: any; focused: boolean }) {
  const colors = Colors.light;
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <Image 
        source={source} 
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? colors.oliveDeep : colors.oliveDark,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}
"""
text = re.sub(r'function TabIcon\(\{ name, focused \}.*?\n\}\n', tabicon_replacement.strip() + '\n', text, flags=re.DOTALL)

with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(text)
