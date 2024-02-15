'use client'

import { useOthers, useSelf } from '@/liveblocks.config'
import UserAvatar from './user-avatar'
import { connectionIdToColor } from '@/lib/utils'

const MAX_PARTICIPANTS = 4

export default function Participants() {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      Participants
    </div>
  )
}
