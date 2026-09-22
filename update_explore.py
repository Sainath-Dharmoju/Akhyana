import re

with open('src/app/(tabs)/explore.tsx', 'r') as f:
    text = f.read()

# Change default to 1890s
text = text.replace(
    "const resolvedActiveId = activeDecadeId || 'indus-valley-era';",
    "const resolvedActiveId = activeDecadeId || '1890s';"
)

# Completely remove the "Available now" section which shows active decades as rows (including Indus Valley if it was active)
# It's inside a <View style={styles.section}> <ThemedText type="sectionHeader">Available now</ThemedText> ... </View>
text = re.sub(
    r'\{\/\* Active periods quick-access \*\/\}.*?<\/View>\s*<\/View>\s*<\/ScrollView>',
    '</View>\n        </ScrollView>',
    text,
    flags=re.DOTALL
)

with open('src/app/(tabs)/explore.tsx', 'w') as f:
    f.write(text)
