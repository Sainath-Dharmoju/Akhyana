with open('src/app/topic/[id].tsx', 'r') as f:
    text = f.read()

text = text.replace("import { ScrollView, StyleSheet, View } from 'react-native';", "import { ScrollView, StyleSheet, View, Pressable } from 'react-native';")

with open('src/app/topic/[id].tsx', 'w') as f:
    f.write(text)
