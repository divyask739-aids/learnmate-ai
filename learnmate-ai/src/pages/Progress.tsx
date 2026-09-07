import { LineChart, TrendingUp, Lightbulb, Target, Sparkles } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, CardHeader, Badge } from '@/components/ui/primitives'
import { ProgressCard } from '@/components/ui/StatCard'
import { aiInsights, improvementTimeline, gapsTimeline } from '@/lib/data'
import { SimpleChart } from '@/pages/Dashboard'

const insightIcon = {
  improvement: TrendingUp,
  mode: Lightbulb,
  recommendation: Target,
  warning: Sparkles,
  success: Sparkles,
}
const insightColor = {
  improvement: 'text-emerald-600 bg-emerald-50',
  mode: 'text-violet-600 bg-violet-50',
  recommendation: 'text-indigo-600 bg-indigo-50',
  warning: 'text-amber-600 bg-amber-50',
  success: 'text-emerald-600 bg-emerald-50',
}

export function ProgressPage() {
  const { profile } = useApp()

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Progress & Insights</h2>
        <p className="mt-1 text-sm text-slate-500">See how your adaptive learning is improving outcomes.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <p className="text-sm font-medium text-slate-500">Overall Mastery</p>
          <p className="mt-2 text-4xl font-extrabold text-slate-900">{profile.overallProgress}%</p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700" style={{ width: `${profile.overallProgress}%` }} />
          </div>
          <p className="mt-2 text-xs text-emerald-600">+9% this month</p>
        </Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2">
          {profile.subjects.map((s) => (
            <ProgressCard key={s.subject} label={s.subject} value={s.score} />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader title="Improvement Over Time" subtitle="Overall progress across subjects" icon={<LineChart className="h-4 w-4" />} />
        <div className="p-5">
          <SimpleChart labels={improvementTimeline.labels} values={improvementTimeline.overall} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Learning Gap Progress" subtitle="Before vs After Adaptive Learning" icon={<LineChart className="h-4 w-4" />} />
        <div className="p-5">
          <div className="grid gap-6 sm:grid-cols-2">
            {(['loops', 'recursion', 'nestedLoops', 'lists'] as const).map((key) => {
              const [before, after] = gapsTimeline[key]
              const label = key === 'nestedLoops' ? 'Nested Loops' : key[0].toUpperCase() + key.slice(1)
              return (
                <div key={key}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{label}</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <TrendingUp className="h-3.5 w-3.5" /> +{after - before}%
                    </span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-[10px] text-slate-400">Before</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-rose-400" style={{ width: `${before}%` }} />
                      </div>
                      <span className="w-9 text-right text-xs text-slate-500">{before}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-[10px] text-slate-400">After</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${after}%` }} />
                      </div>
                      <span className="w-9 text-right text-xs text-slate-500">{after}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
          <Sparkles className="h-4 w-4 text-violet-500" /> AI Insights
        </h3>
        {aiInsights.map((ins, i) => {
          const Icon = insightIcon[ins.type]
          return (
            <Card key={i} className="animate-fade-in-up flex items-start gap-3 p-4">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${insightColor[ins.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{ins.message}</p>
            </Card>
          )
        })}
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Ready to close the next gap?</h3>
          <p className="mt-0.5 text-xs text-slate-500">The engine recommends practicing Nested Loops next.</p>
        </div>
        <Badge variant="violet">Recommended: Nested Loops</Badge>
      </Card>
    </div>
  )
}