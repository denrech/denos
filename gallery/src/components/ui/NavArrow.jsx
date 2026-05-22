import { motion } from 'framer-motion'

export function NavArrow({ direction, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-12 h-12 rounded-full border border-white/20
        text-white/80 hover:text-white hover:border-white/50 hover:bg-white/10
        transition-colors disabled:opacity-20 disabled:cursor-not-allowed
        backdrop-blur-sm
      `}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
    >
      {direction === 'left' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </motion.button>
  )
}
