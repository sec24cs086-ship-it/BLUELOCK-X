import { createContext } from 'react'
import type { LoadingContextValue } from '@/types'

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined)
