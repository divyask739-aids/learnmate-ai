import {
  Target,
  BookOpen,
  AlertTriangle,
  Flame,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, CardHeader, Button, Badge } from '@/components/ui/primitives'
import { StatCard, LearningGapCard } from '@/components/ui/StatCard'
import { improvementTimeline } from '@/lib/data'
import { cn } from '@/lib/utils'

export function DashboardPage() {
  const { profile, navigate, studyPlan, lowConnectivity } = useApp()
  const hours = new Date().getHours()

  return (
    <div className={cn('space-y-6', lowConnectivity.enabled && 'animate-fade-in')}>
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Good {hours < 12 ? 'morning' : hours < 17 ? 'afternoon' : 'evening'}, Alex 👋
        </h2>
        <p className="mt-1 text-sm text-slate-500">Let&apos;s continue your personalized learning journey.</p>
      </div>

      {profile.weakAreas.length > 0 && (
        <div className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm text-indigo-800">
          <BrainCircuit className="h-5 w-5 shrink-0" aria-hidden />
          <span>
            <strong>Learning Gap Detected:</strong> 4 topics need attention. Your learning path has been updated.
          </span>
          <button onClick={() => navigate('adaptive')} className="ml-auto inline-flex shrink-0 items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900">
            Start now <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Overall Progress" value={`${profile.overallProgress}%`} icon={Target} accent="indigo" />
        <StatCard label="Topics Mastered" value={profile.topicsMastered} icon={BookOpen} accent="emerald" />
        <StatCard label="Topics Needing Attention" value={profile.topicsNeedingAttention} icon={AlertTriangle} accent="rose" />
        <StatCard label="Learning Streak" value={`${profile.streak} days`} icon={Flame} accent="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Your Learning Insights"
            subtitle="Based on your recent assessments"
            icon={<Sparkles className="h-4 w-4" />}
          />
          <div className="p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600">Strong Areas</p>
                <div className="space-y-2.5">
                  {profile.strongAreas.map((a) => (
                    <LearningGapCard key={a} topic={a} score={85} type="strong" />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-500">Needs Attention</p>
                <div className="space-y-2.5">
                  {profile.weakAreas.map((a) => (
                    <LearningGapCard key={a} topic={a} score={40} type="gap" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Recommended For You"
            subtitle="AI Learning Insight"
            icon={<Target className="h-4 w-4" />}
          />
          <div className="p-5">
            <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
              <Badge variant="violet" className="mb-2">High Priority</Badge>
              <h3 className="text-base font-bold text-slate-900">Python Loops</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                You made <strong>3 mistakes</strong> in loop-related questions in your last assessment.
              </p>
              <Button className="mt-4 w-full" onClick={() => navigate('adaptive')}>
                Start Adaptive Lesson
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Today's Goals" subtitle="Your adaptive plan" icon={<CheckCircle2 className="h-4 w-4" />} />
          <div className="space-y-3 p-5">
            {['Complete Python Loops lesson', 'Practice 5 questions', 'Review Functions'].map((g, i) => (
              <div key={g} className="flex items-center gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700">{g}</p>
              </div>
            ))}
            {studyPlan.filter((t) => t.completed).length > 0 && (
              <p className="pt-1 text-xs text-emerald-600">
                {studyPlan.filter((t) => t.completed).length} goal(s) completed today
              </p>
            )}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Improvement Over Time" subtitle="Overall progress" icon={<Target className="h-4 w-4" />} />
          <div className="p-5">
            <SimpleChart labels={improvementTimeline.labels} values={improvementTimeline.overall} />
          </div>
        </Card>
      </div>
    </div>
  )
}

export function SimpleChart({ labels, values }: { labels: string[]; values: number[] }) {
  const max = Math.max(...values, 100)
  return (
    <div className="flex h-40 items-end gap-3">
      {values.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-700">{v}%</span>
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-400 transition-all duration-700"
            style={{ height: `${(v / max) * 100}%`, minHeight: '8px' }}
          />
          <span className="text-[10px] text-slate-400">{labels[i]}</span>
        </div>
      ))}
    </div>
  )
}