import re

with open('src/components/chronosearch/word-grid.tsx', 'r') as f:
    text = f.read()

# Enhance the visual styling of the grid
replacement = """
            let backgroundColor: string = 'transparent';
            let color: string = theme.textSecondary;
            let borderRadius = 0;
            let opacity = 1;

            if (isFound) {
              backgroundColor = '#50613E'; // Deep forest olive
              color = '#FFFFFF';
              borderRadius = 12;
            } else if (isSelected) {
              backgroundColor = invalidSelection ? theme.accent : '#7D7246'; // Chola / warm green
              color = '#FFFFFF';
              borderRadius = 12;
              opacity = 0.9;
            }

            return (
              <View
                key={key}
                pointerEvents="none"
                style={[
                  styles.cell,
                  {
                    width: cellSize || undefined,
                    height: cellSize || undefined,
                    backgroundColor,
                    borderRadius,
                    opacity
                  },
                ]}>
                <ThemedText type="defaultSemiBold" style={[styles.letter, { color }]}>
                  {letter}
                </ThemedText>
              </View>
            );
"""

# replace the block defining backgroundColor and color up to the return statement
text = re.sub(r'let backgroundColor: string.*?\</View\>\s*\);\s*\}\)\}', replacement + '          })}\n', text, flags=re.DOTALL)

# Also update the board styles to have gap or softer look
text = text.replace(
"""  board: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },""",
"""  board: {
    width: '100%',
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: BorderRadius.xl,
    padding: Spacing.one,
    backgroundColor: '#EBEBE3', // very soft cream
  },"""
)

text = text.replace(
"""  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },""",
"""  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },"""
)

with open('src/components/chronosearch/word-grid.tsx', 'w') as f:
    f.write(text)
