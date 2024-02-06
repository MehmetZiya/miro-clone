'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

import { Skeleton } from '@/components/ui/skeleton'
import Overlay from './overlay'
import { useAuth } from '@clerk/nextjs'
import { MoreHorizontal } from 'lucide-react'
import Footer from './footer'
import Actions from '@/components/actions'
import { useApiMutations } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

interface BoardCardProps {
  id: string
  title: string
  imageUrl: string
  authorId: string
  authorName: string
  createdAt: number
  orgId: string
  isFavorite: boolean
}

export default function BoardCard({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) {
  const { userId } = useAuth()
  const authorLabel = userId === authorId ? 'You' : authorName
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true })

  const { mutate: handleFavorite, pending: pendingFavorite } = useApiMutations(
    api.board.favorite
  )
  const { mutate: handleUnfavorite, pending: pendingUnfavorite } =
    useApiMutations(api.board.unfavorite)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleUnfavorite({ id })
        .then(() => {
          toast.success('Board removed from favorite')
        })
        .catch(() => {
          toast.error('Failed to unfavorite board')
        })
    } else {
      handleFavorite({ id, orgId })
        .then(() => {
          toast.success('Board added to favorite')
        })
        .catch(() => {
          toast.error('Failed to favorite board')
        })
    }
  }
  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden shadow-md'>
        <div className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit' />
          <Overlay />
          <Actions id={id} title={title} side='right'>
            <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-2 outline-none'>
              <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          timeAgo={timeAgo}
          isFavorite={isFavorite}
          onClick={handleToggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] border rounded-lg overflow-hidden'>
      <Skeleton className='w-full h-full' />
    </div>
  )
}
