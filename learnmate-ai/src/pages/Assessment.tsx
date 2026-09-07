import { useState, useRef, useEffect } from 'react'
import { Clock, CheckCircle2, XCircle, Sparkles, ArrowRight, BrainCircuit, RotateCcw } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, Button, ProgressBar } from '@/components/ui/primitives'
import { assessmentQuestions } from '@/lib/data'
import type { AssessmentResult } from '@/lib/types'
import { cn } from '@/lib/utils'

interface AnswerState {
  selected: number | null
  confirmed: boolean
  timeSpent: number
}

export function AssessmentPage() {
  const { assessmentResult, setAssessmentResult } = useApp()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({})
  const [phase, setPhase] = useState<'answering' | 'result'>('answering')
  const startRef = useRef(Date.now())

  useEffect(() => {
    startRef.current = Date.now()
  }, [current])

  const q = assessmentQuestions[current]
  const state = answers[q.id] ?? { selected: null, confirmed: false, timeSpent: 0 }

  const selectAnswer = (idx: number) => {
    if (state.confirmed) return
    setAnswers((a) => ({
      ...a,
      [q.id]: { ...state, selected: idx, timeSpent: Math.round((Date.now() - startRef.current) / 1000) },
    }))
  }

  const confirmAnswer = () => {
    setAnswers((a) => ({ ...a, [q.id]: { ...(a[q.id] ?? state), confirmed: true } }))
  }

const nextQuestion = () => {
    if (current < assessmentQuestions.length - 1) setCurrent(current + 1)
  }

  const submitAll = () => {
    const correct = assessmentQuestions.reduce(
      (acc, que) => acc + (answers[que.id]?.selected === que.correctIndex ? 1 : 0),
      0,
    )
    const perTopic: Record<string, { correct: number; total: number }> = {}
    for (const que of assessmentQuestions) {
      perTopic[que.topic] = perTopic[que.topic] ?? { correct: 0, total: 0 }
      perTopic[que.topic].total += 1
      if (answers[que.id]?.selected === que.correctIndex) perTopic[que.topic].correct += 1
    }
    const gaps = Object.entries(perTopic)
      .filter(([, v]) => v.correct < v.total)
      .map(([k]) => k)
    const strengths = Object.entries(perTopic)
      .filter(([, v]) => v.correct === v.total)
      .map(([k]) => k)
    const totalTime = assessmentQuestions.reduce((acc, que) => acc + (answers[que.id]?.timeSpent ?? 0), 0)
    const wrongTopics = assessmentQuestions
      .filter((que) => answers[que.id]?.selected !== que.correctIndex)
      .map((que) => que.topic)
    const analysis =
      wrongTopics.length > 0
        ? `Your answers indicate difficulty understanding ${wrongTopics.join(' and ').toLowerCase()} execution and iteration.`
        : 'Excellent! Your answers show strong understanding across all topics.'

    const result: AssessmentResult = {
      score: correct,
      total: assessmentQuestions.length,
      correctCount: correct,
      incorrectCount: assessmentQuestions.length - correct,
      totalTimeSpentSeconds: totalTime,
      gaps,
      strengths,
      analysis,
      perTopic,
    }
    setAssessmentResult(result)
    setPhase('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (phase === 'result' && assessmentResult) {
    return (
      <ResultView
        result={assessmentResult}
        onRetake={() => {
          setAnswers({})
          setCurrent(0)
          setPhase('answering')
          setPhase('answering')
        }}
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="animate-fade-in-up">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Smart Assessment</h2>
        <p className="mt-1 text-sm text-slate-500">
          Python Programming · 5 questions · Let&apos;s find your learning gaps.
        </p>
      </div>

      <Card className="animate-fade-in-up">
        <div className="border-b border-slate-100 px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Question {current + 1} of {assessmentQuestions.length}</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" /> {state.timeSpent}s
            </span>
          </div>
          <ProgressBar value={((current + 1) / assessmentQuestions.length) * 100} className="mt-2" />
        </div>

        <div className="p-5" key={q.id}>
          <p className="text-sm font-semibold text-slate-400">{q.topic}</p>
          <h3 className="mt-2 whitespace-pre-line text-lg font-semibold leading-relaxed text-slate-900">
            {q.question}
          </h3>

          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const selected = state.selected === i
              const revealed = state.confirmed
              const isCorrect = q.correctIndex === i
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  disabled={revealed}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-all',
                    !revealed && selected && 'border-indigo-500 bg-indigo-50 text-indigo-900',
                    !revealed && !selected && 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50',
                    revealed && isCorrect && 'border-emerald-500 bg-emerald-50',
                    revealed && selected && !isCorrect && 'border-rose-500 bg-rose-50',
                    revealed && !selected && !isCorrect && 'border-slate-200 bg-white opacity-60',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
                      !revealed && selected && 'border-indigo-500 bg-indigo-600 text-white',
                      !revealed && !selected && 'border-slate-300 text-slate-500',
                      revealed && isCorrect && 'border-emerald-500 bg-emerald-500 text-white',
                      revealed && selected && !isCorrect && 'border-rose-500 bg-rose-500 text-white',
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="whitespace-pre-line">{opt}</span>
                  {revealed && isCorrect && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" />}
                  {revealed && selected && !isCorrect && <XCircle className="ml-auto h-4 w-4 text-rose-500" />}
                </button>
              )
            })}
          </div>

          {!state.confirmed && state.selected !== null && (
            <div className="mt-5 animate-fade-in-up">
              <Button onClick={confirmAnswer}>Confirm Answer</Button>
            </div>
          )}

          {state.confirmed && (
            <div
              className={cn(
                'mt-5 animate-fade-in-up rounded-lg border p-4 text-sm',
                state.selected === q.correctIndex
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
                  : 'border-rose-100 bg-rose-50 text-rose-800',
              )}
            >
              <p className="font-semibold">
                {state.selected === q.correctIndex ? 'Correct!' : 'Not quite. The correct answer is ' + String.fromCharCode(65 + q.correctIndex) + '.'}
              </p>
              <p className="mt-1 leading-relaxed">{q.explanation}</p>
              <div className="mt-4">
                {current < assessmentQuestions.length - 1 ? (
                  <Button onClick={nextQuestion} variant="secondary">Next Question <ArrowRight className="h-4 w-4" /></Button>
                ) : (
                  <Button onClick={submitAll} variant="success">Submit Assessment <Sparkles className="h-4 w-4" /></Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function ResultView({ result, onRetake }: { result: AssessmentResult; onRetake: () => void }) {
  const { navigate } = useApp()
  const pct = Math.round((result.correctCount / result.total) * 100)
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="animate-fade-in-up overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-200">Assessment Complete</p>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-5xl font-extrabold">{result.correctCount}/{result.total}</p>
              <p className="mt-1 text-sm text-indigo-100">Score · {pct}%</p>
            </div>
            <div className="text-right text-xs text-indigo-100">
              <p>{result.totalTimeSpentSeconds} seconds spent</p>
              <p>{result.incorrectCount} incorrect</p>
            </div>
          </div>
          <ProgressBar value={pct} color="emerald" className="mt-4 bg-white/20" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-violet-600" />
            <h3 className="text-base font-bold text-slate-900">AI Learning Analysis</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.analysis}</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-lg border border-rose-100 bg-rose-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-500">Learning Gap Detected</p>
              <div className="mt-2 space-y-1.5">
                {result.gaps.length > 0 ? (
                  result.gaps.map((g) => (
                    <p key={g} className="flex items-center gap-2 text-sm font-medium text-rose-800">
                      <XCircle className="h-4 w-4" /> {g}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">No gaps detected.</p>
                )}
              </div>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Strong Areas</p>
              <div className="mt-2 space-y-1.5">
                {result.strengths.length > 0 ? (
                  result.strengths.map((g) => (
                    <p key={g} className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                      <CheckCircle2 className="h-4 w-4" /> {g}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">Answer more questions to find strengths.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={() => navigate('adaptive')}>
              Generate My Adaptive Learning Path <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={onRetake}>
              <RotateCcw className="h-4 w-4" /> Retake
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

