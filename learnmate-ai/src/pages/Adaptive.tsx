import { useState } from 'react'
import { BrainCircuit, Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, Zap, RefreshCw } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, CardHeader, Button, Badge, ProgressBar } from '@/components/ui/primitives'
import { adaptiveEasyQuestions, adaptiveMediumQuestions, adaptiveHardQuestions } from '@/lib/data'
import type { AdaptivePracticeQuestion } from '@/lib/data'
import { createInitialState, adaptAfterAnswer, methodLabel } from '@/lib/adaptiveEngine'
import { cn } from '@/lib/utils'

const TOPIC = 'For Loops'

export function AdaptivePage() {
  const { navigate, lowConnectivity } = useApp()
  const [state, setState] = useState(() => createInitialState(TOPIC, 42))
  const [step, setStep] = useState(0)
  const [questionPhase, setQuestionPhase] = useState<'idle' | 'answered' | 'complete'>('idle')
  const [selected, setSelected] = useState<number | null>(null)
  const [session, setSession] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 })

  const questions: AdaptivePracticeQuestion[] =
    state.difficulty === 'easy'
      ? adaptiveEasyQuestions
      : state.difficulty === 'medium'
        ? adaptiveMediumQuestions
        : adaptiveHardQuestions

  const q = questions[0]
  const right = q.options[q.correctIndex]

  const handleAnswer = (idx: number) => {
    if (questionPhase !== 'idle') return
    setSelected(idx)
    const correct = idx === q.correctIndex
    const newState = adaptAfterAnswer(state, correct)
    setState(newState)
    setSession((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    setQuestionPhase('answered')
  }

  const continueLesson = () => {
    setSelected(null)
    setStep((s) => s + 1)
    setQuestionPhase('idle')
    if (step >= 3) setQuestionPhase('complete')
  }

  const reset = () => {
    setState(createInitialState(TOPIC, 42))
    setStep(0)
    setSession({ correct: 0, total: 0 })
    setQuestionPhase('idle')
    setSelected(null)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="animate-fade-in-up flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Adaptive Teaching Engine</h2>
          <p className="mt-1 text-sm text-slate-500">
            We don&apos;t just personalize WHAT you learn — we personalize HOW you learn it.
          </p>
        </div>
        <Badge variant="violet" className="px-3 py-1">
          <BrainCircuit className="h-3.5 w-3.5" /> Adaptive Engine
        </Badge>
      </div>

      <Card className="animate-fade-in-up">
        <CardHeader
          title="Detected Topic"
          subtitle="From your assessment analysis"
          icon={<BrainCircuit className="h-4 w-4" />}
          action={<Badge variant="warning">Learning Gap Detected</Badge>}
        />
        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500">Detected Topic</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{state.topic}</p>
            <p className="text-xs text-slate-500">Python Programming</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <p className="text-xs font-medium text-amber-600">Learning Difficulty</p>
            <p className="mt-1 text-lg font-bold text-amber-800">Needs Support</p>
            <p className="text-xs text-amber-600">{state.currentScore}% mastery</p>
          </div>
        </div>
      </Card>

      <Card className="animate-fade-in-up">
        <CardHeader
          title="Current Teaching Strategy"
          subtitle="Adapting live to your performance"
          icon={<Zap className="h-4 w-4" />}
          action={<Badge variant={state.difficulty === 'easy' ? 'warning' : state.difficulty === 'medium' ? 'default' : 'success'}>Difficulty: {state.difficulty}</Badge>}
        />
        <div className="p-5">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Teaching Method</span>
            <span className="text-indigo-600">{methodLabel(state.teachingMethod)}</span>
          </div>
          <ProgressBar
            value={state.currentScore}
            color={state.currentScore < 40 ? 'rose' : state.currentScore < 70 ? 'amber' : 'emerald'}
            className="mt-2"
          />
          <p className="mt-1.5 text-xs text-slate-400">Mastery after {state.attempts} practice answer(s)</p>

          {state.lastAdaptation && (
            <div className="mt-4 animate-slide-in-right rounded-lg border border-indigo-100 bg-indigo-50/70 p-3.5">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-indigo-700">
                <RefreshCw className="h-3.5 w-3.5" /> Teaching Method Adapted
              </p>
              <p className="mt-1 text-sm leading-relaxed text-indigo-900">{state.lastAdaptation.reason}</p>
              <p className="mt-1 text-xs text-indigo-700">
                <span className="line-through opacity-60">{methodLabel(state.lastAdaptation.fromMethod)}</span>
                {' '}→ <strong>{methodLabel(state.lastAdaptation.toMethod)}</strong>
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { n: 1, t: 'Simple Explanation', d: 'A loop repeats an action multiple times without writing the same code again.' },
          { n: 2, t: 'Real-world Example', d: 'Imagine checking every student in a classroom one by one — that is a loop over the class!' },
          { n: 3, t: 'Code Example', d: 'See how a Python for-loop prints 0, 1, 2.' },
          { n: 4, t: 'Interactive Practice', d: 'Answer a question. The engine adapts to your result.' },
        ]
          .slice(0, lowConnectivity.enabled ? 4 : 4)
          .map((s, i) => (
            <button
              key={s.n}
              onClick={() => setStep(i)}
              className={cn(
                'animate-fade-in-up rounded-xl border p-4 text-left transition-all',
                step === i ? 'border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-200',
              )}
            >
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">STEP {s.n}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.d}</p>
            </button>
          ))}
      </div>

      {step === 0 && (
        <Card className="animate-fade-in-up">
          <CardHeader title="Simple Explanation" subtitle="The concept, in plain words" icon={<Sparkles className="h-4 w-4" />} />
          <div className="p-6 text-[15px] leading-relaxed text-slate-700">
            A <strong>loop</strong> allows you to <strong>repeat an action multiple times</strong> without writing the
            same code again. Think of it like a sticky note that says "do this 5 times" — the computer follows it
            exactly.
          </div>
          <div className="px-6 pb-6">
            <Button variant="secondary" onClick={() => setStep(1)}>Next: Real-world Example <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card className="animate-fade-in-up">
          <CardHeader title="Real-world Example" subtitle="See it in everyday life" icon={<Sparkles className="h-4 w-4" />} />
          <div className="p-6 text-[15px] leading-relaxed text-slate-700">
            Imagine <strong>checking every student in a classroom one by one</strong>. You do the same action
            (check attendance) for each student. A for-loop in Python does exactly that with a list of items.
          </div>
          <div className="flex flex-col gap-3 px-6 pb-6 sm:flex-row">
            <Button variant="secondary" onClick={() => setStep(2)}>Next: Code Example <ArrowRight className="h-4 w-4" /></Button>
            <Button variant="ghost" onClick={() => setStep(0)}>Go back</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="animate-fade-in-up">
          <CardHeader title="Code Example" subtitle="A simple Python for-loop" icon={<Sparkles className="h-4 w-4" />} />
          <div className="p-6">
            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-emerald-300">{`for i in range(3):
    print(i)`}</pre>
            <p className="mt-3 text-sm text-slate-600">
              <code className="rounded bg-slate-100 px-1.5 py-0.5">range(3)</code> gives the numbers{' '}
              <strong>0, 1, 2</strong>. The loop runs the <code className="rounded bg-slate-100 px-1.5 py-0.5">print</code> line once per number.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => setStep(3)}>Next: Interactive Practice <ArrowRight className="h-4 w-4" /></Button>
              <Button variant="ghost" onClick={() => setStep(1)}>Go back</Button>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="animate-fade-in-up">
          <CardHeader
            title="Interactive Practice"
            subtitle={`This is where the engine adapts to you (${session.correct}/${session.total} correct)`}
            icon={<BrainCircuit className="h-4 w-4" />}
            action={<Badge variant="violet">Adaptive</Badge>}
          />
          <div className="p-6">
            {questionPhase === 'complete' ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">Lesson Complete!</h3>
                <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
                  You scored {session.correct}/{session.total}. Your learning path has been updated.
                </p>
                <div className="mt-5 flex justify-center gap-3">
                  <Button onClick={() => navigate('progress')}>See Updated Progress <ArrowRight className="h-4 w-4" /></Button>
                  <Button variant="outline" onClick={reset}><RotateCcw className="h-4 w-4" /> Restart Lesson</Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-500">{q.prompt}</p>
                {q.code && (
                  <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-emerald-300">{q.code}</pre>
                )}
                <div className="mt-5 space-y-2.5">
                  {q.options.map((opt, i) => {
                    const isSelected = selected === i
                    const revealed = questionPhase === 'answered'
                    const isCorrect = i === q.correctIndex
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        disabled={revealed}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-all',
                          !revealed && isSelected && 'border-indigo-500 bg-indigo-50 text-indigo-900',
                          !revealed && !isSelected && 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200',
                          revealed && isCorrect && 'border-emerald-500 bg-emerald-50',
                          revealed && isSelected && !isCorrect && 'border-rose-500 bg-rose-50',
                          revealed && !isSelected && !isCorrect && 'border-slate-200 bg-white opacity-60',
                        )}
                      >
                        <span className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium',
                          !revealed && isSelected && 'border-indigo-500 bg-indigo-600 text-white',
                          !revealed && !isSelected && 'border-slate-300 text-slate-500',
                          revealed && isCorrect && 'border-emerald-500 bg-emerald-500 text-white',
                          revealed && isSelected && !isCorrect && 'border-rose-500 bg-rose-500 text-white',
                        )}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="whitespace-pre-line">{opt}</span>
                        {revealed && isCorrect && <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" />}
                        {revealed && isSelected && !isCorrect && <XCircle className="ml-auto h-4 w-4 text-rose-500" />}
                      </button>
                    )
                  })}
                </div>

                {questionPhase === 'answered' && (
                  <div
                    className={cn(
                      'mt-5 animate-slide-in-right rounded-lg border p-4',
                      selected === q.correctIndex ? 'border-emerald-100 bg-emerald-50 text-emerald-800' : 'border-rose-100 bg-rose-50 text-rose-800',
                    )}
                  >
                    <p className="font-semibold">
                      {selected === q.correctIndex ? 'Great! Your understanding is improving.' : 'Let us try a simpler explanation.'}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">{q.explanation}</p>
                    <p className="mt-2 text-xs font-medium text-indigo-600">
                      Correct answer: {right}
                    </p>
                    <div className="mt-3">
                      <Button onClick={continueLesson}>
                        {session.total < 2 ? (step >= 3 ? 'Continue' : 'Next Step') : step >= 3 ? 'Try Another' : 'Next'}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}