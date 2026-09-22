import re

with open('src/components/chronosearch/word-grid.tsx', 'r') as f:
    text = f.read()

# Replace PanResponder config
pan_replacement = """
      PanResponder.create({
        onStartShouldSetPanResponder: () => interactionEnabled,
        onStartShouldSetPanResponderCapture: () => interactionEnabled,
        onMoveShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
"""

text = re.sub(r'PanResponder\.create\(\{\s*onStartShouldSetPanResponder: \(\) => interactionEnabled,\s*onStartShouldSetPanResponderCapture: \(\) => interactionEnabled,\s*onMoveShouldSetPanResponder: \(\) => interactionEnabled,\s*onMoveShouldSetPanResponderCapture: \(\) => interactionEnabled,\s*onPanResponderTerminationRequest: \(\) => false,\s*onShouldBlockNativeResponder: \(\) => true,', pan_replacement.strip(), text, flags=re.DOTALL)

with open('src/components/chronosearch/word-grid.tsx', 'w') as f:
    f.write(text)
