import React, { useRef, useState } from 'react'

interface CardTiltProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export default function CardTilt({
  children,
  className = '',
  intensity = 12,
  glare = true,
}: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity

    setRotate({ x: rotateX, y: rotateY })
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className="transition-transform duration-200 ease-out"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className={`relative overflow-hidden ${className}`}
      >
        {children}

        {/* Dynamic Holographic Glare Sheen */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 235, 175, 0.45) 0%, transparent 60%)`,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </div>
    </div>
  )
}
