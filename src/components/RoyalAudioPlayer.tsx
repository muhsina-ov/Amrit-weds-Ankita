import { Volume2, VolumeX, Music } from 'lucide-react'

interface RoyalAudioPlayerProps {
  isPlaying: boolean
  onToggle: () => void
}

export default function RoyalAudioPlayer({ isPlaying, onToggle }: RoyalAudioPlayerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onToggle}
        className="group flex items-center gap-2.5 rounded-full border border-[#b8912f]/50 bg-[#faf6ee]/90 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-[#8a6a1f] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-xl active:scale-95"
        title="Toggle royal ambient music"
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Wave Bars */}
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className="w-1 bg-[#b8912f] rounded-full animate-[equalizer_0.6s_ease-in-out_infinite]" />
              <span className="w-1 bg-[#b8912f] rounded-full animate-[equalizer_0.9s_ease-in-out_infinite_0.2s]" />
              <span className="w-1 bg-[#b8912f] rounded-full animate-[equalizer_0.7s_ease-in-out_infinite_0.4s]" />
            </div>
            <Volume2 className="h-3.5 w-3.5 text-[#b8912f]" />
            <span className="hidden md:inline font-royal font-semibold text-[10px]">
              Sitar &amp; Shehnai
            </span>
          </>
        ) : (
          <>
            <Music className="h-3.5 w-3.5 text-[#8a6a1f]/60" />
            <VolumeX className="h-3.5 w-3.5 text-[#8a6a1f]/70" />
            <span className="hidden md:inline font-royal font-semibold text-[10px]">
              Play Melody
            </span>
          </>
        )}
      </button>
    </div>
  )
}
