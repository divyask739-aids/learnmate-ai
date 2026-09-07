/**
 * ADAPTIVE TEACHING ENGINE
 * ------------------------------------------------------------------
 * THE core innovation of LearnMate AI.
 *
 * We don't just personalize WHAT students learn — we personalize
 * HOW they learn it. This module decides the teaching method and
 * difficulty, then ADAPTS based on live performance.
 *
 * Rules (demo-logic, API-swappable):
 *   score < 40        -> "simple explanation",   difficulty easy
 *   40 <= score < 70  -> "example + visual",       difficulty medium
 *   score >= 70       -> "advanced example",         difficulty hard
 *
 * Repeated mistakes push difficulty DOWN and switch to more visual,
 * step-by-step teaching. Correct answers push difficulty UP.
 */

import type { Difficulty, TeachingMethod } from '@/lib/types'

export interface AdaptiveState {
  topic: string
  currentScore: number
  attempts: number
  incorrectStreak: number
  correctStreak: number
  difficulty: Difficulty
  teachingMethod: TeachingMethod
  explanationHistory: string[]
  lastAdaptation?: {
    fromMethod: TeachingMethod
    toMethod: TeachingMethod
    reason: string
  }
}

const METHOD_LABELS: Record<TeachingMethod, string> = {
  'simple explanation': 'Simple Explanation',
  'example + visual explanation': 'Step-by-Step Visual Explanation',
  'advanced example': 'Advanced Example',
}

export function methodLabel(m: TeachingMethod): string {
  return METHOD_LABELS[m]
}

/** Decide initial teaching method from score. */
export function decideMethod(score: number): TeachingMethod {
  if (score < 40) return 'simple explanation'
  if (score < 70) return 'example + visual explanation'
  return 'advanced example'
}

export function decideDifficulty(score: number): Difficulty {
  if (score < 40) return 'easy'
  if (score < 70) return 'medium'
  return 'hard'
}

/** Simpler difficulty for a given level when a student struggles. */
export function lowerDifficulty(d: Difficulty): Difficulty {
  if (d === 'hard') return 'medium'
  if (d === 'medium') return 'easy'
  return 'easy'
}

/** Richer teaching method when a student needs more support. */
export function richerMethod(m: TeachingMethod): TeachingMethod {
  if (m === 'advanced example') return 'example + visual explanation'
  return 'simple explanation'
}

export function createInitialState(topic: string, initialScore: number): AdaptiveState {
  const method = decideMethod(initialScore)
  return {
    topic,
    currentScore: initialScore,
    attempts: 0,
    incorrectStreak: 0,
    correctStreak: 0,
    difficulty: decideDifficulty(initialScore),
    teachingMethod: method,
    explanationHistory: [METHOD_LABELS[method]],
  }
}

/**
 * The adaptation step. Call this for every practice answer.
 * Returns an updated state plus a human-readable "why" for the UI.
 */
export function adaptAfterAnswer(
  state: AdaptiveState,
  correct: boolean,
): AdaptiveState {
  const prevMethod = state.teachingMethod
  const next: AdaptiveState = { ...state }

  next.attempts += 1

  if (correct) {
    next.correctStreak += 1
    next.incorrectStreak = 0
    next.currentScore = Math.min(100, state.currentScore + 10)

    // After 2 correct in a row, level up.
    if (state.correctStreak >= 1 && state.incorrectStreak === 0) {
      if (state.difficulty === 'easy' && state.teachingMethod === 'simple explanation') {
        next.difficulty = 'medium'
        next.teachingMethod = 'example + visual explanation'
        next.explanationHistory.push(METHOD_LABELS[next.teachingMethod])
        next.lastAdaptation = {
          fromMethod: prevMethod,
          toMethod: next.teachingMethod,
          reason: 'Your understanding is improving — increasing challenge.',
        }
      } else if (state.difficulty === 'medium' && state.teachingMethod === 'example + visual explanation') {
        next.difficulty = 'hard'
        next.teachingMethod = 'advanced example'
        next.explanationHistory.push(METHOD_LABELS[next.teachingMethod])
        next.lastAdaptation = {
          fromMethod: prevMethod,
          toMethod: next.teachingMethod,
          reason: 'Great progress — moving to advanced examples.',
        }
      }
    }
  } else {
    next.incorrectStreak += 1
    next.correctStreak = 0
    next.currentScore = Math.max(5, state.currentScore - 8)

    // Repeated mistakes trigger the "simplify" behavior.
    if (state.incorrectStreak >= 2) {
      if (state.difficulty !== 'easy') {
        next.difficulty = lowerDifficulty(state.difficulty)
      }
      if (state.teachingMethod !== 'simple explanation') {
        next.teachingMethod = richerMethod(state.teachingMethod)
        next.explanationHistory.push(METHOD_LABELS[next.teachingMethod])
        next.lastAdaptation = {
          fromMethod: prevMethod,
          toMethod: next.teachingMethod,
          reason: `${state.incorrectStreak} incorrect answers detected. Simplified the lesson to step-by-step visual teaching.`,
        }
      } else if (state.difficulty === 'easy') {
        next.lastAdaptation = {
          fromMethod: prevMethod,
          toMethod: next.teachingMethod,
          reason: 'Repeated mistakes detected — reinforcing the foundation with extra visual guidance.',
        }
      }
    }
  }

  return next
}