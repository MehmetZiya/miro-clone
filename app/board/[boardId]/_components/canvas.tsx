import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'

interface CanvasProps {
  boardId: string
}

export default function Canvas({ boardId }: CanvasProps) {
  return (
    <main className='h-full w-full relative bg-[#fbf8d8] touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  )
}
