import re

with open('src/components/chronosearch/word-list.tsx', 'r') as f:
    text = f.read()

replacement = """  return (
    <View style={styles.wrap}>
      <ThemedText type="sectionHeader" themeColor="text">
        Historical collection
      </ThemedText>
      <View style={styles.chips}>
        {words.map((word) => {
          const isFound = foundIds.has(word.id);
          return (
            <View
              key={word.id}
              style={[
                styles.chip,
                {
                  backgroundColor: isFound ? '#50613E' : 'transparent',
                  borderColor: isFound ? '#50613E' : theme.borderStrong,
                  borderWidth: isFound ? 0 : 1,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                }
              ]}>
              <ThemedText type="smallBold" style={{ color: isFound ? '#FFFFFF' : theme.textMuted }}>
                {isFound ? `✓ ${word.displayLabel}` : `○ ${word.displayLabel}`}
              </ThemedText>
            </View>
          );
        })}
      </View>
    </View>
  );"""

text = re.sub(r'return \(.*?\);', replacement, text, flags=re.DOTALL)

with open('src/components/chronosearch/word-list.tsx', 'w') as f:
    f.write(text)
