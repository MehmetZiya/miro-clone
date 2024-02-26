import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { cn, colorToCss, getContrastingTextColor } from '@/lib/utils'
import { NoteLayer } from '@/types/canvas'
import { useMutation } from '@/liveblocks.config'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
})
const calcFontSize = (width: number, height: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.15
  const fontSizeBasedOnHeight = height * scaleFactor
  const fontSizeBasedOnWidth = width * scaleFactor

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}
interface NoteProps {
  id: string
  layer: NoteLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export default function Note({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) {
  const { x, y, height, width, fill, value } = layer

  const handleTextChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  const updateValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get('layers')
    liveLayers.get(id)?.set('value', newValue)
  }, [])

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : '#000',
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable
        html={value || 'Text'}
        className={cn(
          'h-full w-full center text-center outline-none',
          font.className
        )}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          fontSize: calcFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : '#000',
        }}
        onChange={handleTextChange}
      />
    </foreignObject>
  )
}
