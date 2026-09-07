import type {
  AssessmentQuestion,
  ChatMessage,
  StudentProfile,
  StudyTask,
  TeacherStudent,
  Insight,
} from '@/lib/types'

/**
 * DEMO DATA — realistic mock data for the SIH prototype.
 * Replace with API calls later.
 */

export const studentProfile: StudentProfile = {
  name: 'Alex',
  overallProgress: 72,
  topicsMastered: 18,
  topicsNeedingAttention: 4,
  streak: 7,
  strongAreas: ['Variables', 'Functions', 'Basic Python'],
  weakAreas: ['Loops', 'Recursion', 'Lists'],
  subjects: [
    { subject: 'Python', score: 78 },
    { subject: 'Mathematics', score: 64 },
    { subject: 'Data Structures', score: 71 },
  ],
  topics: [
    {
      topic: 'Variables',
      score: 92,
      attempts: 12,
      difficulty: 'medium',
      preferredTeachingMethod: 'advanced example',
      status: 'Mastered',
      trend: [78, 84, 88, 92],
      direction: 'improving',
    },
    {
      topic: 'Functions',
      score: 86,
      attempts: 10,
      difficulty: 'medium',
      preferredTeachingMethod: 'example + visual explanation',
      status: 'Mastered',
      trend: [70, 76, 82, 86],
      direction: 'improving',
    },
    {
      topic: 'Basic Python',
      score: 90,
      attempts: 15,
      difficulty: 'easy',
      preferredTeachingMethod: 'simple explanation',
      status: 'Mastered',
      trend: [80, 85, 86, 90],
      direction: 'improving',
    },
    {
      topic: 'For Loops',
      score: 42,
      attempts: 6,
      difficulty: 'easy',
      preferredTeachingMethod: 'simple explanation',
      status: 'Needs Support',
      trend: [30, 35, 40, 42],
      direction: 'stable',
    },
    {
      topic: 'Nested Loops',
      score: 28,
      attempts: 4,
      difficulty: 'easy',
      preferredTeachingMethod: 'simple explanation',
      status: 'Needs Support',
      trend: [20, 25, 24, 28],
      direction: 'stable',
    },
    {
      topic: 'Recursion',
      score: 35,
      attempts: 5,
      difficulty: 'easy',
      preferredTeachingMethod: 'simple explanation',
      status: 'Needs Support',
      trend: [22, 28, 30, 35],
      direction: 'improving',
    },
    {
      topic: 'Lists',
      score: 58,
      attempts: 7,
      difficulty: 'medium',
      preferredTeachingMethod: 'example + visual explanation',
      status: 'On Track',
      trend: [40, 46, 52, 58],
      direction: 'improving',
    },
    {
      topic: 'Conditional Statements',
      score: 74,
      attempts: 9,
      difficulty: 'medium',
      preferredTeachingMethod: 'example + visual explanation',
      status: 'On Track',
      trend: [58, 64, 70, 74],
      direction: 'improving',
    },
  ],
}

const timeRange = '2026-09-05T08:00:00Z'

export const improvementTimeline = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  overall: [45, 52, 58, 63, 68, 72],
  python: [52, 58, 64, 68, 74, 78],
  math: [41, 47, 52, 58, 61, 64],
  ds: [48, 54, 60, 64, 68, 71],
}

export const gapsTimeline = {
  labels: ['Before Adaptive Learning', 'After Practice'],
  loops: [40, 72],
  recursion: [42, 68],
  nestedLoops: [28, 55],
  lists: [50, 71],
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'Which of the following correctly defines a variable in Python?',
    options: [
      'x := 5',
      'x = 5',
      'let x = 5',
      'int x = 5',
    ],
    correctIndex: 1,
    topic: 'Variables',
    explanation: 'In Python, variables are assigned with a single equals sign: x = 5. No data type keyword is needed.',
  },
  {
    id: 'q2',
    question: 'What will the following code print?\n\nfor i in range(3):\n    print(i)',
    options: ['1 2 3', '0 1 2', '0 1 2 3', '1 2'],
    correctIndex: 1,
    topic: 'For Loops',
    explanation: 'range(3) generates 0, 1, 2. The loop prints each value, so the output is 0 1 2.',
  },
  {
    id: 'q3',
    question: 'What is the output of this conditional?\n\nif 10 > 5:\n    print("big")\nelse:\n    print("small")',
    options: ['small', 'big', 'big small', 'None of the above'],
    correctIndex: 1,
    topic: 'Conditional Statements',
    explanation: 'Since 10 > 5 is True, the if-branch runs and prints "big".',
  },
  {
    id: 'q4',
    question: 'How many times does the inner loop run for the following code?\n\nfor i in range(2):\n    for j in range(3):\n        print(i, j)',
    options: ['2', '3', '6', '9'],
    correctIndex: 2,
    topic: 'Nested Loops',
    explanation: 'The outer loop runs 2 times, and the inner loop runs 3 times each time → 2 × 3 = 6 iterations.',
  },
  {
    id: 'q5',
    question: 'What does the following code do?\n\ndef add(a, b):\n    return a + b',
    options: [
      'Prints the sum of a and b',
      'Returns the sum of a and b',
      'Duplicates a and b',
      'Runs forever',
    ],
    correctIndex: 1,
    topic: 'Functions',
    explanation: 'The return statement sends the sum back to the caller, it does not print.',
  },
]

