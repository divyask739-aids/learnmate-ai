import { GraduationCap, Sparkles, Zap, BrainCircuit, ArrowRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/primitives'
import { Logo } from '@/components/ui/Logo'

const features = [
  { icon: ClipboardIcon, title: 'Smart Assessment', desc: 'Pinpoint exactly where learning gaps live.' },
  { icon: BrainCircuit, title: 'Adaptive Teaching Engine', desc: 'We change HOW we teach — not just what.' },
  { icon: Zap, title: 'Real-Time Adaptation', desc: 'Teaching method adapts to every answer.' },
]

export function WelcomePage() {
  const { navigate } = useApp()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 via-white to-white">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Logo />
        <Button variant="ghost" size="sm" onClick={() => navigate('teacher')}>
          Teacher View
        </Button>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-14 pt-6 text-center sm:pt-10">
        <div className="animate-fade-in-up flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1.5 text-xs font-medium text-indigo-700 shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          AI-Powered Adaptive Education
        </div>

        <h1 className="animate-fade-in-up mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Your learning journey,
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            intelligently personalized.
          </span>
        </h1>

        <p className="animate-fade-in-up mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
          <span className="font-semibold text-slate-800">
            We don&apos;t just personalize WHAT students learn — we personalize HOW they learn it.
          </span>
        </p>

        <div className="animate-fade-in-up mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={() => navigate('dashboard')} className="px-8">
            Continue as Student
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8"
            onClick={() => navigate('dashboard')}
          >
            Demo Mode
          </Button>
        </div>

        <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <f.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="animate-fade-in-up mt-10 flex items-center gap-2 text-xs text-slate-400">
          <GraduationCap className="h-4 w-4" aria-hidden />
          Personalized learning. Adaptive teaching. Better outcomes.
        </div>
      </main>
    </div>
  )
}

function ClipboardIcon(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
}