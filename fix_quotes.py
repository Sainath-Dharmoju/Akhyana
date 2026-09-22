with open('src/data/experiences.ts', 'r') as f:
    text = f.read()

text = text.replace("'Tebhaga'—retaining", "\\'Tebhaga\\'—retaining")
text = text.replace("preserve Ambedkar\\'s \"Grammar", "preserve Ambedkar\\'s \\\"Grammar")

with open('src/data/experiences.ts', 'w') as f:
    f.write(text)

with open('src/data/topics.ts', 'r') as f:
    topics_text = f.read()

# Fix in topics if any
topics_text = topics_text.replace("world\\'s largest", "world\\'s largest")

with open('src/data/topics.ts', 'w') as f:
    f.write(topics_text)
