import { Play, X, ChevronRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { demoSteps } from '@/lib/data'
import { cn } from '@/lib/utils'

/** SIH Demo Mode — walks judges through the core adaptive flow. */
export function DemoBar() {
  const { demoMode, demoStep, startDemo, advanceDemo, endDemo } = useApp()

  if (!demoMode) {
    return (
      <div className="border-b border-violet-100 bg-violet-50/70 px-4 py-2">
        <button
          onClick={() => startDemo(0)}
          className="flex items-center gap-2 text-sm font-semibold text-violet-700 transition-colors hover:text-violet-900"
        >
          <Play className="h-4 w-4" /> Start SIH Demo — guided tour of LearnMate AI
        </button>
      </div>
    )
  }

  const step = demoSteps[Math.min(demoStep, demoSteps.length - 1)]

  return (
    <div className="border-b border-violet-200 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3">
        <button onClick={endDemo} className="shrink-0 rounded-full bg-white/15 p-1.5 transition-colors hover:bg-white/25" aria-label="Exit demo">
          <X className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-200">
            SIH Demo · Step {demoStep + 1} of {demoSteps.length}
          </p>
          <p className="truncate text-sm font-semibold">{step.label} — {step.desc}</p>
        </div>
        <button
          onClick={advanceDemo}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm transition-colors hover:bg-violet-50"
        >
          Next Step <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="mx-auto mt-2 flex max-w-4xl gap-1">
        {demoSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => startDemo(Math.min(i, demoSteps.length - 1))}
            className={cn('h-1.5 flex-1 rounded-full transition-colors', i <= demoStep ? 'bg-white' : 'bg-white/30')}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}