import { Loader } from 'lucide-react'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

export default function Loading() {
  return (
    <main className='h-full w-full relative bg-[#fbf8d8] touch-none center'>
      <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}
