import { motion } from 'framer-motion'

export function ActionButtons() {
  return (
    <div className="flex gap-3">
      <motion.button
        className="
          px-7 py-3 rounded-full text-sm font-medium tracking-wide
          bg-white text-black hover:bg-white/90
          transition-colors
        "
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Order print
      </motion.button>
      <motion.button
        className="
          px-7 py-3 rounded-full text-sm font-medium tracking-wide
          border border-white/30 text-white hover:bg-white/10 hover:border-white/50
          transition-colors backdrop-blur-sm
        "
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Inquire
      </motion.button>
    </div>
  )
}
