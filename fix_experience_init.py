with open('src/app/experience/[id].tsx', 'r') as f:
    text = f.read()

text = text.replace(
    "const { id } = useLocalSearchParams<{ id: string }>();",
    "const { id, step } = useLocalSearchParams<{ id: string, step?: string }>();"
)

text = text.replace(
    "const [currentStepIndex, setCurrentStepIndex] = useState(0);",
    "const [currentStepIndex, setCurrentStepIndex] = useState(step ? parseInt(step, 10) : 0);"
)

# And one final thing: if they hit NEXT SUBTOPIC -> from the URL, does it just update state?
# Yes, `setCurrentStepIndex((prev) => prev + 1)` will show the next step.
# It won't push a new route, but the URL isn't super important to change on every step as long as it correctly starts at the requested step.
# Wait, what if they click a subtopic in topic/[id].tsx, then go back, then click another one?
# Expo Router's local state might persist if they don't replace the component. 
# We should use an effect to update state if `step` param changes.
add_effect = """  React.useEffect(() => {
    if (step) {
      setCurrentStepIndex(parseInt(step, 10));
    }
  }, [step]);"""

if "useEffect(() => {" not in text:
    text = text.replace("const [isCompleted, setIsCompleted] = useState(false);", "const [isCompleted, setIsCompleted] = useState(false);\n\n" + add_effect)

with open('src/app/experience/[id].tsx', 'w') as f:
    f.write(text)
