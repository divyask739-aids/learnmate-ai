import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = 'indigo',
}: {
  label: string
  value: string | number
  icon: LucideIcon
  hint?: string
  accent?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet'
}) {
  const accents: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    violet: 'bg-violet-50 text-violet-600',
  }
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', accents[accent])}>
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      <p className="mt-0.5 text-sm text-slate-500">{label}</p>
    </Card>
  )
}

export function ProgressCard({
  label,
  value,
  color = 'indigo',
  className,
}: {
  label: string
  value: number
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet'
  className?: string
}) {
  const isGood = value >= 70
  const isBad = value < 40
  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        {isGood && <TrendingUp className="h-4 w-4 text-emerald-500" aria-hidden />}
        {isBad && <TrendingDown className="h-4 w-4 text-rose-500" aria-hidden />}
      </div>
      <p className="mt-1 text-xl font-bold text-slate-900">{value}%</p>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700',
            color === 'indigo' && 'bg-indigo-600',
            color === 'emerald' && 'bg-emerald-500',
            color === 'amber' && 'bg-amber-500',
            color === 'rose' && 'bg-rose-500',
            color === 'violet' && 'bg-violet-500',
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </Card>
  )
}

export function LearningGapCard({
  topic,
  score,
  type = 'gap',
  className,
}: {
  topic: string
  score: number
  type?: 'gap' | 'strong'
  className?: string
}) {
  const isGap = type === 'gap'
  return (
    <div className={cn('rounded-lg border p-3', isGap ? 'border-rose-100 bg-rose-50/60' : 'border-emerald-100 bg-emerald-50/60', className)}>
      <p className={cn('text-[10px] font-semibold uppercase tracking-wider', isGap ? 'text-rose-500' : 'text-emerald-600')}>
        {isGap ? 'Needs Attention' : 'Strong Area'}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{topic}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className={cn('h-full rounded-full', isGap ? 'bg-rose-400' : 'bg-emerald-500')}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-500">{score}% mastery</p>
    </div>
  )
}