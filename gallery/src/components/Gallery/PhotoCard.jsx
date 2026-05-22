import { motion } from 'framer-motion'

export function PhotoCard({ photo, onSelect }) {
  return (
    <motion.div
      layoutId={photo.id}
      onClick={() => onSelect(photo.id)}
      className="absolute overflow-hidden cursor-pointer rounded-sm"
      style={{ left: photo.x, top: photo.y, width: photo.width, height: photo.height }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
    >
      <motion.img
        src={photo.url}
        alt={photo.title}
        loading="lazy"
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        draggable={false}
      />
      {/* Subtle gradient overlay on hover for depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
