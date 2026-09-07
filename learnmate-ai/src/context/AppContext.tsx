import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type {
  AppView,
  AssessmentQuestion,
  AssessmentResult,
  ChatMessage,
  StudentProfile,
  StudyTask,
  TeacherStudent,
  LowConnectivitySettings,
} from '@/lib/types'
import {
  assessmentQuestions,
  initialChat,
  initialStudyPlan,
  studentProfile,
  teacherStudents,
} from '@/lib/data'

interface AppContextShape {
  view: AppView
  navigate: (view: AppView) => void

  profile: StudentProfile
  updateProfile: (fn: (p: StudentProfile) => StudentProfile) => void

  assessmentQuestions: AssessmentQuestion[]
  assessmentResult: AssessmentResult | null
  setAssessmentResult: (r: AssessmentResult | null) => void
  assessmentAttempted: boolean

  studyPlan: StudyTask[]
  toggleTask: (id: string) => void

  chatMessages: ChatMessage[]
  setChatMessages: (m: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void

  teacherStudents: TeacherStudent[]
  selectedStudent: TeacherStudent | null
  setSelectedStudent: (s: TeacherStudent | null) => void

  lowConnectivity: LowConnectivitySettings
  toggleLowConnectivity: () => void

  demoMode: boolean
  demoStep: number
  startDemo: (initial?: number) => void
  advanceDemo: () => void
  endDemo: () => void
}

const AppContext = createContext<AppContextShape | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<AppView>('welcome')
  const [profile, setProfile] = useState<StudentProfile>(studentProfile)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [studyPlan, setStudyPlan] = useState<StudyTask[]>(initialStudyPlan)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChat)
  const [selectedStudent, setSelectedStudent] = useState<TeacherStudent | null>(null)
  const [lowConnectivity, setLowConnectivity] = useState<LowConnectivitySettings>({ enabled: false })
  const [demoMode, setDemoMode] = useState(false)
  const [demoStep, setDemoStep] = useState(0)

  const navigate = useCallback((v: AppView) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const updateProfile = useCallback(
    (fn: (p: StudentProfile) => StudentProfile) => setProfile(fn),
    [],
  )

  const setChat = useCallback(
    (m: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) =>
      setChatMessages((prev) => (typeof m === 'function' ? (m as (p: ChatMessage[]) => ChatMessage[])(prev) : m)),
    [],
  )

  const toggleTask = useCallback((id: string) => {
    setStudyPlan((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }, [])

  const toggleLowConnectivity = useCallback(
    () => setLowConnectivity((s) => ({ enabled: !s.enabled })),
    [],
  )

  const startDemo = useCallback(
    (initial = 0) => {
      setDemoMode(true)
      setDemoStep(initial)
      const steps = [
        'assessment',
        'assessment',
        'adaptive',
        'adaptive',
        'adaptive',
        'adaptive',
        'dashboard',
      ]
      setView(steps[initial] as AppView)
    },
    [],
  )

  const advanceDemo = useCallback(() => {
    setDemoStep((step) => {
      const next = step + 1
      const steps = [
        'assessment',
        'assessment',
        'adaptive',
        'adaptive',
        'adaptive',
        'adaptive',
        'dashboard',
      ]
      if (next < steps.length) setView(steps[next] as AppView)
      else setDemoMode(false)
      return next
    })
  }, [])

  const endDemo = useCallback(() => {
    setDemoMode(false)
    setDemoStep(0)
    setView('dashboard')
  }, [])

  const value = useMemo<AppContextShape>(
    () => ({
      view,
      navigate,
      profile,
      updateProfile,
      assessmentQuestions,
      assessmentResult,
      setAssessmentResult,
      assessmentAttempted: assessmentResult !== null,
      studyPlan,
      toggleTask,
chatMessages,
      setChatMessages: setChat,
      teacherStudents,
      selectedStudent,
      setSelectedStudent,
      lowConnectivity,
      toggleLowConnectivity,
      demoMode,
      demoStep,
      startDemo,
      advanceDemo,
      endDemo,
    }),
    [
      view,
      navigate,
      profile,
      updateProfile,
      assessmentResult,
      studyPlan,
      toggleTask,
      chatMessages,
      selectedStudent,
      lowConnectivity,
      toggleLowConnectivity,
      demoMode,
      demoStep,
      startDemo,
      advanceDemo,
      endDemo,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextShape {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

