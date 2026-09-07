import { Users, AlertTriangle, Activity, Sparkles } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, CardHeader, Badge, Button } from '@/components/ui/primitives'
import { StatCard } from '@/components/ui/StatCard'
import type { TeacherStudent } from '@/lib/types'
import { cn } from '@/lib/utils'

export function TeacherPage() {
  const { teacherStudents, selectedStudent, setSelectedStudent } = useApp()
  const needs = teacherStudents.filter((s) => s.status === 'Needs Support').length

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Teacher Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">Class-wide adaptive insights at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Class Overview" value="32 Students" icon={Users} accent="indigo" />
        <StatCard label="Students Needing Attention" value={needs} icon={AlertTriangle} accent="rose" />
        <StatCard label="Average Class Progress" value="68%" icon={Activity} accent="emerald" />
        <StatCard label="Adaptive Lessons This Week" value="124" icon={Sparkles} accent="violet" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Student Mastery" subtitle="Click a student to view their learning gap" icon={<Users className="h-4 w-4" />} />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-3 py-3 font-medium">Topic</th>
                  <th className="px-3 py-3 font-medium">Mastery</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {teacherStudents.map((s) => (
                  <tr
                    key={s.name}
                    onClick={() => setSelectedStudent(s)}
                    className={cn(
                      'cursor-pointer border-b border-slate-50 transition-colors hover:bg-indigo-50/40',
                      selectedStudent?.name === s.name && 'bg-indigo-50/70',
                    )}
                  >
                    <td className="px-5 py-3 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-3 py-3 text-slate-600">{s.topic}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              s.mastery >= 70 ? 'bg-emerald-500' : s.mastery >= 40 ? 'bg-amber-500' : 'bg-rose-500',
                            )}
                            style={{ width: `${s.mastery}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{s.mastery}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={s.status === 'Needs Support' ? 'danger' : s.status === 'On Track' ? 'default' : 'success'}>
                        {s.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader title="AI Intervention Insights" subtitle="Auto-generated" icon={<Sparkles className="h-4 w-4" />} />
            <div className="space-y-3 p-5">
              <div className="rounded-lg border border-rose-100 bg-rose-50/60 p-3 text-sm text-rose-800">
                <strong>{needs} students</strong> are struggling with loops.
              </div>
              <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3 text-sm text-amber-800">
                <strong>3 students</strong> may need foundational revision.
              </div>
              <div className="rounded-lg border border-indigo-100 bg-indigo-50/60 p-3 text-sm text-indigo-800">
                Adaptive engine recommends visual step-by-step lessons for <strong>{needs} students</strong>.
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Student Learning Gap" subtitle={selectedStudent ? `Remediation for ${selectedStudent.name}` : 'Select a student'} icon={<AlertTriangle className="h-4 w-4" />} />
            <div className="p-5">
              {selectedStudent ? (
                <StudentGapCard student={selectedStudent} />
              ) : (
                <p className="text-sm text-slate-400">Click any student row to see their detected gap and recommended teaching method.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StudentGapCard({ student }: { student: TeacherStudent }) {
  const method = student.mastery < 40 ? 'Simple Explanation' : student.mastery < 70 ? 'Step-by-Step Visual Explanation' : 'Advanced Example'
  return (
    <div className="animate-fade-in-up space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-slate-900">{student.name}</p>
        <Badge variant={student.status === 'Needs Support' ? 'danger' : student.status === 'On Track' ? 'default' : 'success'}>
          {student.status}
        </Badge>
      </div>
      <div className="rounded-lg border border-slate-200 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Learning Gap Detected</p>
        <p className="mt-1 text-sm font-medium text-slate-700">{student.gap}</p>
      </div>
      <div className="rounded-lg border border-violet-100 bg-violet-50/50 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-500">Recommended Teaching Method</p>
        <p className="mt-1 text-sm font-medium text-violet-800">{method}</p>
      </div>
      <Button variant="outline" size="sm" className="w-full">Assign Adaptive Lesson</Button>
    </div>
  )
}