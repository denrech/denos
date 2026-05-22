import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Returns spring-smoothed x/y motion values that pan the grid
 * in the opposite direction of the mouse cursor.
 * Pan is disabled (springs return to 0) when `disabled` is true.
 */
export function useMousePan(maxOffsetX, maxOffsetY, disabled) {
  const mouseNormX = useMotionValue(0.5)
  const mouseNormY = useMotionValue(0.5)

  const rawX = useTransform(mouseNormX, [0, 1], [maxOffsetX, -maxOffsetX])
  const rawY = useTransform(mouseNormY, [0, 1], [maxOffsetY, -maxOffsetY])

  const x = useSpring(rawX, { stiffness: 55, damping: 22, mass: 1 })
  const y = useSpring(rawY, { stiffness: 55, damping: 22, mass: 1 })

  useEffect(() => {
    const handleMove = (e) => {
      if (disabled) return
      mouseNormX.set(e.clientX / window.innerWidth)
      mouseNormY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [disabled, mouseNormX, mouseNormY])

  // When disabled (overlay open), ease back to center
  useEffect(() => {
    if (disabled) {
      mouseNormX.set(0.5)
      mouseNormY.set(0.5)
    }
  }, [disabled, mouseNormX, mouseNormY])

  return { x, y }
}