/** Questions used by the Adaptive Teaching Engine (loop lesson). */
export interface AdaptivePracticeQuestion {
  id: string
  prompt: string
  code?: string
  options: string[]
  correctIndex: number
  explanation: string
  level: 'easy' | 'medium' | 'hard'
}

export const adaptiveEasyQuestions: AdaptivePracticeQuestion[] = [
  {
    id: 'ae1',
    prompt: 'What will this loop print?',
    code: 'for i in range(3):\n    print(i)',
    options: ['0 1 2', '1 2 3', '0 1 2 3', '1 2'],
    correctIndex: 0,
    level: 'easy',
    explanation: 'range(3) gives 0, 1, 2 → the loop prints each, one per line.',
  },
  {
    id: 'ae2',
    prompt: 'How many times will the word "Hi" be printed?',
    code: 'for i in range(4):\n    print("Hi")',
    options: ['3', '4', '5', '2'],
    correctIndex: 1,
    level: 'easy',
    explanation: 'range(4) runs the body exactly 4 times.',
  },
  {
    id: 'ae3',
    prompt: 'What is the first number printed?',
    code: 'for x in range(5):\n    print(x)',
    options: ['1', '0', '5', '-1'],
    correctIndex: 1,
    level: 'easy',
    explanation: 'range starts counting at 0, so the first printed value is 0.',
  },
]

export const adaptiveMediumQuestions: AdaptivePracticeQuestion[] = [
  {
    id: 'am1',
    prompt: 'What is the sum of all numbers printed?',
    code: 'total = 0\nfor i in range(1, 4):\n    total = total + i\nprint(total)',
    options: ['3', '6', '4', '9'],
    correctIndex: 1,
    level: 'medium',
    explanation: 'The loop adds 1 + 2 + 3 = 6.',
  },
  {
    id: 'am2',
    prompt: 'How many times does "x" print?',
    code: 'for i in range(2):\n    for j in range(2):\n        print("x")',
    options: ['2', '4', '6', '8'],
    correctIndex: 1,
    level: 'medium',
    explanation: 'Outer loop runs 2 times, inner runs 2 times each → 2 × 2 = 4 prints.',
  },
  {
    id: 'am3',
    prompt: 'What does this loop print?',
    code: 'words = ["AI", "EdTech", "SIH"]\nfor w in words:\n    print(w[0])',
    options: ['A E S', 'A I E', 'AI EdTech SIH', 'i h H'],
    correctIndex: 0,
    level: 'medium',
    explanation: 'w[0] takes the first character of each word: A, E, S.',
  },
]

export const adaptiveHardQuestions: AdaptivePracticeQuestion[] = [
  {
    id: 'ah1',
    prompt: 'What is the final value of count?',
    code: 'count = 0\nfor i in range(5):\n    if i % 2 == 0:\n        count += 1\nprint(count)',
    options: ['2', '3', '4', '5'],
    correctIndex: 1,
    level: 'hard',
    explanation: 'Even values 0, 2, 4 satisfy i % 2 == 0 → count increments 3 times.',
  },
  {
    id: 'ah2',
    prompt: 'Which pattern does this loop print?',
    code: 'for i in range(1, 4):\n    print("*" * i)',
    options: [
      '*\n**\n***',
      '***\n**\n*',
      '* * *',
      '*** *** ***',
    ],
    correctIndex: 0,
    level: 'hard',
    explanation: 'Each row has i stars: row 1 has 1, row 2 has 2, row 3 has 3.',
  },
  {
    id: 'ah3',
    prompt: 'What is the output?',
    code: 'result = 1\nfor i in [1, 2, 3]:\n    result = result * i\nprint(result)',
    options: ['6', '3', '1', '10'],
    correctIndex: 0,
    level: 'hard',
    explanation: 'result = 1 × 1 × 2 × 3 = 6.',
  },
]

