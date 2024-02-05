'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { on } from 'events'

interface ConfirmModalProps {
  children: React.ReactNode
  onConfirm: () => void
  disabled?: boolean
  header: string
  description?: string
}

export default function ConfirmModal({
  children,
  onConfirm,
  disabled,
  header,
  description,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm} disabled={disabled}>
            Confirm
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
