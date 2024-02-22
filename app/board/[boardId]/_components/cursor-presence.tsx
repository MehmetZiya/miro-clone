'use client'

import { memo } from 'react'
import { useOthersConnectionIds } from '@/liveblocks.config'
import { Cursor } from './cursor'

const Cursors = () => {
  const ids = useOthersConnectionIds()
  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  )
}

export const CursorPresence = memo(() => {
  return (
    <g>
      <Cursors />
    </g>
  )
})

CursorPresence.displayName = 'CursorPresence'
