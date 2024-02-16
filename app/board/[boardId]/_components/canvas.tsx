'use client'

import { useState } from 'react'
import { CanvasMode, CanvasState } from '@/types/canvas'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { useHistory, useCanUndo, useCanRedo } from '@/liveblocks.config'

interface CanvasProps {
  boardId: string
}

export default function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main className='h-full w-full relative bg-[#fbf8d8] touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </main>
  )
}
