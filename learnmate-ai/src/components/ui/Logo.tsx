import { GraduationCap, Sparkles } from 'lucide-react'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const text = size === 'sm' ? 'text-sm' : 'text-base'
  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative flex ${box} items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm`}>
        <GraduationCap className="h-5 w-5" aria-hidden />
        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-violet-200" aria-hidden />
      </div>
      <div className="leading-tight">
        <div className={`font-bold ${text} tracking-tight text-slate-900`}>
          LearnMate <span className="text-indigo-600">AI</span>
        </div>
        {size === 'md' && (
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Adaptive Education
          </div>
        )}
      </div>
    </div>
  )
}