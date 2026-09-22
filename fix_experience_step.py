import re

with open('src/app/experience/[id].tsx', 'r') as f:
    text = f.read()

replacement = """          {/* STEP NARRATIVE & DECISION */}
          {!isCompleted ? (
            <View style={styles.stepSection}>
              <ThemedText type="editorialHeader" style={styles.stepTitle}>
                {currentStep.title}
              </ThemedText>

              <ThemedText type="editorialLead" themeColor="textSecondary" style={styles.narrativeLead}>
                {currentStep.narrative || currentStep.factualContent}
              </ThemedText>
              
              {currentStep.context && (
                <ThemedText type="editorialLead" themeColor="textSecondary" style={styles.narrativeLead}>
                  {currentStep.context}
                </ThemedText>
              )}

              {/* VIDEO SEQUENCE */}
              {currentStep.videos && currentStep.videos.length > 0 ? (
                <View style={{ gap: Spacing.four, marginVertical: Spacing.two }}>
                  <ThemedText type="annotation" themeColor="textMuted">VIDEO SEQUENCE ({currentStep.videos.length})</ThemedText>
                  {currentStep.videos.map((vid, vIdx) => (
                    <LearningVideoPlaceholder key={vid.id || vIdx.toString()} video={vid} />
                  ))}
                </View>
              ) : currentStep.video ? (
                <View style={{ gap: Spacing.two, marginVertical: Spacing.two }}>
                   <ThemedText type="annotation" themeColor="textMuted">VIDEO</ThemedText>
                   <LearningVideoPlaceholder video={currentStep.video} />
                </View>
              ) : (experience.video ? <LearningVideoPlaceholder video={experience.video} /> : null)}

              {/* EVIDENCE / SOURCES */}
              {currentStep.historicalEvidence && (
                <View
                  style={[
                    styles.evidenceQuoteBox,
                    { backgroundColor: theme.backgroundElement, borderLeftColor: theme.primary },
                  ]}>
                  <AnnotationTag label="EVIDENCE & SOURCES" variant="highlight" />
                  <ThemedText type="small" themeColor="textSecondary" style={styles.evidenceText}>
                    {currentStep.historicalEvidence}
                  </ThemedText>
                </View>
              )}
              
              {currentStep.sources && currentStep.sources.length > 0 && (
                <View style={{ marginTop: Spacing.two, gap: Spacing.one }}>
                  {currentStep.sources.map((s, idx) => (
                    <View key={idx} style={{ padding: Spacing.two, backgroundColor: theme.card, borderRadius: 8 }}>
                      <ThemedText type="smallBold">{s.title}</ThemedText>
                      <ThemedText type="caption" themeColor="textMuted">{s.authorOrInstitution}</ThemedText>
                    </View>
                  ))}
                </View>
              )}

              {/* TAKEAWAY */}
              {(currentStep.takeaway || currentStep.explanation) && (
                <View style={{ marginTop: Spacing.two }}>
                  <ThemedText type="annotation" style={{ color: theme.accent, marginBottom: 4 }}>
                    KEY TAKEAWAY
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {currentStep.takeaway || currentStep.explanation}
                  </ThemedText>
                </View>
              )}

              {/* Interactive Decision / Consequence */}
"""

# Replace from {/* STEP NARRATIVE & DECISION */} to {/* Interactive Decision / Consequence */}
text = re.sub(r'\{\/\* STEP NARRATIVE & DECISION \*\/\}.*?\{\/\* Interactive Decision / Consequence \*\/\}', replacement, text, flags=re.DOTALL)

with open('src/app/experience/[id].tsx', 'w') as f:
    f.write(text)
