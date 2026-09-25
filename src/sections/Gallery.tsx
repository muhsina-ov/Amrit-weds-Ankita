import { useState } from 'react'
import { WEDDING } from '@/config'
import { useReveal } from '@/hooks/useInvitation'
import CardTilt from '@/components/CardTilt'
import { Sparkles, X, ZoomIn } from 'lucide-react'

export default function Gallery() {
  const ref = useReveal<HTMLElement>()
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof WEDDING.gallery)[0] | null>(null)

  return (
    <section id="gallery" ref={ref} className="reveal relative bg-[#070b14] px-6 py-32">
      <div className="mx-auto max-w-6xl text-center">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb141]/40 bg-[#0d1527]/90 px-5 py-2 shadow-lg backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
          <span className="font-royal text-[11px] font-bold uppercase tracking-[0.35em] text-[#ffd768]">
            Celebration Moments
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#ffd768]" />
        </div>

        <h2 className="gold-text-glow font-script mt-4 text-6xl sm:text-7xl">
          Moments &amp; Memories
        </h2>
        <p className="font-royal mt-2 text-xl font-bold uppercase tracking-[0.25em] text-[#f8edd1]">
          {WEDDING.bride} &amp; {WEDDING.groom}
        </p>

        <div className="ornament my-6 text-xl">
          <span>✦</span>
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {WEDDING.gallery.map((item, idx) => (
            <CardTilt key={idx} intensity={8} className="h-full">
              <div
                onClick={() => setSelectedPhoto(item)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#dfb141]/35 bg-[#0d1527] shadow-xl transition-all duration-300 hover:border-[#dfb141] hover:shadow-[0_15px_40px_rgba(223,177,65,0.25)]"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                  {/* Zoom Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#dfb141] bg-[#070b14]/80 text-[#ffd768] shadow-lg backdrop-blur-md">
                      <ZoomIn className="h-5 w-5" />
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="font-royal text-[10px] font-bold uppercase tracking-wider text-[#ffd768] block">
                      {item.tag}
                    </span>
                    <h3 className="font-serif-display text-base font-semibold text-[#f8edd1] mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </CardTilt>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070d]/95 p-4 backdrop-blur-2xl animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-[#dfb141]/60 bg-[#0d1527] p-3 shadow-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#070b14]/80 text-[#ffd768] border border-[#dfb141]/40 hover:bg-[#dfb141] hover:text-[#070b14] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="max-h-[75vh] w-full rounded-2xl object-cover"
            />
            <div className="p-4 text-center">
              <span className="font-royal text-xs font-bold uppercase tracking-widest text-[#ffd768]">
                {selectedPhoto.tag}
              </span>
              <h3 className="font-serif-display mt-1 text-xl font-bold text-[#f8edd1]">
                {selectedPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
