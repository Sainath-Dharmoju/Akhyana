import re

with open('src/data/ludo.ts', 'r') as f:
    text = f.read()

# I will define new topics and a larger pool of easy questions.
additional_code = """
export const LUDO_TOPICS = [
  { id: 'ancient', title: 'Ancient India', desc: 'Civilizations and early empires' },
  { id: 'monuments', title: 'Monuments', desc: 'Temples, stupas, and structures' },
  { id: 'culture', title: 'Art & Culture', desc: 'Sculpture, trade, and tradition' },
];

export const RAPID_FIRE_QUESTIONS: Record<string, { q: string, options: string[], correct: number }[]> = {
  ancient: [
    { q: 'Which civilization is associated with Harappa?', options: ['Indus Valley', 'Mauryan', 'Chola', 'Gupta'], correct: 0 },
    { q: 'Who was known as the Lion of India?', options: ['Ashoka', 'Lala Lajpat Rai', 'Shivaji', 'Chandragupta'], correct: 1 },
    { q: 'Which emperor spread Buddhism?', options: ['Akbar', 'Rajaraja I', 'Ashoka', 'Kanishka'], correct: 2 },
    { q: 'The Gupta period is often called the:', options: ['Bronze Age', 'Golden Age', 'Iron Age', 'Dark Age'], correct: 1 },
    { q: 'Where is the ancient city of Mohenjo-Daro?', options: ['Indus Valley', 'Ganges Plain', 'Deccan Plateau', 'Himalayas'], correct: 0 },
    { q: 'What material were Harappan seals made of?', options: ['Gold', 'Iron', 'Steatite', 'Wood'], correct: 2 },
  ],
  monuments: [
    { q: 'Where is the Taj Mahal located?', options: ['Delhi', 'Agra', 'Jaipur', 'Mumbai'], correct: 1 },
    { q: 'What is a stupa mainly associated with?', options: ['Hinduism', 'Jainism', 'Buddhism', 'Islam'], correct: 2 },
    { q: 'Which city is famous for the Charminar?', options: ['Hyderabad', 'Bangalore', 'Chennai', 'Pune'], correct: 0 },
    { q: 'The Brihadisvara temple is in:', options: ['Madurai', 'Thanjavur', 'Hampi', 'Mysore'], correct: 1 },
    { q: 'The Sarnath lion capital is from which empire?', options: ['Chola', 'Mughal', 'Mauryan', 'Gupta'], correct: 2 },
    { q: 'Who built the Qutub Minar?', options: ['Qutb-ud-din Aibak', 'Akbar', 'Shah Jahan', 'Babur'], correct: 0 },
  ],
  culture: [
    { q: 'Chola Nataraja images are made of:', options: ['Wood', 'Marble', 'Bronze', 'Gold'], correct: 2 },
    { q: 'Which language is Ashokan edicts mostly written in?', options: ['Sanskrit', 'Prakrit', 'Tamil', 'Persian'], correct: 1 },
    { q: 'Aryabhata was famous for his work in:', options: ['Poetry', 'Sculpture', 'Mathematics', 'Warfare'], correct: 2 },
    { q: 'The Ajanta caves are famous for their:', options: ['Paintings', 'Gardens', 'Palaces', 'Tombs'], correct: 0 },
    { q: 'What did the Indus people trade heavily?', options: ['Silk', 'Cotton', 'Coffee', 'Tea'], correct: 1 },
    { q: 'Which dynasty is famous for naval power?', options: ['Mauryan', 'Gupta', 'Chola', 'Mughal'], correct: 2 },
  ]
};
"""

text += additional_code

with open('src/data/ludo.ts', 'w') as f:
    f.write(text)
