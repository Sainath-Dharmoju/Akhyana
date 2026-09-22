import re

with open('src/app/topic/[id].tsx', 'r') as f:
    text = f.read()

# I want to replace the "Start learning" section with a "SUBTOPICS" list.
replacement = """
          {/* Subtopics List */}
          {experience && (
            <View style={styles.section}>
              <ThemedText type="sectionHeader">SUBTOPICS</ThemedText>
              
              <View style={{ gap: Spacing.two, marginTop: Spacing.one }}>
                {experience.subtopics.map((subtopic, index) => (
                  <Pressable
                    key={index}
                    onPress={() => router.push(`/experience/${experience.id}?step=${index}`)}
                    style={({ pressed }) => [
                      {
                        padding: Spacing.four,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: theme.border,
                        backgroundColor: theme.card,
                        gap: Spacing.one
                      },
                      pressed && { opacity: 0.7 }
                    ]}
                  >
                    <ThemedText type="annotation" style={{ color: theme.accent }}>
                      0{index + 1}
                    </ThemedText>
                    <ThemedText type="cardTitle" style={{ fontSize: 18 }}>
                      {subtopic.title}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
                      {subtopic.narrative || subtopic.factualContent || 'Explore this topic in detail.'}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
"""

# Replace the existing Start Learning section
text = re.sub(r'\{\/\* Start learning \*\/\}[\s\S]*?\n          \)}', replacement, text)

with open('src/app/topic/[id].tsx', 'w') as f:
    f.write(text)
