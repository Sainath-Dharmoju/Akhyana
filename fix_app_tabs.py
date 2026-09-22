import re

code = """import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { Colors, Spacing } from '@/constants/theme';

export default function AppTabs() {
  const colors = Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.cardBorder,
          elevation: 0,
          shadowOpacity: 0.1,
          height: Platform.OS === 'ios' ? 84 : 70,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
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
          tabBarIcon: ({ focused, color }) => (
            <TabIcon 
              name={focused ? "book.fill" : "book"} 
              focused={focused} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon 
              name={focused ? "gamecontroller.fill" : "gamecontroller"} 
              focused={focused} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon 
              name={focused ? "map.fill" : "map"} 
              focused={focused} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Experience',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon 
              name={focused ? "location.north.circle.fill" : "location.north.circle"} 
              focused={focused} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, focused, color }: { name: SymbolViewProps['name']; focused: boolean; color: string }) {
  const colors = Colors.light;
  return (
    <View style={[
      styles.iconContainer, 
      focused && { backgroundColor: colors.sageLight }
    ]}>
      <SymbolView
        name={name}
        size={24}
        tintColor={focused ? colors.oliveDark : colors.oliveMuted}
        fallback={null}
        style={{ fontWeight: focused ? 'bold' : 'normal' } as any}
      />
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
