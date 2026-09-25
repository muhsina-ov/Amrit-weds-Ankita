import { useState } from 'react'
import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import { Check, Copy, Heart, Instagram, ArrowUp } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Footer() {
  const ref = useReveal<HTMLElement>()
  const [copied, setCopied] = useState(false)

  const copyHashtag = () => {
    navigator.clipboard.writeText(WEDDING.hashtag)
    setCopied(true)
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#dfb141', '#ffd768', '#c41e3a', '#ffffff'],
      })
    } catch {
      // Confetti fallback
    }
    setTimeout(() => setCopied(false), 2500)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={ref}
      className="reveal relative flex flex-col items-center justify-end overflow-hidden bg-gradient-to-b from-[#070b14] via-[#09101f] to-[#04070d] px-6 pt-28 pb-24 text-center"
    >
      <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center">
        <p className="gold-text-glow font-script text-6xl sm:text-7xl">With Love &amp; Gratitude</p>
        <p className="font-serif-display mt-3 italic text-sm text-[#dcd1ba] max-w-lg font-normal">
          "We cannot wait to share the joy, laughter, and lifelong memories of our wedding celebrations with all of you!"
        </p>

        {/* Couple Portrait Frame with Arch Styling */}
        <div className="glass-twilight mt-12 w-full max-w-sm overflow-hidden rounded-t-[11rem] rounded-b-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#dfb141]/50 transition-transform duration-500 hover:scale-[1.02]">
          <div className="overflow-hidden rounded-t-[10.5rem] rounded-b-2xl border border-[#dfb141]/40">
            <img
              src="/assets/event_sangeet.jpg"
              alt="Ankita and Amrit Celebrating"
              className="w-full h-80 object-cover object-top brightness-95 transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="pt-6 pb-3">
            <p className="font-royal text-[10px] font-bold uppercase tracking-[0.3em] text-[#dfb141]">
              {WEDDING.beginningPhrase}
            </p>
            <h4 className="gold-text-glow font-script text-5xl sm:text-6xl mt-1">
              {WEDDING.bride} &amp; {WEDDING.groom}
            </h4>
            <p className="font-royal mt-1 text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffd768]">
              {WEDDING.venue}
            </p>
            <p className="font-serif-display text-xs text-[#c9bea7] mt-1">
              8th &amp; 9th December 2026
            </p>
          </div>
        </div>

        {/* Copy Wedding Hashtag Button */}
        <div className="mt-9 flex flex-col items-center gap-3">
          <button
            onClick={copyHashtag}
            className="group flex items-center gap-2.5 rounded-full border border-[#dfb141]/70 bg-[#0d1527] px-8 py-3.5 shadow-lg backdrop-blur-xl transition-all hover:bg-[#141f38] hover:border-[#dfb141] hover:scale-105 active:scale-95"
          >
            <span className="font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#ffd768]">
              {WEDDING.hashtag}
            </span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400 animate-bounce" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-[#dfb141] group-hover:text-white" />
            )}
          </button>
          {copied && (
            <span className="text-xs text-emerald-400 font-bold animate-fade-in">
              ✨ Official hashtag copied! Tag your wedding photos!
            </span>
          )}
        </div>

        {/* Back to top shortcut */}
        <button
          onClick={scrollToTop}
          className="mt-8 inline-flex items-center gap-1.5 font-royal text-[11px] font-bold uppercase tracking-[0.25em] text-[#dfb141] hover:text-white transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
          <span>Back to Top</span>
        </button>

        {/* Footer Credits */}
        <div className="mt-14 border-t border-[#dfb141]/20 pt-6 w-full flex flex-col items-center">
          <p className="font-royal flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9bea7]">
            Handcrafted with <Heart className="h-3.5 w-3.5 fill-[#c41e3a] text-[#c41e3a] inline" /> for {WEDDING.bride} &amp; {WEDDING.groom}
          </p>
          <a
            href="https://www.instagram.com/invitestory.in/"
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#dfb141] hover:text-white transition-colors"
          >
            <Instagram className="h-3.5 w-3.5" />
            <span>Follow @invitestory.in</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
