'use client'

import { useOthers, useSelf } from '@/liveblocks.config'
import UserAvatar from './user-avatar'
import { connectionIdToColor } from '@/lib/utils'

const MAX_PARTICIPANTS = 4

export default function Participants() {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {users.slice(0, MAX_PARTICIPANTS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture}
            borderColor={connectionIdToColor(connectionId)}
            name={info?.name}
            fallback={info?.name?.[0] || 'T'}
          />
        ))}
        {self && (
          <UserAvatar
            src={self.info?.picture}
            name={self.info?.name}
            borderColor={connectionIdToColor(self.connectionId)}
            fallback={self.info?.name?.[0] || 'You'}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_PARTICIPANTS} more`}
            fallback={`+${users.length - MAX_PARTICIPANTS}`}
          />
        )}
      </div>
    </div>
  )
}
  const users = useOthers()
  const self = useSelf()
  const hasMoreUsers = users.length > MAX_PARTICIPANTS


export const ParticipantsSkeleton = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]' />
  )
}
