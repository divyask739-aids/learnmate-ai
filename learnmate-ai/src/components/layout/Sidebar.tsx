import {
  LayoutDashboard,
  ClipboardList,
  BrainCircuit,
  MessageCircle,
  CalendarClock,
  LineChart,
  User,
  Users,
  Wifi,
  WifiOff,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { AppView } from '@/lib/types'
import { useApp } from '@/context/AppContext'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const navItems: { label: string; view: AppView; icon: LucideIcon }[] = [
  { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { label: 'Assessment', view: 'assessment', icon: ClipboardList },
  { label: 'Adaptive Learning', view: 'adaptive', icon: BrainCircuit },
  { label: 'AI Tutor', view: 'tutor', icon: MessageCircle },
  { label: 'Study Planner', view: 'planner', icon: CalendarClock },
  { label: 'Progress', view: 'progress', icon: LineChart },
  { label: 'Profile', view: 'profile', icon: User },
  { label: 'Teacher View', view: 'teacher', icon: Users },
]

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { view, navigate } = useApp()
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ label, view: v, icon: Icon }) => {
        const active = view === v
        return (
          <button
            key={v}
            onClick={() => {
              navigate(v)
              onNavigate?.()
            }}
            className={cn(
              'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
            )}
          >
            <Icon className={cn('h-4.5 w-4.5', active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600')} aria-hidden />
            {label}
            {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />}
          </button>
        )
      })}
    </nav>
  )
}

function ConnectivityToggle() {
  const { lowConnectivity, toggleLowConnectivity } = useApp()
  return (
    <button
      onClick={toggleLowConnectivity}
      className={cn(
        'flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
        lowConnectivity.enabled
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50',
      )}
    >
      {lowConnectivity.enabled ? (
        <WifiOff className="h-4 w-4" aria-hidden />
      ) : (
        <Wifi className="h-4 w-4" aria-hidden />
      )}
      {lowConnectivity.enabled ? 'Low Connectivity Mode ON' : 'Low Connectivity Mode'}
    </button>
  )
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 md:hidden" onClick={onClose} aria-hidden />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 md:static md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <Logo />
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 md:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">Alex</p>
              <p className="truncate text-xs text-slate-500">Computer Science</p>
            </div>
          </div>
          <NavList onNavigate={onClose} />
        </div>

        <div className="border-t border-slate-100 p-4">
          <ConnectivityToggle />
        </div>
      </aside>
    </>
  )
}

/** Top bar shown inside content area. */
export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { view, lowConnectivity } = useApp()
  const current = navItems.find((n) => n.view === view)
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-slate-500 hover:text-slate-700 md:hidden"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
          {current?.label ?? 'LearnMate AI'}
        </h1>
      </div>
      {lowConnectivity.enabled && (
        <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 sm:inline-flex">
          <WifiOff className="h-3.5 w-3.5" /> Low Connectivity Mode ON
        </span>
      )}
    </header>
  )
}