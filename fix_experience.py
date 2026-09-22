import re

with open('src/app/experience/[id].tsx', 'r') as f:
    text = f.read()

# Add step param
text = text.replace('const { id } = useLocalSearchParams<{ id: string }>();', 'const { id, step } = useLocalSearchParams<{ id: string, step?: string }>();')

# Init currentStepIndex
text = text.replace('const [currentStepIndex, setCurrentStepIndex] = useState(0);', 'const [currentStepIndex, setCurrentStepIndex] = useState(step ? parseInt(step, 10) : 0);')

# Replace the step rendering block entirely. Let's find the start of {/* Content */} or {/* Narrative */}
replacement_step = """
            <View style={styles.stepSection}>
              <AnnotationTag
                label={`SUBTOPIC 0${currentStepIndex + 1} OF 0${experience.subtopics.length}`}
                variant="highlight"
              />
              <ThemedText type="heroDisplay" style={styles.stepTitle}>
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
              ) : null}

              {/* EVIDENCE / SOURCES */}
              {currentStep.historicalEvidence && (
                <View
                  style={[
                    styles.evidenceQuoteBox,
                    { backgroundColor: theme.card, borderLeftColor: theme.primary },
                  ]}>
                  <ThemedText type="annotation" themeColor="textMuted">
                    EVIDENCE / SOURCE
                  </ThemedText>
                  <ThemedText type="small" style={styles.evidenceText}>
                    "{currentStep.historicalEvidence}"
                  </ThemedText>
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
"""

# Now find where to inject it. We can replace from `{/* Content */}` to the start of `{/* Interactive Choice */}`
# Oh wait, let's just use regex to replace everything from `            {/* Content */}` to `            {/* Interactive Choice */}`
text = re.sub(r'\{\/\* Content \*\/\}.*?\{\/\* Interactive Choice \*\/\}', replacement_step + '\n            {/* Interactive Choice */}', text, flags=re.DOTALL)

with open('src/app/experience/[id].tsx', 'w') as f:
    f.write(text)
