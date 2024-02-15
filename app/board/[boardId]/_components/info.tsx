import React from 'react'

import Actions from '@/components/actions'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useRenameModal } from '@/store/use-rename-modal'
import { useQuery } from 'convex/react'
import { SlidersHorizontal } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

interface InfoProps {
  boardId: string
}
const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})
const TabSeparator = () => {
  return <div className='text-neutral-300 px-1.5'>|</div>
}
export default function Info({ boardId }: InfoProps) {
  const { onOpen } = useRenameModal()
  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> })

  if (!data) {
    return <InfoSkeleton />
  }
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      info
    </div>
  )
}
