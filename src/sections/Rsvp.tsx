import { useState } from 'react'
import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import CardTilt from '@/components/CardTilt'
import { Sparkles, Heart, CheckCircle2, Send, PhoneCall, MessageCircle, UserCheck } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Rsvp() {
  const ref = useReveal<HTMLElement>()
  const { playBlessingSitar, playChime } = useSoundEffects()

  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<'attending' | 'declining'>('attending')
  const [guestsCount, setGuestsCount] = useState('2')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'Mehendi Ceremony',
    'Sangeet & Ring Ceremony',
    'Haldi Ceremony',
    'Shaadi & Reception',
  ])
  const [wishes, setWishes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleEvent = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName) ? prev.filter((e) => e !== eventName) : [...prev, eventName]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitted(true)
    playBlessingSitar()
    playChime()

    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#dfb141', '#ffd768', '#c41e3a', '#ffffff', '#10b981'],
      })
    } catch {
      // Confetti fallback
    }
  }

  const getWhatsAppMessage = () => {
    const text = `Namaste! RSVP for ${WEDDING.bride} & ${WEDDING.groom}'s Wedding:\nName: ${name || 'Guest'}\nStatus: ${attendance === 'attending' ? 'Joyfully Attending' : 'Regretfully Declining'}\nNumber of Guests: ${guestsCount}\nEvents: ${selectedEvents.join(', ')}\nWishes: ${wishes || 'Heartiest congratulations!'}`
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="rsvp" ref={ref} className="reveal relative bg-gradient-to-b from-[#070b14] via-[#0b1325] to-[#070b14] px-6 py-24 sm:py-32">
      {/* Background Radiance */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[#dfb141]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/3 h-72 w-72 rounded-full bg-[#c41e3a]/10 blur-3xl" />

      <div className="mx-auto max-w-3xl text-center">
        {/* Section Pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            Your Auspicious Presence
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          RSVP &amp; Blessings
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1] sm:text-2xl">
          Celebrate With Ankita &amp; Amrit
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        <p className="font-serif-display mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-[#dcd1ba] italic font-normal">
          "Your presence and blessings will make our special wedding days truly complete and unforgettable."
        </p>

        {/* RSVP Card */}
        <div className="mt-12">
          <CardTilt intensity={5}>
            <div className="glass-twilight royal-corners overflow-hidden rounded-3xl p-7 sm:p-10 border-2 border-[#dfb141]/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left">
              {isSubmitted ? (
                <div className="py-10 text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#dfb141] bg-[#121c33] shadow-[0_0_30px_rgba(223,177,65,0.4)]">
                    <CheckCircle2 className="h-10 w-10 text-[#ffd768]" />
                  </div>
                  <h3 className="gold-text-glow font-script mt-6 text-5xl sm:text-6xl">
                    Thank You, {name}!
                  </h3>
                  <p className="font-royal mt-2 text-base font-bold uppercase tracking-[0.2em] text-[#f8edd1]">
                    Your RSVP Has Been Received
                  </p>
                  <p className="font-serif-display mt-3 text-sm text-[#dcd1ba] italic max-w-md mx-auto">
                    {attendance === 'attending'
                      ? "We are delighted to welcome you to celebrate with us at Sahyadri Mangal Karyalay!"
                      : "Thank you for sending your heartfelt blessings to Ankita & Amrit."}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <a
                      href={getWhatsAppMessage()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-royal text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Share via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#dfb141]/50 bg-[#0d1527] px-6 py-3 font-royal text-xs font-bold uppercase tracking-wider text-[#ffd768] hover:bg-[#141f38] transition-colors"
                    >
                      <span>Edit Response</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="font-royal block text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768]">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh & Sunita Sharma"
                      className="mt-2 w-full rounded-2xl border border-[#dfb141]/40 bg-[#070b14]/80 px-4 py-3.5 text-sm text-[#f8edd1] placeholder-[#8a7b62] shadow-inner outline-none transition-all focus:border-[#ffd768] focus:ring-1 focus:ring-[#ffd768]"
                    />
                  </div>

                  {/* Attendance Selector */}
                  <div>
                    <label className="font-royal block text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] mb-2.5">
                      Will You Attend? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttendance('attending')}
                        className={`flex items-center justify-center gap-2.5 rounded-2xl p-3.5 font-royal text-xs font-bold uppercase tracking-wider transition-all ${
                          attendance === 'attending'
                            ? 'bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] text-[#070b14] shadow-[0_0_20px_rgba(223,177,65,0.4)] font-extrabold'
                            : 'border border-[#dfb141]/30 bg-[#070b14]/60 text-[#dcd1ba] hover:border-[#dfb141]/60'
                        }`}
                      >
                        <UserCheck className="h-4 w-4" />
                        <span>Joyfully Accepts</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttendance('declining')}
                        className={`flex items-center justify-center gap-2.5 rounded-2xl p-3.5 font-royal text-xs font-bold uppercase tracking-wider transition-all ${
                          attendance === 'declining'
                            ? 'bg-[#8a2435] text-white border border-[#c41e3a] shadow-lg font-extrabold'
                            : 'border border-[#dfb141]/30 bg-[#070b14]/60 text-[#dcd1ba] hover:border-[#dfb141]/60'
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                        <span>Regretfully Declines</span>
                      </button>
                    </div>
                  </div>

                  {attendance === 'attending' && (
                    <>
                      {/* Number of Guests */}
                      <div>
                        <label className="font-royal block text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] mb-2">
                          Number of Guests Attending
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {['1', '2', '3', '4', '5+'].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setGuestsCount(num)}
                              className={`h-11 w-12 rounded-xl font-royal text-sm font-bold transition-all ${
                                guestsCount === num
                                  ? 'bg-[#dfb141] text-[#070b14] shadow-md scale-105'
                                  : 'border border-[#dfb141]/30 bg-[#070b14]/70 text-[#dcd1ba] hover:border-[#dfb141]'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Events Attending */}
                      <div>
                        <label className="font-royal block text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] mb-2.5">
                          Events You Will Attend
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            { name: 'Mehendi Ceremony', date: '8 Dec, 12:00 PM' },
                            { name: 'Sangeet & Ring Ceremony', date: '8 Dec, 7:00 PM' },
                            { name: 'Haldi Ceremony', date: '9 Dec, 12:00 PM' },
                            { name: 'Shaadi & Reception', date: '9 Dec, 7:00 PM' },
                          ].map((ev) => {
                            const isChecked = selectedEvents.includes(ev.name)
                            return (
                              <button
                                key={ev.name}
                                type="button"
                                onClick={() => toggleEvent(ev.name)}
                                className={`flex items-start justify-between rounded-xl p-3 border text-left transition-all ${
                                  isChecked
                                    ? 'border-[#dfb141] bg-[#121c33]/90 text-[#ffd768]'
                                    : 'border-[#dfb141]/25 bg-[#070b14]/60 text-[#a39478] hover:border-[#dfb141]/50'
                                }`}
                              >
                                <div>
                                  <p className="font-royal text-xs font-bold">{ev.name}</p>
                                  <p className="text-[10px] text-[#c9bea7] font-serif-display mt-0.5">{ev.date}</p>
                                </div>
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs ${
                                  isChecked ? 'border-[#dfb141] bg-[#dfb141] text-[#070b14]' : 'border-[#dfb141]/40'
                                }`}>
                                  {isChecked ? '✓' : ''}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Blessings Message */}
                  <div>
                    <label className="font-royal block text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768]">
                      Warm Wishes &amp; Message for Ankita &amp; Amrit
                    </label>
                    <textarea
                      rows={3}
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      placeholder="Write your loving blessings and wishes for the couple..."
                      className="mt-2 w-full rounded-2xl border border-[#dfb141]/40 bg-[#070b14]/80 px-4 py-3 text-sm text-[#f8edd1] placeholder-[#8a7b62] shadow-inner outline-none transition-all focus:border-[#ffd768] focus:ring-1 focus:ring-[#ffd768]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] px-9 py-4 font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#070b14] shadow-[0_0_25px_rgba(223,177,65,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_35px_rgba(223,177,65,0.6)] active:scale-95"
                    >
                      <Send className="h-4 w-4" />
                      <span>Confirm My RSVP</span>
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={getWhatsAppMessage()}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/60 bg-[#070b14]/80 px-5 py-3.5 font-royal text-xs font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shadow-md"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>RSVP via WhatsApp</span>
                      </a>
                      <a
                        href={`tel:${WEDDING.phoneRsvp}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#dfb141]/50 bg-[#070b14]/80 px-5 py-3.5 font-royal text-xs font-bold uppercase tracking-wider text-[#ffd768] hover:bg-[#141f38] transition-all shadow-md"
                      >
                        <PhoneCall className="h-4 w-4 text-[#dfb141]" />
                        <span>Call for RSVP</span>
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </CardTilt>
        </div>
      </div>
    </section>
  )
}
