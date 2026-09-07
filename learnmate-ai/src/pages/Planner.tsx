import { CalendarClock, Check, Clock3, AlertTriangle, Target } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, Badge, Button } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

export function PlannerPage() {
  const { studyPlan, toggleTask, navigate } = useApp()
  const completed = studyPlan.filter((t) => t.completed).length
  const priorityIcon = { High: AlertTriangle, Medium: Clock3, Low: Check }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Personalized Study Plan</h2>
        <p className="mt-1 text-sm text-slate-500">
          Built from your learning gaps: {studyPlan.filter((t) => !t.completed).length} task(s) remaining today · {completed} done
        </p>
      </div>

      {studyPlan.some((t) => !t.completed && t.linkedGap) && (
        <div className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm text-indigo-800">
          <Target className="h-5 w-5 shrink-0" aria-hidden />
          <span><strong>AI Learning Insight:</strong> This plan targets your detected gaps — Loops and Recursion.</span>
        </div>
      )}

      <div className="space-y-3">
        {studyPlan.map((task) => {
          const PIcon = priorityIcon[task.priority]
          return (
            <Card
              key={task.id}
              className={cn(
                'animate-fade-in-up flex items-center gap-4 p-4 transition-opacity',
                task.completed && 'opacity-60',
              )}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  task.completed ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 hover:border-indigo-400',
                )}
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {task.completed && <Check className="h-4 w-4" />}
              </button>

              <div className="w-14 shrink-0 text-sm font-bold text-slate-800">{task.time}</div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">{task.topic}</p>
                  <Badge variant={task.activity === 'Learn' ? 'violet' : task.activity === 'Practice' ? 'warning' : 'default'}>
                    {task.activity}
                  </Badge>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 className="h-3 w-3" /> {task.duration} · Gap: <span className="font-medium text-slate-700">{task.linkedGap}</span>
                </p>
              </div>

              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <PIcon className={cn('h-4 w-4', task.priority === 'High' ? 'text-rose-500' : task.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500')} />
                <span className="text-xs font-medium text-slate-500">{task.priority}</span>
                <Badge variant="outline">{task.difficulty}</Badge>
              </div>
            </Card>
          )
        })}
      </div>

      {completed === studyPlan.length && (
        <Card className="p-8 text-center">
          <CalendarClock className="mx-auto h-10 w-10 text-emerald-500" />
          <h3 className="mt-3 text-lg font-bold text-slate-900">Today's plan complete!</h3>
          <p className="mt-1 text-sm text-slate-500">You crushed every task. Keep the momentum going.</p>
          <Button className="mt-4" onClick={() => navigate('adaptive')}>Start Another Adaptive Lesson</Button>
        </Card>
      )}
    </div>
  )
}