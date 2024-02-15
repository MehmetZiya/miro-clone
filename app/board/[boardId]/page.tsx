import Canvas from './_components/canvas'
import Room from '@/components/room'
import Loading from './_components/loading'

interface BoardPageProps {
  params: {
    boardId: string
  }
}

export default function BoardPage({ params }: BoardPageProps) {
  return (
    <Room roomId={params.boardId} fallback={<Loading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  )
}
