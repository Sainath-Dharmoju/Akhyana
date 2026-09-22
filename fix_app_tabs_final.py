code = """import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppTabs() {
  const colors = Colors.light;
  const insets = useSafeAreaInsets();
  
  const bottomInset = Math.max(insets.bottom, 16);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.cardBorder,
          elevation: 0,
          shadowOpacity: 0.1,
          height: 60 + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.oliveDeep,
        tabBarInactiveTintColor: colors.oliveMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
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
    </Tabs>
  );
}

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const colors = Colors.light;
  // We use standard Text to render the exact emojis the user requested.
  // Using a text shadow to overlay a slight dark olive tint.
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <Text style={{
        fontSize: 22,
        color: focused ? colors.oliveDeep : colors.oliveDark,
        opacity: focused ? 1 : 0.85,
        textShadowColor: focused ? colors.oliveDeep : 'transparent',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: focused ? 1 : 0,
      }}>
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
"""
with open('src/components/app-tabs.tsx', 'w') as f:
    f.write(code)
