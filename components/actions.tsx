'use client'

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Link2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'

interface ActionsProps {
  children: React.ReactNode
  side?: DropdownMenuContentProps['side']
  sideOffset?: DropdownMenuContentProps['sideOffset']
  id: string
  title: string
}

export default function Actions({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) {
  const { mutate, pending } = useApiMutations(api.board.remove)

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success('Link copied')
      })
      .catch(() => {
        toast.error('Failed to copy link')
      })
  }

  const handleDeleteBoard = () => {
    mutate({ id })
      .then(() => {
        toast.success('Board deleted')
      })
      .catch(() => {
        toast.error('Failed to delete board')
      })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuSeparator />
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className='w-60'
      >
        <DropdownMenuItem
          onClick={handleCopyLink}
          className='p-3 cursor-pointer'
        >
          <Link2 className='w-4 h-4 mr-2' />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeleteBoard}
          className='p-3 cursor-pointer'
        >
          <Trash2 className='w-4 h-4 mr-2' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
