'use client'

import { colorToCss } from '@/lib/utils'
import { Color } from '@/types/canvas'

interface ColorPickerProps {
  onChange: (color: Color) => void
}

export default function ColorPicker({ onChange }: ColorPickerProps) {
  return (
    <div className='center flex-wrap gap-2 max-w-32'>
      <ColorButton color={{ r: 217, g: 225, b: 242 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
      <ColorButton color={{ r: 234, g: 186, b: 148 }} onClick={onChange} />
      <ColorButton color={{ r: 226, g: 239, b: 218 }} onClick={onChange} />
      <ColorButton color={{ r: 213, g: 205, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 209, b: 220 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
    </div>
  )
}

interface ColorButtonProps {
  onClick: (color: Color) => void
  color: Color
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      onClick={() => onClick(color)}
      className={`w-6 h-6 center hover:opacity-75  transition`}
    >
      <div
        className='h-6 w-6 rounded-md border border-neutral-300'
        style={{ backgroundColor: colorToCss(color) }}
      />
    </button>
  )
}
