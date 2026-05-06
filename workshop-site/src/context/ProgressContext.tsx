import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface ProgressState {
  completedSteps: Record<string, boolean>
  toggleStep: (key: string) => void
  isComplete: (key: string) => boolean
}

const ProgressContext = createContext<ProgressState>({
  completedSteps: {},
  toggleStep: () => {},
  isComplete: () => false,
})

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('sfnext-workshop-progress')
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem('sfnext-workshop-progress', JSON.stringify(completedSteps))
  }, [completedSteps])

  const toggleStep = (key: string) => {
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const isComplete = (key: string) => !!completedSteps[key]

  return (
    <ProgressContext.Provider value={{ completedSteps, toggleStep, isComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}
