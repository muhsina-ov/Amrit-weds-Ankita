import { useState } from 'react'
import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import CardTilt from '@/components/CardTilt'
import { Calendar, Clock, MapPin, Sparkles, CalendarPlus, ExternalLink } from 'lucide-react'

function toIcsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export default function Itinerary() {
  const ref = useReveal<HTMLElement>()
  const [selectedDay, setSelectedDay] = useState<string>('all')

  const filterDays = [
    { id: 'all', label: 'All Celebrations' },
    { id: 'Day 1', label: 'Day 1 • 8 Dec' },
    { id: 'Day 2', label: 'Day 2 • 9 Dec' },
  ]

  const filteredEvents =
    selectedDay === 'all'
      ? WEDDING.events
      : WEDDING.events.filter((e) => e.day === selectedDay)

  const downloadEventIcs = (event: (typeof WEDDING.events)[0]) => {
    const eventDate = new Date(event.isoDate)
    const endDate = new Date(eventDate.getTime() + 4 * 3600 * 1000)
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//InviteStory//Wedding//EN',
      'BEGIN:VEVENT',
      `UID:${event.id}-${Date.now()}@ankita-weds-amrit`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(eventDate)}`,
      `DTEND:${toIcsDate(endDate)}`,
      `SUMMARY:${event.title} — ${WEDDING.bride} & ${WEDDING.groom} Wedding`,
      `LOCATION:${event.venue}`,
      `DESCRIPTION:${event.description} | Dress Code: ${event.dressCode}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.id}-celebration.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getGCalUrl = (event: (typeof WEDDING.events)[0]) => {
    const eventDate = new Date(event.isoDate)
    const endDate = new Date(eventDate.getTime() + 4 * 3600 * 1000)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `${event.title} — ${WEDDING.bride} & ${WEDDING.groom}`
    )}&dates=${toIcsDate(eventDate)}/${toIcsDate(endDate)}&location=${encodeURIComponent(
      `${event.venue}`
    )}&details=${encodeURIComponent(`${event.description}\nDress Code: ${event.dressCode}`)}`
  }

  return (
    <section id="itinerary" ref={ref} className="reveal relative bg-[#070b14] px-6 py-32">
      <div className="mx-auto max-w-5xl text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            Wedding Celebrations Schedule
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        {/* Section Heading */}
        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          Functions &amp; Ceremonies
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1] sm:text-2xl">
          Two Days of Joy &amp; Festivities
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        <p className="font-serif-display mx-auto max-w-xl text-sm leading-relaxed text-[#dcd1ba] font-normal">
          Join us for two unforgettable days of color, music, rituals, and celebration as Ankita and Amrit begin their journey as one.
        </p>

        {/* Day Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filterDays.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDay(tab.id)}
              className={`rounded-full px-6 py-2.5 font-royal text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                selectedDay === tab.id
                  ? 'bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] text-[#070b14] shadow-[0_0_20px_rgba(223,177,65,0.4)] scale-105'
                  : 'border border-[#dfb141]/35 bg-[#0d1527]/80 text-[#e6d3a3] hover:bg-[#141f38] hover:border-[#dfb141]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Event Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 text-left">
          {filteredEvents.map((event, idx) => (
            <CardTilt key={event.id} intensity={8} className="h-full">
              <div className="glass-twilight royal-corners relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-8 transition-all duration-300 hover:border-[#dfb141] hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                {/* Top Badge & Day Header */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#dfb141]/20 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{event.icon}</span>
                      <div>
                        <span className="font-royal text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffd768]">
                          {event.day}
                        </span>
                        <p className="font-royal text-xs font-semibold text-[#e6d3a3]">
                          {event.tag}
                        </p>
                      </div>
                    </div>
                    <span className="font-royal text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffd768] bg-[#070b14] px-3.5 py-1 rounded-full border border-[#dfb141]/40">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Event High-Resolution Photo Banner */}
                  <div className="relative my-4 overflow-hidden rounded-2xl border border-[#dfb141]/35 shadow-lg group">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3">
                      <span className="font-royal rounded-full bg-[#070b14]/90 border border-[#dfb141]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ffd768] backdrop-blur-md">
                        {event.venue}
                      </span>
                    </div>
                  </div>

                  {/* Event Title & Description */}
                  <h3 className="font-royal text-2xl font-bold text-[#f8edd1]">
                    {event.title}
                  </h3>
                  <p className="font-serif-display mt-2 text-xs leading-relaxed text-[#c9bea7]">
                    {event.description}
                  </p>

                  {/* Date / Time / Venue Details */}
                  <div className="mt-6 space-y-3 text-xs text-[#e6d3a3]">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-[#ffd768] shrink-0" />
                      <span className="font-bold">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-[#ffd768] shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-[#ffd768] shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Dress Code Lookbook Palette */}
                  <div className="mt-6 rounded-2xl bg-[#070b14]/70 p-4 border border-[#dfb141]/25">
                    <div className="flex items-center justify-between">
                      <span className="font-royal text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffd768]">
                        Suggested Attire:
                      </span>
                      <span className="font-serif-display italic text-xs font-bold text-[#f8edd1]">
                        {event.dressCode}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-royal text-[9px] uppercase tracking-wider text-[#dcd1ba]">
                        Colors:
                      </span>
                      <div className="flex items-center gap-2">
                        {event.colors.map((c, i) => (
                          <div
                            key={i}
                            className="group relative flex items-center justify-center"
                          >
                            <span
                              className="h-5 w-5 rounded-full border border-white/20 shadow-md transition-transform group-hover:scale-125"
                              style={{ backgroundColor: c.hex }}
                              title={`${c.name} (${c.hex})`}
                            />
                            {/* Color tooltip */}
                            <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#070b14] border border-[#dfb141]/50 px-2 py-0.5 font-royal text-[9px] text-[#ffd768] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                              {c.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calendar Add Actions */}
                <div className="mt-6 pt-4 border-t border-[#dfb141]/20 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-royal text-[10px] font-bold tracking-wider text-[#dfb141]">
                    Add to Calendar:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadEventIcs(event)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#121c33] border border-[#dfb141]/40 px-3.5 py-1.5 text-[10px] font-royal font-bold uppercase tracking-wider text-[#f8edd1] shadow-sm transition-all hover:bg-[#1a2849] hover:border-[#dfb141] active:scale-95"
                    >
                      <CalendarPlus className="h-3 w-3 text-[#ffd768]" />
                      <span>.ICS</span>
                    </button>
                    <a
                      href={getGCalUrl(event)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#121c33] border border-[#dfb141]/40 px-3.5 py-1.5 text-[10px] font-royal font-bold uppercase tracking-wider text-[#f8edd1] shadow-sm transition-all hover:bg-[#1a2849] hover:border-[#dfb141] active:scale-95"
                    >
                      <span>Google Cal</span>
                      <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            </CardTilt>
          ))}
        </div>
      </div>
    </section>
  )
}
