import { useEffect, useRef } from 'react'

interface Lantern {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  scale: number
  glow: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
}

export default function PicholaCanvas({ triggerLantern }: { triggerLantern?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lanternsRef = useRef<Lantern[]>([])
  const ripplesRef = useRef<Ripple[]>([])
  const starsRef = useRef<{ x: number; y: number; size: number; alpha: number; speed: number }[]>([])

  // Initialize Stars
  useEffect(() => {
    starsRef.current = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.65,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }))

    // Seed initial lanterns
    lanternsRef.current = Array.from({ length: 6 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * (0.6 + Math.random() * 0.4),
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.4 + 0.3),
      size: Math.random() * 12 + 16,
      opacity: Math.random() * 0.6 + 0.4,
      scale: 1,
      glow: Math.random() * 20 + 15,
    }))
  }, [])

  // Handle external lantern trigger
  useEffect(() => {
    if (!triggerLantern) return
    const newLantern: Lantern = {
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight - 80,
      vx: (Math.random() - 0.4) * 0.6,
      vy: -(Math.random() * 0.8 + 0.7),
      size: Math.random() * 10 + 22,
      opacity: 1,
      scale: 1.1,
      glow: 30,
    }
    lanternsRef.current.push(newLantern)
  }, [triggerLantern])

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

      // Create water ripple
      ripplesRef.current.push({
        x: clientX,
        y: clientY,
        radius: 5,
        maxRadius: 80,
        opacity: 0.8,
      })

      // If clicked near bottom, release lantern
      if (clientY > window.innerHeight * 0.5) {
        lanternsRef.current.push({
          x: clientX,
          y: clientY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.6 + 0.5),
          size: Math.random() * 8 + 20,
          opacity: 1,
          scale: 1,
          glow: 25,
        })
      }
    }

    window.addEventListener('click', handlePointerDown)

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Draw Twinkling Stars
      starsRef.current.forEach((star) => {
        star.alpha += star.speed
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed
        ctx.beginPath()
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 235, 175, ${star.alpha})`
        ctx.shadowBlur = star.size * 4
        ctx.shadowColor = '#dfb141'
        ctx.fill()
      })
      ctx.shadowBlur = 0

      // 2. Draw Lake Water Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i]
        r.radius += 1.2
        r.opacity -= 0.015

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.ellipse(r.x, r.y, r.radius * 1.8, r.radius * 0.6, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(223, 177, 65, ${r.opacity * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      // 3. Draw Floating Sky Lanterns
      for (let i = lanternsRef.current.length - 1; i >= 0; i--) {
        const l = lanternsRef.current[i]
        l.x += l.vx
        l.y += l.vy
        l.opacity -= 0.0008

        if (l.y < -50 || l.opacity <= 0) {
          lanternsRef.current.splice(i, 1)
          continue
        }

        ctx.save()
        // Lantern Glow
        const grad = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, l.glow)
        grad.addColorStop(0, `rgba(255, 220, 110, ${l.opacity})`)
        grad.addColorStop(0.4, `rgba(255, 140, 30, ${l.opacity * 0.7})`)
        grad.addColorStop(1, 'rgba(255, 100, 0, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(l.x, l.y, l.glow, 0, Math.PI * 2)
        ctx.fill()

        // Lantern Body
        ctx.fillStyle = `rgba(255, 200, 80, ${l.opacity * 0.95})`
        ctx.beginPath()
        ctx.roundRect(l.x - l.size * 0.4, l.y - l.size * 0.6, l.size * 0.8, l.size * 1.2, 4)
        ctx.fill()

        // Inner Flame
        ctx.fillStyle = `rgba(255, 255, 230, ${l.opacity})`
        ctx.beginPath()
        ctx.arc(l.x, l.y + l.size * 0.2, l.size * 0.2, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      animationFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handlePointerDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
    />
  )
}
