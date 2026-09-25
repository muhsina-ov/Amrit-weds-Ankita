import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { WEDDING } from '@/config'
import { useCountdown, useReveal } from '@/hooks/useInvitation'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { Heart, Sparkles, Flame } from 'lucide-react'

function Unit({ value, label }: { value: number; label: string }) {
  const prev = useRef(value)
  const popRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prev.current !== value && popRef.current) {
      popRef.current.classList.remove('digit-pop')
      void popRef.current.offsetWidth
      popRef.current.classList.add('digit-pop')
      prev.current = value
    }
  }, [value])

  return (
    <div className="flex flex-col items-center">
      <div className="glass-twilight relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 hover:border-[#dfb141]">
        <span ref={popRef} className="gold-text-glow font-royal text-3xl font-bold sm:text-4xl">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-royal mt-3 text-[11px] uppercase tracking-[0.3em] text-[#dfb141] font-bold">
        {label}
      </span>
    </div>
  )
}

export default function Countdown({ onTriggerLantern }: { onTriggerLantern?: () => void }) {
  const ref = useReveal<HTMLElement>()
  const { days, hours, minutes, seconds, done } = useCountdown(WEDDING.date)
  const [blessings, setBlessings] = useState(342)
  const [diyasLit, setDiyasLit] = useState(88)
  const [hasBlessed, setHasBlessed] = useState(false)
  const { playBlessingSitar, playChime } = useSoundEffects()

  const handleBless = () => {
    if (!hasBlessed) {
      setBlessings((prev) => prev + 1)
      setDiyasLit((prev) => prev + 1)
      setHasBlessed(true)
      playBlessingSitar()
      playChime()
      if (onTriggerLantern) onTriggerLantern()

      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.7 },
          colors: ['#dfb141', '#ffd768', '#c41e3a', '#ffffff'],
        })
      } catch {
        // Fallback
      }
    }
  }

  return (
    <section
      id="countdown"
      ref={ref}
      className="reveal relative overflow-hidden bg-gradient-to-b from-[#070b14] via-[#0d1629] to-[#070b14] px-6 py-32 text-center"
    >
      {/* Soft Ambient Radiance */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#dfb141]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-[#c41e3a]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            The Auspicious Countdown
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          Counting Down to Forever
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1]">
          {done ? "We Are Married!" : 'Until The Sacred Pheras'}
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        {/* Ticking Digit Units */}
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6">
          <Unit value={days} label="Days" />
          <span className="font-royal -mt-6 text-2xl font-bold text-[#dfb141]">:</span>
          <Unit value={hours} label="Hours" />
          <span className="font-royal -mt-6 text-2xl font-bold text-[#dfb141]">:</span>
          <Unit value={minutes} label="Minutes" />
          <span className="font-royal -mt-6 text-2xl font-bold text-[#dfb141]">:</span>
          <Unit value={seconds} label="Seconds" />
        </div>

        {/* Interactive Blessings & Diya Lighting */}
        <div className="mt-14 inline-flex flex-col items-center">
          <button
            onClick={handleBless}
            disabled={hasBlessed}
            className={`group inline-flex items-center gap-2.5 rounded-full px-9 py-4 font-royal text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_30px_rgba(223,177,65,0.35)] transition-all duration-300 ${
              hasBlessed
                ? 'bg-[#153729] text-[#ffd768] cursor-default border border-[#dfb141]/50'
                : 'bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] text-[#070b14] hover:shadow-[0_0_45px_rgba(223,177,65,0.6)] hover:scale-105 active:scale-95'
            }`}
          >
            {hasBlessed ? (
              <>
                <Flame className="h-4 w-4 text-[#ffd768] fill-[#ffd768] animate-bounce" />
                <span>Diya Lit &amp; Sky Lantern Released</span>
                <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
              </>
            ) : (
              <>
                <Flame className="h-4 w-4 text-[#070b14] group-hover:scale-125 transition-transform" />
                <span>Light A Diya &amp; Release Lantern</span>
                <Heart className="h-3.5 w-3.5 fill-[#070b14]" />
              </>
            )}
          </button>

          <div className="mt-5 flex items-center justify-center gap-5 text-xs font-serif-display font-medium text-[#dcd1ba]">
            <span className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-[#ffd768]" />
              <strong className="text-[#f8edd1] font-bold">{diyasLit}</strong> Diyas Lit for Ankita &amp; Amrit
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-[#c41e3a] fill-[#c41e3a]" />
              <strong className="text-[#f8edd1] font-bold">{blessings}</strong> Warm Blessings
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
