import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

interface CanvasProps {
  boardId: string
}

export default function Canvas({ boardId }: CanvasProps) {
  return (
    <main className='h-full w-full relative bg-neutral-50 touch-none'>
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
