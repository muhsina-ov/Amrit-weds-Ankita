import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import CardTilt from '@/components/CardTilt'
import { Sparkles, Heart, Coffee } from 'lucide-react'

export default function OurStory() {
  const ref = useReveal<HTMLElement>()
  const { amrit, ankita, teaStory } = WEDDING.coupleBios

  return (
    <section
      id="story"
      ref={ref}
      className="reveal relative overflow-hidden bg-gradient-to-b from-[#070b14] via-[#0b1222] to-[#070b14] px-6 py-32"
    >
      {/* Twilight Ambient Glows */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-[#dfb141]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-96 w-96 rounded-full bg-[#c41e3a]/10 blur-3xl" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            {WEDDING.beginningPhrase}
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl md:text-8xl">
          Our Story
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1] sm:text-2xl">
          Meet The Bride &amp; Groom
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        <p className="font-serif-display mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#dcd1ba] font-normal italic">
          "From innocent childhood dreams to a shared cup of tea that changed everything."
        </p>

        {/* 2-Column Childhood Bio Cards (Amrit & Ankita) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Amrit's Childhood Card */}
          <CardTilt intensity={8} className="h-full">
            <div className="glass-twilight royal-corners flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8 border border-[#dfb141]/40 transition-all duration-300 hover:border-[#dfb141] hover:shadow-[0_20px_50px_rgba(223,177,65,0.25)]">
              <div>
                {/* Arch-Framed Childhood Photo */}
                <div className="relative mb-6 overflow-hidden rounded-2xl border-2 border-[#dfb141]/50 shadow-2xl group bg-[#070b14]">
                  <img
                    src={amrit.image}
                    alt="Little Amrit"
                    className="h-80 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-royal rounded-full bg-[#070b14]/90 border border-[#dfb141]/70 px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#ffd768] backdrop-blur-md">
                      {amrit.role}
                    </span>
                    <span className="text-xl">🤠</span>
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="gold-text-glow font-script text-5xl text-[#ffd768]">
                  {amrit.name}
                </h3>

                {/* Lines */}
                <div className="mt-4 space-y-2.5 font-serif-display text-sm sm:text-base text-[#e6d3a3] leading-relaxed">
                  {amrit.lines.map((line, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-[#dfb141] text-xs mt-1">✦</span>
                      <span className={idx === amrit.lines.length - 1 ? 'font-bold text-[#f8edd1] italic' : ''}>
                        {line}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-[#dfb141]/20 pt-4 text-xs text-[#dfb141]">
                <Heart className="h-3.5 w-3.5 fill-[#c41e3a] text-[#c41e3a]" />
                <span className="font-royal font-bold tracking-wider uppercase">The Groom's Tale</span>
              </div>
            </div>
          </CardTilt>

          {/* Ankita's Childhood Card */}
          <CardTilt intensity={8} className="h-full">
            <div className="glass-twilight royal-corners flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8 border border-[#dfb141]/40 transition-all duration-300 hover:border-[#dfb141] hover:shadow-[0_20px_50px_rgba(223,177,65,0.25)]">
              <div>
                {/* Arch-Framed Childhood Photo */}
                <div className="relative mb-6 overflow-hidden rounded-2xl border-2 border-[#dfb141]/50 shadow-2xl group bg-[#070b14]">
                  <img
                    src={ankita.image}
                    alt="Little Ankita"
                    className="h-80 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-royal rounded-full bg-[#070b14]/90 border border-[#dfb141]/70 px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#ffd768] backdrop-blur-md">
                      {ankita.role}
                    </span>
                    <span className="text-xl">🎀</span>
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="gold-text-glow font-script text-5xl text-[#ffd768]">
                  {ankita.name}
                </h3>

                {/* Lines */}
                <div className="mt-4 space-y-2.5 font-serif-display text-sm sm:text-base text-[#e6d3a3] leading-relaxed">
                  {ankita.lines.map((line, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <span className="text-[#dfb141] text-xs mt-1">✦</span>
                      <span className={idx === ankita.lines.length - 1 ? 'font-bold text-[#f8edd1] italic' : ''}>
                        {line}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-[#dfb141]/20 pt-4 text-xs text-[#dfb141]">
                <Heart className="h-3.5 w-3.5 fill-[#c41e3a] text-[#c41e3a]" />
                <span className="font-royal font-bold tracking-wider uppercase">The Bride's Tale</span>
              </div>
            </div>
          </CardTilt>
        </div>

        {/* Centerpiece Milestone: From Tea to Together */}
        <div className="mt-12">
          <CardTilt intensity={6}>
            <div className="glass-twilight royal-corners relative overflow-hidden rounded-3xl p-8 sm:p-10 border-2 border-[#dfb141]/60 shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-center">
              {/* Decorative Background Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#dfb141]/15 blur-2xl" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Tea Icon Badge */}
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#dfb141] bg-[#121c33] shadow-[0_0_20px_rgba(223,177,65,0.4)] mb-4">
                  <Coffee className="h-7 w-7 text-[#ffd768]" />
                </div>

                <span className="font-royal text-xs font-bold uppercase tracking-[0.35em] text-[#dfb141]">
                  Where Forever Started
                </span>

                <h3 className="gold-text-glow font-script mt-2 text-5xl sm:text-6xl text-[#ffd768]">
                  {teaStory.title}
                </h3>

                <div className="ornament my-4 text-lg">
                  <span>❧</span>
                </div>

                <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-[#f8edd1] max-w-2xl font-medium italic leading-relaxed">
                  "{teaStory.description}"
                </p>

                <p className="font-royal mt-6 text-xs uppercase tracking-[0.25em] text-[#ffd768] bg-[#070b14]/80 px-6 py-2 rounded-full border border-[#dfb141]/40">
                  And now, these kids are getting married!
                </p>
              </div>
            </div>
          </CardTilt>
        </div>
      </div>
    </section>
  )
}
