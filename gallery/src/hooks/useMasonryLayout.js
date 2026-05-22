import { useMemo } from 'react'

const ASPECT_RATIOS = {
  portrait: 2 / 3,
  landscape: 3 / 2,
  square: 1,
}

/**
 * Greedy shortest-column masonry packing.
 * Returns positioned photo objects + total grid dimensions.
 */
export function useMasonryLayout(photos, columnCount, columnWidth, gap) {
  return useMemo(() => {
    if (!photos.length || !columnWidth) {
      return { positionedPhotos: [], totalWidth: 0, totalHeight: 0 }
    }

    const columnHeights = Array(columnCount).fill(gap)
    const totalWidth = columnCount * columnWidth + (columnCount + 1) * gap

    const positionedPhotos = photos.map((photo) => {
      const ratio = ASPECT_RATIOS[photo.aspect] ?? 1
      const height = Math.round(columnWidth / ratio)

      const shortestCol = columnHeights.indexOf(Math.min(...columnHeights))
      const x = gap + shortestCol * (columnWidth + gap)
      const y = columnHeights[shortestCol]

      columnHeights[shortestCol] += height + gap

      return { ...photo, x, y, width: columnWidth, height }
    })

    const totalHeight = Math.max(...columnHeights) + gap

    return { positionedPhotos, totalWidth, totalHeight }
  }, [photos, columnCount, columnWidth, gap])
}
