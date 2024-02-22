'use client'

import { LucideIcon } from 'lucide-react'

import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'

export interface ToolButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  isActive?: boolean
  isDisabled?: boolean
}

export default function ToolButton({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) {
  return (
    <Hint label={label} side='right' sideOffset={14}>
      <Button
        onClick={onClick}
        variant={isActive ? 'boardActive' : 'board'}
        disabled={isDisabled}
        size='icon'
      >
        <Icon />
      </Button>
    </Hint>
  )
}
