import { Loader } from 'lucide-react'
import { InfoSkeleton } from './info'
import { ParticipantsSkeleton } from './participants'
import { ToolbarSkeleton } from './toolbar'

export default function Loading() {
  return (
    <main className='h-full w-full relative bg-[#fbf8d8] touch-none center'>
      <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}
