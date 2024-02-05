'use client'

import { api } from '@/convex/_generated/api'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}
export default function NewBoardButton({
  orgId,
  disabled,
}: NewBoardButtonProps) {
  const router = useRouter()
  const { mutate, pending } = useApiMutations(api.board.create)
  const handleClick = () => {
    mutate({
      orgId,
      title: 'Untitled',
    })
      .then((id) => {
        toast.success('Board created')
        router.push(`/board/${id}`)
      })
      .catch(() => toast.error('Failed to create board'))
  }
  return (
    <button
      disabled={pending || disabled}
      onClick={handleClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-500 rounded-lg hover:bg-blue-600 flex flex-col items-center justify-center py-6',
        (pending || disabled) && 'cursor-not-allowed opacity-75'
      )}
    >
      <div></div>
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'> New board</p>
    </button>
  )
}
