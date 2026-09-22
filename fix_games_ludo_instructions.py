import re

with open('src/app/(tabs)/games.tsx', 'r') as f:
    text = f.read()

ludo_instructions = """
                  <View
                    style={[styles.gameplayLoopBox, { backgroundColor: theme.backgroundElement }]}>
                    <ThemedText type="annotation" style={{ color: theme.textMuted }}>
                      MECHANIC
                    </ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {ludo.gameplayPreview}
                    </ThemedText>
                  </View>

                  <View
                    style={[
                      styles.howItWorksBox,
                      { backgroundColor: theme.card, borderColor: theme.cardBorder, marginTop: 12 },
                    ]}>
                    <ThemedText type="sectionHeader" themeColor="text">
                      HOW IT WORKS
                    </ThemedText>
                    <View style={styles.stepsList}>
                      {[
                        { step: '01', title: 'CHOOSE TOPICS', desc: 'Choose the historical topics from which the game will ask questions.' },
                        { step: '02', title: 'ROLL', desc: 'Every dice roll is generated through 6 rapid-fire easy history questions.' },
                        { step: '03', title: 'ANSWER', desc: 'The player answers all 6 questions.' },
                        { step: '04', title: 'MOVE', desc: 'The number of correct answers (0–6) becomes the dice value.' },
                        { step: '05', title: 'HISTORICAL DUEL', desc: "If an attacking token lands on an opponent's token, trigger the 5-second Historical Duel." },
                        { step: '06', title: 'CAPTURE OR DEFEND', desc: 'Both players receive the same history question. The correct/fastest response determines whether the attacking player captures the token or the defender stops the attack.' },
                      ].map((item) => (
                        <View key={item.step} style={styles.stepItem}>
                          <ThemedText type="annotation" style={{ color: theme.accent }}>
                            {item.step}
                          </ThemedText>
                          <View style={styles.stepContent}>
                            <ThemedText type="smallBold">{item.title}</ThemedText>
                            <ThemedText type="caption" themeColor="textSecondary">
                              {item.desc}
                            </ThemedText>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
"""

# Replace the old gameplayLoopBox block with the one including instructions
text = re.sub(
    r'\<View\n\s*style=\{\[styles\.gameplayLoopBox.*?\{\s*ludo\.gameplayPreview\s*\}\n\s*\<\/ThemedText\>\n\s*\<\/View\>',
    ludo_instructions.strip(),
    text,
    flags=re.DOTALL
)

with open('src/app/(tabs)/games.tsx', 'w') as f:
    f.write(text)
