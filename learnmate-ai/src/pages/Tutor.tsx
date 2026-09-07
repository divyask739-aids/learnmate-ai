import { useState } from 'react'
import { Send, Trash2, Sparkles, Languages } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Card, Button } from '@/components/ui/primitives'
import { mockTutorResponse, tutorSuggestedQuestions } from '@/lib/data'
import type { ChatMessage } from '@/lib/types'
import { cn } from '@/lib/utils'

type Language = 'english' | 'tamil' | 'hindi'

const langs: { value: Language; label: string }[] = [
  { value: 'english', label: 'English' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'hindi', label: 'Hindi' },
]

export function TutorPage() {
  const { chatMessages, setChatMessages } = useApp()
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState<Language>('english')
  const [typing, setTyping] = useState(false)

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', content: trimmed, language }
    setChatMessages([...chatMessages, userMsg])
    setInput('')
setTyping(true)
      setTimeout(() => {
        const response: ChatMessage = {
          id: `a${Date.now()}`,
          role: 'assistant',
          content: mockTutorResponse(trimmed, language),
          language,
        }
        setChatMessages((prev) => [...prev, response])
        setTyping(false)
      }, 800)
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-3xl flex-col gap-4">
      <div className="animate-fade-in-up flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">LearnMate AI Tutor</h2>
          <p className="mt-1 text-sm text-slate-500">Ask me anything about your studies.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setChatMessages([])} className="text-slate-500">
          <Trash2 className="h-4 w-4" /> Clear
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Languages className="h-4 w-4 text-slate-400" />
        {langs.map((l) => (
          <button
            key={l.value}
            onClick={() => setLanguage(l.value)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              language === l.value
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 text-slate-500 hover:border-slate-300',
            )}
          >
            {l.label}
          </button>
        ))}
      </div>

      <Card className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-5" style={{ maxHeight: 'calc(100vh - 24rem)' }}>
          {chatMessages.length === 0 && (
            <p className="pt-8 text-center text-sm text-slate-400">Chat cleared. Ask me anything!</p>
          )}
          {chatMessages.map((m) => (
            <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm',
                  m.role === 'user'
                    ? 'rounded-br-md bg-indigo-600 text-white'
                    : 'rounded-bl-md border border-slate-200 bg-white text-slate-700',
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0.15s' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0.3s' }} />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {tutorSuggestedQuestions.map((sq) => (
              <button
                key={sq}
                onClick={() => send(sq)}
                className="rounded-full border border-indigo-100 bg-indigo-50/60 px-3 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
              >
                <Sparkles className="mr-1 inline h-3 w-3" />{sq}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about loops, functions, recursion..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <Button type="submit" disabled={!input.trim()}>
              <Send className="h-4 w-4" /> Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}