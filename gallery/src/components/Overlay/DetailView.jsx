import { motion, AnimatePresence } from 'framer-motion'
import { DetailPanel } from './DetailPanel.jsx'

export function DetailView({ photo, currentIndex, total, onClose, onNavigate }) {
  return (
    <>
      {/* Backdrop blur veil */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/50"
        style={{ backdropFilter: 'blur(24px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      {/* Enlarged photo with shared layout animation */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <motion.div
          layoutId={photo.id}
          className="relative rounded-sm overflow-hidden pointer-events-auto"
          style={{
            width: 'min(70vw, 900px)',
            aspectRatio: photo.aspect === 'portrait' ? '2/3' : photo.aspect === 'landscape' ? '3/2' : '1',
          }}
          transition={{ layout: { type: 'spring', stiffness: 260, damping: 28 } }}
        >
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Detail panel overlaid on the photo */}
          <AnimatePresence>
            <DetailPanel
              key={photo.id}
              photo={photo}
              currentIndex={currentIndex}
              total={total}
              onClose={onClose}
              onNavigate={onNavigate}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}
