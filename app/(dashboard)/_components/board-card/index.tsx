'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

import { Skeleton } from '@/components/ui/skeleton'
import Overlay from './overlay'
import { useAuth } from '@clerk/nextjs'
import Footer from './footer'

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
  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden shadow-md'>
        <div className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit' />
          <Overlay />
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          timeAgo={timeAgo}
          isFavorite={isFavorite}
          onClick={() => {}}
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
