/**
 * Core types for LearnMate AI.
 * Structured so a real backend / AI API can be swapped in later.
 */

export type TeachingMethod =
  | 'simple explanation'
  | 'example + visual explanation'
  | 'advanced example'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Mastery = 'Needs Support' | 'On Track' | 'Mastered'

export interface TopicSkill {
  topic: string
  /** 0-100 */
  score: number
  attempts: number
  difficulty: Difficulty
  preferredTeachingMethod: TeachingMethod
  status: Mastery
  trend?: number[]
  direction?: 'improving' | 'declining' | 'stable'
}

export interface SubjectPerformance {
  subject: string
  score: number
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  topic: string
  explanation: string
}

export interface QuestionResult {
  questionId: string
  selectedIndex: number
  correct: boolean
  topic: string
  timeSpentSeconds: number
}

export interface AssessmentResult {
  score: number
  total: number
  correctCount: number
  incorrectCount: number
  totalTimeSpentSeconds: number
  gaps: string[]
  strengths: string[]
  analysis: string
  perTopic: Record<string, { correct: number; total: number }>
}

export interface StudyTask {
  id: string
  time: string
  topic: string
  duration: string
  activity: 'Learn' | 'Practice' | 'Review'
  priority: 'High' | 'Medium' | 'Low'
  difficulty: Difficulty
  linkedGap: string
  completed: boolean
}

export interface StudentProfile {
  name: string
  overallProgress: number
  topicsMastered: number
  topicsNeedingAttention: number
  streak: number
  strongAreas: string[]
  weakAreas: string[]
  subjects: SubjectPerformance[]
  topics: TopicSkill[]
}

export interface Insight {
  type: 'improvement' | 'mode' | 'recommendation' | 'warning' | 'success'
  message: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  language?: 'english' | 'tamil' | 'hindi'
  simplified?: boolean
}

export interface TeacherStudent {
  name: string
  topic: string
  mastery: number
  status: Mastery
  gap: string
}

export interface LowConnectivitySettings {
  enabled: boolean
}

export type AppView =
  | 'welcome'
  | 'dashboard'
  | 'assessment'
  | 'adaptive'
  | 'tutor'
  | 'planner'
  | 'progress'
  | 'profile'
  | 'teacher'