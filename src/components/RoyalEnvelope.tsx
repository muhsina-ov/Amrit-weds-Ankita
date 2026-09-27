import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles, Heart } from 'lucide-react'
import { WEDDING } from '@/config'
import { useSoundEffects } from '@/hooks/useSoundEffects'

interface RoyalEnvelopeProps {
  isOpen: boolean
  onOpen: () => void
}

export default function RoyalEnvelope({ isOpen, onOpen }: RoyalEnvelopeProps) {
  const [isBreaking, setIsBreaking] = useState(false)
  const { playChime, playBlessingSitar } = useSoundEffects()

  const handleOpenInvitation = () => {
    if (isBreaking) return
    setIsBreaking(true)
    playBlessingSitar()
    playChime()

    // Trigger golden sparks & embers confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#dfb141', '#ffd768', '#fce8a6', '#c41e3a', '#ffffff'],
        shapes: ['circle'],
        scalar: 1.2,
      })
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpen()
    }, 700)
  }

  if (isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070d]/90 px-4 backdrop-blur-2xl transition-opacity duration-700">
      {/* Ambient Aura */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-[#dfb141]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#c41e3a]/10 blur-3xl" />
      </div>

      <div
        className={`relative w-full max-w-lg transition-all duration-700 ${
          isBreaking ? 'scale-95 opacity-0 translate-y-8' : 'scale-100 opacity-100'
        }`}
      >
        {/* Envelope Container with Luxury Regal Twilight & Gold Borders */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#dfb141]/80 bg-gradient-to-b from-[#121c33] via-[#0d1527] to-[#070b14] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
          {/* Ornate Gold Corners */}
          <div className="pointer-events-none absolute top-3 left-3 h-10 w-10 border-t-2 border-l-2 border-[#dfb141]" />
          <div className="pointer-events-none absolute top-3 right-3 h-10 w-10 border-t-2 border-r-2 border-[#dfb141]" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-[#dfb141]" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-[#dfb141]" />

          {/* Envelope Header */}
          <div className="text-center">
            <p className="font-royal text-[11px] font-bold uppercase tracking-[0.45em] text-[#ffd768]">
              ॥ श्री गणेशाय नमः ॥
            </p>
            <div className="my-3 flex items-center justify-center gap-2">
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#dfb141]" />
              <span className="text-[#dfb141] text-xs">✦</span>
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#dfb141]" />
            </div>
            <p className="font-royal text-xs font-bold uppercase tracking-[0.3em] text-[#ffd768] bg-[#070b14]/70 py-1 px-4 rounded-full border border-[#dfb141]/40 inline-block mb-2">
              {WEDDING.beginningPhrase}
            </p>
            <h2 className="gold-text-glow font-script mt-2 text-6xl">
              {WEDDING.bride} &amp; {WEDDING.groom}
            </h2>
            <p className="font-serif-display mt-2 text-xs italic text-[#dfb141]">
              {WEDDING.venue}
            </p>
          </div>

          {/* Interactive 3D Gold Wax Seal */}
          <div className="my-8 flex flex-col items-center justify-center">
            <button
              onClick={handleOpenInvitation}
              className="group relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#ffd768] bg-gradient-to-br from-[#dfb141] via-[#a37318] to-[#593c08] shadow-[0_0_35px_rgba(223,177,65,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
              title="Click to break seal & open invitation"
            >
              {/* Pulsing Aura */}
              <span className="absolute -inset-2 rounded-full border border-[#ffd768]/60 animate-ping opacity-35" />

              {/* Inner Seal Texture */}
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-[#ffe599]/60 bg-gradient-to-tr from-[#78510b] to-[#c79124] shadow-inner">
                <span className="font-royal text-[9px] font-bold uppercase tracking-widest text-[#ffd768]">
                  WEDDING
                </span>
                <span className="font-royal text-xl font-bold tracking-widest text-white drop-shadow">
                  A &amp; A
                </span>
                <span className="font-royal text-[8px] font-medium tracking-wider text-[#ffe599]">
                  DEC 2026
                </span>
              </div>
            </button>
            <span className="font-royal mt-4 text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768] animate-pulse">
              Tap Wax Seal to Enter
            </span>
          </div>

          {/* Action Button */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleOpenInvitation}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] px-8 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#070b14] shadow-[0_0_25px_rgba(223,177,65,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(223,177,65,0.6)] active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Open Wedding Invitation</span>
              <Heart className="h-3.5 w-3.5 fill-[#070b14]" />
            </button>

            <p className="font-serif-display text-[11px] italic text-[#dfb141]">
              🎵 Featuring wedding song "{WEDDING.music.title}"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