export const initialStudyPlan: StudyTask[] = [
  {
    id: 'task1',
    time: '09:00',
    topic: 'Python Loops',
    duration: '20 min',
    activity: 'Learn',
    priority: 'High',
    difficulty: 'easy',
    linkedGap: 'For Loops',
    completed: false,
  },
  {
    id: 'task2',
    time: '09:30',
    topic: 'Loop Practice',
    duration: '15 min',
    activity: 'Practice',
    priority: 'High',
    difficulty: 'medium',
    linkedGap: 'For Loops',
    completed: false,
  },
  {
    id: 'task3',
    time: '10:00',
    topic: 'Recursion Basics',
    duration: '20 min',
    activity: 'Learn',
    priority: 'High',
    difficulty: 'easy',
    linkedGap: 'Recursion',
    completed: false,
  },
  {
    id: 'task4',
    time: '10:30',
    topic: 'Nested Loops',
    duration: '15 min',
    activity: 'Learn',
    priority: 'Medium',
    difficulty: 'medium',
    linkedGap: 'Nested Loops',
    completed: false,
  },
  {
    id: 'task5',
    time: '11:00',
    topic: 'Functions Review',
    duration: '10 min',
    activity: 'Review',
    priority: 'Low',
    difficulty: 'medium',
    linkedGap: 'Functions',
    completed: false,
  },
]

export const teacherStudents: TeacherStudent[] = [
  { name: 'Alex', topic: 'Loops', mastery: 42, status: 'Needs Support', gap: 'Confusion between range() start and stop values' },
  { name: 'Sam', topic: 'Functions', mastery: 78, status: 'On Track', gap: 'Minor confusion with return vs print' },
  { name: 'Priya', topic: 'Recursion', mastery: 35, status: 'Needs Support', gap: 'Difficulty understanding the base case' },
  { name: 'Rohan', topic: 'Lists', mastery: 66, status: 'On Track', gap: 'Indexing off-by-one errors' },
  { name: 'Meera', topic: 'Nested Loops', mastery: 30, status: 'Needs Support', gap: 'Does not see outer × inner iteration counts' },
  { name: 'Kavya', topic: 'Variables', mastery: 91, status: 'Mastered', gap: 'No current gap' },
  { name: 'Arjun', topic: 'Loops', mastery: 55, status: 'Needs Support', gap: 'Off-by-one with range(n) vs range(n+1)' },
  { name: 'Ishaan', topic: 'Functions', mastery: 70, status: 'On Track', gap: 'Scope of variables inside functions' },
]

export const aiInsights: Insight[] = [
  {
    type: 'improvement',
    message: 'Your performance in Python loops improved by 32%.',
  },
  {
    type: 'mode',
    message: 'Your strongest learning mode appears to be step-by-step examples.',
  },
  {
    type: 'recommendation',
    message: 'Recommended next topic: Nested Loops.',
  },
  {
    type: 'success',
    message: 'Your learning path has been updated.',
  },
]

export const tutorSuggestedQuestions = [
  'Explain loops simply',
  'Why do we use functions?',
  'Give me an example',
  'Test me on Python',
]

/**
 * Mock AI Tutor response generator.
 * Replace with a real LLM / instructor-backed API later.
 */
