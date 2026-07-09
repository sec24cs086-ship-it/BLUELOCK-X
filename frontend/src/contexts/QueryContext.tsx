import { createContext } from 'react'
import type { QueryClient } from '@tanstack/react-query'

export const QueryContext = createContext<QueryClient | undefined>(undefined)
