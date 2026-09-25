import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import CardTilt from '@/components/CardTilt'
import { MapPin, Navigation, Calendar as CalendarIcon, ExternalLink, Sparkles, Plane, Train, Home } from 'lucide-react'

function icsEscape(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function toIcsDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export default function Details() {
  const ref = useReveal<HTMLElement>()

  const downloadIcs = () => {
    const start = WEDDING.date
    const end = new Date(start.getTime() + 5 * 3600 * 1000)
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//InviteStory//Wedding//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@ankita-weds-amrit`,
      `DTSTAMP:${toIcsDate(new Date())}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(end)}`,
      `SUMMARY:${icsEscape(`${WEDDING.bride} & ${WEDDING.groom} — Wedding Celebration`)}`,
      `LOCATION:${icsEscape(WEDDING.venue)}`,
      `DESCRIPTION:${icsEscape(`These kids are getting married! Warmly invited to the wedding celebration of Ankita & Amrit at Sahyadri Mangal Karyalay. ${WEDDING.hashtag}`)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'ankita-amrit-wedding.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${WEDDING.bride} & ${WEDDING.groom} — Wedding Celebration`
  )}&dates=${toIcsDate(WEDDING.date)}/${toIcsDate(
    new Date(WEDDING.date.getTime() + 5 * 3600 * 1000)
  )}&location=${encodeURIComponent(WEDDING.venue)}&details=${encodeURIComponent(
    `“These kids are getting married” — Cordially invited to celebrate the wedding of Ankita & Amrit at Sahyadri Mangal Karyalay. ${WEDDING.hashtag}`
  )}`

  return (
    <section id="details" ref={ref} className="reveal relative bg-gradient-to-b from-[#070b14] via-[#0d1629] to-[#070b14] px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            Venue &amp; Travel Guide
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          The Wedding Venue
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1]">
          {WEDDING.venue}
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        {/* Playful & Heartfelt Announcement */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#dfb141]/35 bg-[#0d1527]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <p className="font-royal text-xs font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            {WEDDING.beginningPhrase}
          </p>
          <div className="font-serif-display mt-3 text-sm leading-relaxed text-[#e6d3a3]">
            <p className="gold-text-glow font-script text-4xl sm:text-5xl text-[#ffd768]">
              {WEDDING.bride} &amp; {WEDDING.groom}
            </p>
          </div>
          <p className="font-serif-display italic text-xs sm:text-sm text-[#c9bea7] pt-3">
            Along with their families, request the pleasure of your company and heartfelt blessings as they embark on this beautiful adventure together!
          </p>
        </div>

        {/* Main Venue Card with 3D Tilt */}
        <div className="mt-14">
          <CardTilt intensity={6}>
            <div className="glass-twilight royal-corners overflow-hidden rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-center">
              <span className="font-royal text-[10px] font-bold uppercase tracking-[0.4em] text-[#ffd768] bg-[#070b14] px-4 py-1.5 rounded-full border border-[#dfb141]/50 shadow-sm">
                Main Wedding Ceremony &amp; Reception
              </span>

              <h3 className="font-royal mt-6 text-2xl sm:text-3xl font-bold uppercase tracking-[0.2em] text-[#f8edd1]">
                {WEDDING.dateLabel}
              </h3>
              <p className="gold-text-glow font-script mt-2 text-5xl sm:text-6xl">{WEDDING.timeLabel}</p>

              <div className="ornament my-6 text-lg">
                <span>✦</span>
              </div>

              <div className="flex items-center justify-center gap-2.5 text-[#f8edd1] font-bold text-base sm:text-lg max-w-lg mx-auto">
                <MapPin className="h-5 w-5 text-[#ffd768] shrink-0" />
                <span>{WEDDING.venue}</span>
              </div>

              {/* Quick Calendar Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={downloadIcs}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#dfb141] via-[#ffd768] to-[#dfb141] px-6 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#070b14] shadow-[0_0_20px_rgba(223,177,65,0.35)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(223,177,65,0.5)] active:scale-95"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span>Save to Calendar (.ics)</span>
                </button>
                <a
                  href={gcal}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#dfb141]/60 bg-[#121c33] px-6 py-3.5 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] transition-all hover:bg-[#1a2849] hover:border-[#dfb141] hover:scale-105 active:scale-95 shadow-md"
                >
                  <CalendarIcon className="h-4 w-4 text-[#ffd768]" />
                  <span>Google Calendar</span>
                </a>
              </div>
            </div>
          </CardTilt>
        </div>

        {/* Embedded Map & Google Maps Navigation */}
        <div className="glass-twilight mt-12 overflow-hidden rounded-3xl shadow-2xl text-left border border-[#dfb141]/40">
          <iframe
            title="Venue location map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(WEDDING.mapQuery)}&output=embed`}
            className="h-80 w-full border-0 brightness-90 contrast-110"
            loading="lazy"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0d1527] px-6 py-4 border-t border-[#dfb141]/25">
            <a
              href={WEDDING.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-royal text-xs font-bold uppercase tracking-[0.2em] text-[#ffd768] hover:text-white transition-colors"
            >
              <Navigation className="h-4 w-4 text-[#ffd768]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </a>

            <span className="font-royal text-[11px] text-[#e6d3a3]">
              📍 Venue: {WEDDING.venue}
            </span>
          </div>
        </div>

        {/* Travel & Stay Details Section */}
        <div className="mt-14 text-left">
          <h3 className="font-royal text-xl sm:text-2xl font-bold uppercase tracking-[0.25em] text-[#ffd768] text-center mb-8">
            ✈️ Travel &amp; Accommodation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Airport Travel Card */}
            <div className="glass-twilight rounded-2xl p-6 shadow-md border border-[#dfb141]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-[#ffd768] font-royal text-xs font-bold uppercase tracking-wider">
                  <Plane className="h-5 w-5 text-[#dfb141]" />
                  <span>Airport Travel</span>
                </div>
                <p className="font-royal text-[11px] uppercase tracking-wider text-[#dcd1ba] mt-2 mb-3">
                  Nearest Airports:
                </p>
                <div className="space-y-3 font-serif-display text-xs text-[#f8edd1]">
                  <div className="rounded-xl bg-[#070b14]/70 p-3 border border-[#dfb141]/20">
                    <p className="font-bold text-sm text-[#ffd768]">1. Navi Mumbai Int'l Airport</p>
                    <p className="text-[#dcd1ba] mt-1">Approx. <strong>1h 54 mins</strong> drive</p>
                  </div>
                  <div className="rounded-xl bg-[#070b14]/70 p-3 border border-[#dfb141]/20">
                    <p className="font-bold text-sm text-[#ffd768]">2. Chhatrapati Shivaji Maharaj Int'l Mumbai</p>
                    <p className="text-[#dcd1ba] mt-1">Approx. <strong>2h 30 mins</strong> drive</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Train Station Card */}
            <div className="glass-twilight rounded-2xl p-6 shadow-md border border-[#dfb141]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-[#ffd768] font-royal text-xs font-bold uppercase tracking-wider">
                  <Train className="h-5 w-5 text-[#dfb141]" />
                  <span>Train Station</span>
                </div>
                <p className="font-royal text-[11px] uppercase tracking-wider text-[#dcd1ba] mt-2 mb-3">
                  Nearest Railway Hub:
                </p>
                <div className="rounded-xl bg-[#070b14]/70 p-3.5 border border-[#dfb141]/20">
                  <p className="font-bold text-base text-[#ffd768]">Kalyan (Kalyan Junction)</p>
                  <p className="font-serif-display text-xs text-[#dcd1ba] mt-2 leading-relaxed">
                    Well connected by central railway lines, local suburban trains, and express long-distance trains from all parts of the country.
                  </p>
                </div>
              </div>
            </div>

            {/* Stay & Check-in Card */}
            <div className="glass-twilight rounded-2xl p-6 shadow-md border border-[#dfb141]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-[#ffd768] font-royal text-xs font-bold uppercase tracking-wider">
                  <Home className="h-5 w-5 text-[#dfb141]" />
                  <span>Stay &amp; Check-In</span>
                </div>
                <p className="font-royal text-[11px] uppercase tracking-wider text-[#dcd1ba] mt-2 mb-3">
                  Accommodations:
                </p>
                <div className="rounded-xl bg-[#070b14]/70 p-3.5 border border-[#dfb141]/20">
                  <p className="font-bold text-base text-[#ffd768]">{WEDDING.stayVenue}</p>
                  <p className="font-serif-display text-xs text-[#dcd1ba] mt-2 leading-relaxed">
                    Warm stay arrangements and check-in hosted for wedding guests and family. Also the venue for Mehendi &amp; Haldi ceremonies!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
