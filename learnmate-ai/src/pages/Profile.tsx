import { User, Target, BookOpen, Flame, TrendingUp } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, CardHeader, Badge, ProgressBar } from '@/components/ui/primitives'

export function ProfilePage() {
  const { profile } = useApp()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Profile</h2>
        <p className="mt-1 text-sm text-slate-500">Your learning identity and topic mastery.</p>
      </div>

      <Card className="animate-fade-in-up overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
              A
            </div>
            <div>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-sm text-indigo-100">Computer Science · 2nd Year</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="violet" className="bg-white/20 text-white">Python</Badge>
                <Badge variant="violet" className="bg-white/20 text-white">Mathematics</Badge>
                <Badge variant="violet" className="bg-white/20 text-white">Data Structures</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <Target className="mx-auto h-4 w-4 text-indigo-500" />
            <p className="mt-1 text-xl font-bold text-slate-900">{profile.overallProgress}%</p>
            <p className="text-[11px] text-slate-500">Progress</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <BookOpen className="mx-auto h-4 w-4 text-emerald-500" />
            <p className="mt-1 text-xl font-bold text-slate-900">{profile.topicsMastered}</p>
            <p className="text-[11px] text-slate-500">Mastered</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <Flame className="mx-auto h-4 w-4 text-amber-500" />
            <p className="mt-1 text-xl font-bold text-slate-900">{profile.streak} days</p>
            <p className="text-[11px] text-slate-500">Streak</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <TrendingUp className="mx-auto h-4 w-4 text-violet-500" />
            <p className="mt-1 text-xl font-bold text-slate-900">+9%</p>
            <p className="text-[11px] text-slate-500">This Month</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Topic Mastery" subtitle="Detailed view of every topic" icon={<User className="h-4 w-4" />} />
        <div className="divide-y divide-slate-100">
          {profile.topics.map((t) => (
            <div key={t.topic} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <div className="min-w-40 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">{t.topic}</p>
                  <p className="text-xs font-medium text-slate-500">prefers {t.preferredTeachingMethod}</p>
                </div>
                <ProgressBar
                  value={t.score}
                  color={t.score >= 70 ? 'emerald' : t.score >= 40 ? 'amber' : 'rose'}
                  className="mt-2"
                />
              </div>
              <Badge variant={t.status === 'Mastered' ? 'success' : t.status === 'On Track' ? 'default' : 'warning'}>
                {t.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}