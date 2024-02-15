import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const COLORS = [
  '#DC2626',
  '#D97706',
  '#059669',
  '#7C3AED',
  '#DB2777',
  '#2563EB',
  '#4B5563',
  '#F87171',
  '#FBBF24',
  '#34D399',
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}
