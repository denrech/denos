import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { PhotoCard } from './PhotoCard.jsx'
import { useMasonryLayout } from '../../hooks/useMasonryLayout.js'
import { useMousePan } from '../../hooks/useMousePan.js'
import { useWindowSize } from '../../hooks/useWindowSize.js'

const GAP = 10
const TILE_REPEATS = 3 // tile photos horizontally for the infinite illusion

function getColumnCount(width) {
  if (width < 640) return 2
  if (width < 1024) return 3
  if (width < 1440) return 4
  return 5
}

export function MasonryGrid({ photos, onSelect, isBlurred }) {
  const { width: vw, height: vh } = useWindowSize()
  const columnCount = getColumnCount(vw)
  const columnWidth = Math.floor((vw - GAP * (columnCount + 1)) / columnCount)

  const { positionedPhotos, totalWidth, totalHeight } = useMasonryLayout(
    photos,
    columnCount,
    columnWidth,
    GAP
  )

  // Tile the photo array horizontally to simulate an infinite canvas
  const tiledPhotos = useMemo(() => {
    const tiles = []
    for (let tx = 0; tx < TILE_REPEATS; tx++) {
      positionedPhotos.forEach((photo) => {
        tiles.push({
          ...photo,
          // Only the center tile (tx === 1) keeps the real id for layoutId animation
          id: tx === 1 ? photo.id : `${photo.id}_t${tx}`,
          x: photo.x + tx * (totalWidth + GAP),
        })
      })
    }
    return tiles
  }, [positionedPhotos, totalWidth])

  const tiledTotalWidth = totalWidth * TILE_REPEATS + GAP * (TILE_REPEATS - 1)

  // Pan range: half the overflow in each axis
  const maxOffsetX = (tiledTotalWidth - vw) / 2
  const maxOffsetY = Math.max((totalHeight - vh) / 2, 40)

  const { x: panX, y: panY } = useMousePan(maxOffsetX, maxOffsetY, isBlurred)

  // Center the tiled grid: start at the left edge of the center tile
  const gridOffsetX = -(totalWidth + GAP) // shift left by one tile width to show center tile first

  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        filter: isBlurred ? 'blur(14px)' : 'blur(0px)',
        scale: isBlurred ? 0.95 : 1,
        opacity: isBlurred ? 0.55 : 1,
      }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute"
        style={{
          x: panX,
          y: panY,
          left: gridOffsetX,
          top: 0,
          width: tiledTotalWidth,
          height: totalHeight,
        }}
      >
        {tiledPhotos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onSelect={onSelect}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
