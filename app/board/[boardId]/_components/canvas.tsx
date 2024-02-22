'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from '@/types/canvas'
import Info from './info'
import Participants from './participants'
import Toolbar from './toolbar'
import { LayerPreview } from './layer-preview'
import { CursorPresence } from './cursor-presence'
import { SelectionBox } from './selection-box'
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
  useOthersMapped,
} from '@/liveblocks.config'
import {
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  pointerEventToCanvas,
  resizeBounds,
} from '@/lib/utils'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'
import { SelectionTools } from './selection-tools'

const MAX_LAYERS = 100
interface CanvasProps {
  boardId: string
}

export default function Canvas({ boardId }: CanvasProps) {
  const layerIds = useStorage((root) => root.layerIds)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get('layers')
      if (liveLayers.size >= MAX_LAYERS) return

      const liveLayerIds = storage.get('layerIds')
      const layerId = nanoid()
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      })
      liveLayerIds.push(layerId)
      liveLayers.set(layerId, layer)
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None })
    },
    [lastUsedColor]
  )

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])
  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      }
      const liveLayers = storage.get('layers')

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id)
        if (layer) {
          layer.update({
            x: layer.get('x') + offset.x,
            y: layer.get('y') + offset.y,
          })
        }
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [canvasState]
  )
  const unselectLayer = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get('layers').toImmutable()
      setCanvasState({ mode: CanvasMode.Selection, origin, current })
      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      )
      setMyPresence({ selection: ids })
    },
    [layerIds]
  )
  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.Selection, origin, current })
    }
  }, [])
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return
      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      )
      const liveLayers = storage.get('layers')
      const layer = liveLayers.get(self.presence.selection[0])
      if (layer) {
        layer.update(bounds)
      }
    },
    [canvasState]
  )

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()
      const current = pointerEventToCanvas(e, camera)

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin)
      } else if (canvasState.mode === CanvasMode.Selection) {
        updateSelectionNet(current, canvasState.origin)
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current)
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      }
      setMyPresence({ cursor: current })
    },
    [canvasState, camera, resizeSelectedLayer, translateSelectedLayer]
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvas(e, camera)
      if (canvasState.mode === CanvasMode.Inserting) return

      setCanvasState({ mode: CanvasMode.Pressing, origin: point })
    },
    [canvasState.mode, camera, setCanvasState]
  )

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvas(e, camera)

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayer()
        setCanvasState({ mode: CanvasMode.None })
        return
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({ mode: CanvasMode.None })
      }
      history.resume()
    },
    [canvasState, camera, history, insertLayer, unselectLayer]
  )

  const selections = useOthersMapped((other) => other.presence.selection)
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {}
    for (const user of selections) {
      const [connectionId, selection] = user
      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }
    return layerIdsToColorSelection
  }, [selections])

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return
      }
      history.pause()
      e.stopPropagation()

      const point = pointerEventToCanvas(e, camera)
      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [setCanvasState, history, camera, canvasState.mode]
  )

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({ mode: CanvasMode.Resizing, corner, initialBounds })
    },
    [history]
  )

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
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              selectionColor={layerIdsToColorSelection[layerId]}
              onLayerPointerDown={onLayerPointerDown}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.Selection &&
            canvasState.current != null && (
              <rect
                className='fill-blue-500/5 stroke-blue-500 stroke-1'
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorPresence />
        </g>
      </svg>
    </main>
  )
}
