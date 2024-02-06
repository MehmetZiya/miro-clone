'use client'

import { useEffect, useState } from 'react'
import { useRenameModal } from '@/store/use-rename-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

export default function RenameModal() {
  const { mutate, pending } = useApiMutations(api.board.update)
  const { isOpen, onClose, initialValues } = useRenameModal()
  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate({ id: initialValues.id, title })
      .then(() => {
        toast.success('Title updated')
        onClose()
      })
      .catch(() => {
        toast.error('Failed to update title')
      })
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board</DialogDescription>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            disabled={pending}
            required
            maxLength={15}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter a new title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline' onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
