import { motion } from 'framer-motion'
import { NavArrow } from '../ui/NavArrow.jsx'
import { ActionButtons } from '../ui/ActionButtons.jsx'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1, when: 'afterChildren' },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 28 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
}

export function DetailPanel({ photo, currentIndex, total, onClose, onNavigate }) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top — category + close */}
      <motion.div variants={item} className="flex items-start justify-between pointer-events-auto">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
          {photo.category}
        </span>
        <motion.button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors p-1"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Center — title + navigation */}
      <motion.div variants={item} className="flex items-center justify-between gap-4 pointer-events-auto">
        <NavArrow direction="left" onClick={() => onNavigate('prev')} disabled={currentIndex === 0} />

        <div className="flex-1 text-center">
          <motion.h1
            key={photo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight"
          >
            {photo.title}
          </motion.h1>
          <p className="mt-2 text-white/40 text-sm">
            {currentIndex + 1} / {total}
          </p>
        </div>

        <NavArrow direction="right" onClick={() => onNavigate('next')} disabled={currentIndex === total - 1} />
      </motion.div>

      {/* Bottom — meta + buttons */}
      <motion.div variants={item} className="flex items-end justify-between gap-4 pointer-events-auto">
        <div className="space-y-1">
          <p className="text-white/90 text-sm font-medium">
            {photo.location} · {photo.year}
          </p>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed">
            {photo.description}
          </p>
        </div>
        <ActionButtons />
      </motion.div>
    </motion.div>
  )
}
