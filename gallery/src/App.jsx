import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { MasonryGrid } from './components/Gallery/MasonryGrid.jsx'
import { DetailView } from './components/Overlay/DetailView.jsx'
import { photos } from './data/photos.js'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)

  const selectedIndex = photos.findIndex((p) => p.id === selectedId)
  const selectedPhoto = selectedIndex !== -1 ? photos[selectedIndex] : null

  const handleSelect = useCallback((id) => setSelectedId(id), [])
  const handleClose = useCallback(() => setSelectedId(null), [])

  const handleNavigate = useCallback(
    (direction) => {
      if (selectedIndex === -1) return
      const next = direction === 'next' ? selectedIndex + 1 : selectedIndex - 1
      if (next >= 0 && next < photos.length) {
        setSelectedId(photos[next].id)
      }
    },
    [selectedIndex]
  )

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') handleNavigate('next')
      if (e.key === 'ArrowLeft') handleNavigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleClose, handleNavigate])

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0a0a0a] relative">
      <LayoutGroup>
        <MasonryGrid
          photos={photos}
          onSelect={handleSelect}
          isBlurred={!!selectedPhoto}
        />

        <AnimatePresence>
          {selectedPhoto && (
            <DetailView
              key={selectedPhoto.id}
              photo={selectedPhoto}
              currentIndex={selectedIndex}
              total={photos.length}
              onClose={handleClose}
              onNavigate={handleNavigate}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}
