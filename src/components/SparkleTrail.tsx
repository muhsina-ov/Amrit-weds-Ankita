import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  color: string
}

export default function SparkleTrail() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    // Only enable on pointer-fine devices
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return

    let counter = 0
    const colors = ['#f3ca65', '#ffd700', '#ffffff', '#e8c872', '#ff8597']

    const handlePointerMove = (e: PointerEvent) => {
      // Throttle sparkle creation
      if (Math.random() > 0.4) return

      const newSparkle: Sparkle = {
        id: counter++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      }

      setSparkles((prev) => [...prev.slice(-20), newSparkle])
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    const cleanupInterval = setInterval(() => {
      setSparkles((prev) => prev.slice(2))
    }, 150)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      clearInterval(cleanupInterval)
    }
  }, [])

  if (sparkles.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {sparkles.map((sp) => (
        <span
          key={sp.id}
          className="absolute rounded-full animate-sparkle-fade"
          style={{
            left: sp.x,
            top: sp.y,
            width: sp.size,
            height: sp.size,
            backgroundColor: sp.color,
            boxShadow: `0 0 ${sp.size * 2}px ${sp.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