export function mockTutorResponse(
  input: string,
  language: 'english' | 'tamil' | 'hindi',
): string {
  const q = input.toLowerCase()

  if (q.includes('loop')) {
    return lang(
      language,
      'A loop repeats a block of code a certain number of times. Think of it like telling a robot "do this 5 times" — it executes the same steps again and again without you writing them twice.',
      'ஒரு லூப் (loop) என்பது ஒரு குறிப்பிட்ட எண்ணிக்கை முறை ஒரே குறியீட்டை மீண்டும் இயக்க உதவுகிறது. இது ஒரு ரோபோட்டிடம் "இதை 5 முறை செய்" என்று சொல்வது போன்றது.',
      'एक लूप एक कोड ब्लॉक को कई बार दोहराता है। यह एक रोबोट से यह कहने जैसा है कि "इसे 5 बार करें" — आपको कोड दोबारा नहीं लिखना पड़ता।',
    )
  }
  if (q.includes('function')) {
    return lang(
      language,
      'Functions let you bundle a set of instructions into a single named block you can reuse. They keep code organized, avoid repetition, and make your logic easier to test.',
      'ஃபங்ஷன்கள் ஒரு குழு குறியீட்டு வழிமுறைகளை ஒரே பெயரிடப்பட்ட தொகுப்பாக மாற்றி, மீண்டும் மீண்டும் பயன்படுத்த உதவுகின்றன. இது குறியீட்டை ஒழுங்காக வைக்கிறது.',
      'फ़ंक्शन आपको निर्देशों के एक सेट को एक नामित ब्लॉक में बाँध कर बार-बार उपयोग करने देते हैं। यह कोड को व्यवस्थित रखता है और दोहराव कम करता है।',
    )
  }
  if (q.includes('example')) {
    return lang(
      language,
      'Here is a simple example. To print numbers 0 to 4:\n\nfor i in range(5):\n    print(i)\n\nThis runs the print statement 5 times. Want me to make it more challenging?',
      'இதோ ஒரு எளிய உதாரணம். 0 முதல் 4 வரை அச்சிட:\n\nfor i in range(5):\n    print(i)\n\nஇந்த பிரிண்ட் கட்டளை 5 முறை இயங்கும்.',
      'यहाँ एक सरल उदाहरण है। 0 से 4 तक प्रिंट करने के लिए:\n\nfor i in range(5):\n    print(i)\n\nयह print स्टेटमेंट 5 बार चलाता है।',
    )
  }
  if (q.includes('test') || q.includes('quiz') || q.includes('question')) {
    return lang(
      language,
      'Sure! Quick test for you: What does range(3) print when used in a for loop? Try 1 2 3, 0 1 2, or 0 1 2 3. Type your answer and I will check it.',
      'சரி! உங்களுக்கு ஒரு விரைவு தேர்வு: range(3) ஒரு லூப்பில் பயன்படுத்தினால் எதை அச்சிடும்? 1 2 3, 0 1 2, அல்லது 0 1 2 3. உங்கள் பதிலை தட்டச்சு செய்யுங்கள்.',
      'ठीक है! एक त्वरित प्रश्न: range(3) for लूप में क्या प्रिंट करता है? विकल्प: 1 2 3, 0 1 2, या 0 1 2 3। अपना उत्तर टाइप करें।',
    )
  }
  if (q.includes('recursion')) {
    return lang(
      language,
      'Recursion is when a function calls itself to solve a smaller version of the same problem. It always needs a base case so the process stops, otherwise it runs forever.',
      'ரிகர்ஷன் என்பது ஒரு ஃபங்ஷன் தன்னையே அழைத்து, ஒரு சிறிய பிரச்சனையை தீர்ப்பது. எப்போதும் ஒரு base case இருக்க வேண்டும், இல்லையெனில் அது எப்போதும் இயங்கிக்கொண்டே இருக்கும்.',
      'रिकर्शन तब होता है जब कोई फ़ंक्शन स्वयं को कॉल कर समस्या का छोटा संस्करण हल करता है। इसे रोकने के लिए base case ज़रूरी है।',
    )
  }
  return lang(
    language,
    `Great question! For "${input}" — I would recommend breaking the concept into small pieces and practicing one at a time. Want to start with an adaptive lesson on that topic? I can also explain it in simplified or detailed mode.`,
    `நல்ல கேள்வி! "${input}" க்கு — நான் கருத்தை சிறு பகுதிகளாக பிரித்து, ஒவ்வொன்றாக பயிற்சி செய்ய பரிந்துரைக்கிறேன். இந்த தலைப்பில் அடாப்டிவ் பாடம் தொடங்க விரும்புகிறீர்களா?`,
    `अच्छा प्रश्न! "${input}" के लिए — मैं अवधारणा को छोटे हिस्सों में विभाजित कर अभ्यास करने की सलाह देता हूँ। क्या आप इस विषय पर एक adaptive पाठ शुरू करना चाहेंगे?`,
  )
}

function lang(l: 'english' | 'tamil' | 'hindi', en: string, ta: string, hi: string) {
  if (l === 'tamil') return ta
  if (l === 'hindi') return hi
  return en
}

export const initialChat: ChatMessage[] = [
  {
    id: 'msg-init',
    role: 'assistant',
    content:
      'Hi Alex! I am your LearnMate AI Tutor. Ask me anything about loops, functions, recursion, or any topic you are studying. I can also simplify explanations for you.',
    language: 'english',
  },
]

export function getTopicStatus(score: number): 'Mastered' | 'On Track' | 'Needs Support' {
  if (score >= 70) return 'Mastered'
  if (score >= 50) return 'On Track'
  return 'Needs Support'
}

export const demoSteps = [
  {
    label: 'Take Assessment',
    desc: 'Answer 5 questions covering Python basics.',
    path: 'assessment',
  },
  {
    label: 'Detect Learning Gap',
    desc: 'AI analyzes incorrect answers and pinpoints weak topics.',
    path: 'assessment',
  },
  {
    label: 'Open Adaptive Teaching Engine',
    desc: 'The engine chooses HOW to teach the detected gap.',
    path: 'adaptive',
  },
  {
    label: 'Show Personalized Teaching',
    desc: 'Simple explanation, analogy, code, and practice.',
    path: 'adaptive',
  },
  {
    label: 'Answer Practice Questions',
    desc: 'Answer correctly to level up, or get simpler help.',
    path: 'adaptive',
  },
  {
    label: 'Show Adaptation',
    desc: 'Watch the teaching method change to match you.',
    path: 'adaptive',
  },
  {
    label: 'Show Updated Progress',
    desc: 'Your dashboard, planner and progress update automatically.',
    path: 'dashboard',
  },
]

export const timeRangeConst = timeRange