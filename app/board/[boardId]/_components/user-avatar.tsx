import { Hint } from '@/components/hint'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  fallback?: string
  name?: string
  borderColor?: string
}

export default function UserAvatar({
  src,
  fallback,
  name,
  borderColor,
}: UserAvatarProps) {
  return (
    <Hint label={name || 'Teammate'} side='bottom' sideOffset={18}>
      <Avatar className='h-8 w-8 border-2' style={{ borderColor }}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </Hint>
  )
}
