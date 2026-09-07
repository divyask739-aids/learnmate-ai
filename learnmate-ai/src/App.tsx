import { useState } from 'react'
import { AppProvider, useApp } from '@/context/AppContext'
import { Sidebar, Navbar } from '@/components/layout/Sidebar'
import { DemoBar } from '@/components/layout/DemoBar'
import { WelcomePage } from '@/pages/Welcome'
import { DashboardPage } from '@/pages/Dashboard'
import { AssessmentPage } from '@/pages/Assessment'
import { AdaptivePage } from '@/pages/Adaptive'
import { TutorPage } from '@/pages/Tutor'
import { PlannerPage } from '@/pages/Planner'
import { ProgressPage } from '@/pages/Progress'
import { ProfilePage } from '@/pages/Profile'
import { TeacherPage } from '@/pages/Teacher'

function Shell() {
  const { view } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (view === 'welcome') return <WelcomePage />

  const page = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardPage />
      case 'assessment':
        return <AssessmentPage />
      case 'adaptive':
        return <AdaptivePage />
      case 'tutor':
        return <TutorPage />
      case 'planner':
        return <PlannerPage />
      case 'progress':
        return <ProgressPage />
      case 'profile':
        return <ProfilePage />
      case 'teacher':
        return <TeacherPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DemoBar />
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">{page()}</main>
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-400">
          LearnMate AI · Personalized learning. Adaptive teaching. Better outcomes.
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}

export default App