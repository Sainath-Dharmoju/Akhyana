import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

export function NotFoundState() {
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.content}>
        <ThemedText type="sectionHeader">Archive unavailable</ThemedText>
        <ThemedText type="heroDisplay">We couldn't find that page.</ThemedText>
        <ThemedText type="editorialLead" themeColor="textSecondary">
          It may have moved, or it is not part of the current Akhyana prototype.
        </ThemedText>
        <Button title="Return to Learn" variant="primary" onPress={() => router.replace('/')} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', padding: Spacing.four },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', gap: Spacing.three },
});
