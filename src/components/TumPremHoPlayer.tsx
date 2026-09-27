import { useState } from 'react'
import { WEDDING } from '@/config'
import { Music, Play, Pause, ExternalLink, X, Disc3 } from 'lucide-react'

interface TumPremHoPlayerProps {
  isOpen: boolean
  onClose: () => void
  isPlaying: boolean
  onTogglePlay: () => void
}

export default function TumPremHoPlayer({
  isOpen,
  onClose,
  isPlaying,
  onTogglePlay,
}: TumPremHoPlayerProps) {
  const [showVideo, setShowVideo] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="glass-twilight overflow-hidden rounded-3xl border-2 border-[#dfb141] bg-[#0d1527]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfb141]/20 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#dfb141] animate-ping" />
            <span className="font-royal text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffd768]">
              Wedding Melody
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#070b14]/70 text-[#dfb141] hover:bg-[#dfb141] hover:text-[#070b14] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 flex items-center gap-4">
          {/* Animated Gold Vinyl Record */}
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#dfb141] bg-[#070b14] shadow-[0_0_15px_rgba(223,177,65,0.3)]">
            <Disc3
              className={`h-12 w-12 text-[#dfb141] ${
                isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
            />
            <span className="absolute h-4 w-4 rounded-full border border-[#dfb141] bg-[#121c33]" />
          </div>

          {/* Song Info */}
          <div className="min-w-0 flex-1">
            <p className="font-royal text-xs font-bold uppercase tracking-wider text-[#ffd768] truncate">
              {WEDDING.music.title}
            </p>
            <p className="font-serif-display text-xs text-[#dcd1ba] mt-0.5 truncate">
              {WEDDING.music.artist}
            </p>
            <p className="font-royal text-[9px] uppercase tracking-wider text-[#dfb141]/80 mt-1">
              Couple's Handpicked Song
            </p>
          </div>
        </div>

        {/* Embedded YouTube Player if toggled */}
        {showVideo && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-[#dfb141]/30">
            <iframe
              width="100%"
              height="160"
              src={`https://www.youtube.com/embed/${WEDDING.music.youtubeId}?autoplay=1&start=13&enablejsapi=1`}
              title="Tum Prem Ho - Official Song"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-[#dfb141]/15">
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#dfb141] to-[#ffd768] px-4 py-2 font-royal text-[10px] font-bold uppercase tracking-wider text-[#070b14] shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-[#070b14]" />
                <span>Play Song</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowVideo(!showVideo)}
            className="flex items-center gap-1.5 rounded-full border border-[#dfb141]/40 bg-[#121c33] px-3 py-2 font-royal text-[10px] font-bold uppercase tracking-wider text-[#e6d3a3] hover:text-[#ffd768] transition-colors"
          >
            <Music className="h-3 w-3 text-[#dfb141]" />
            <span>{showVideo ? 'Hide Video' : 'Original Video'}</span>
          </button>

          <a
            href={WEDDING.music.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[10px] font-royal font-bold uppercase tracking-wider text-[#dfb141] hover:text-white transition-colors"
            title="Open on YouTube Music"
          >
            <span>YT Music</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
