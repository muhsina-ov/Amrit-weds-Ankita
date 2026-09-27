import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import SparkleTrail from '@/components/SparkleTrail'
import PicholaCanvas from '@/components/PicholaCanvas'
import DynamicIslandDock from '@/components/DynamicIslandDock'
import TumPremHoPlayer from '@/components/TumPremHoPlayer'
import RoyalEnvelope from '@/components/RoyalEnvelope'
import Hero from '@/sections/Hero'
import OurStory from '@/sections/OurStory'
import Countdown from '@/sections/Countdown'
import Itinerary from '@/sections/Itinerary'
import Rsvp from '@/sections/Rsvp'
import Details from '@/sections/Details'
import Footer from '@/sections/Footer'

export default function Home() {
  const [isCardOpened, setIsCardOpened] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [lanternCount, setLanternCount] = useState(188)
  const [lanternTrigger, setLanternTrigger] = useState(0)
  const [isSongPlayerOpen, setIsSongPlayerOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Dedicated "Tum Prem Ho" wedding song starting right before relevant lyrics
  useEffect(() => {
    const bgAudio = new Audio('/assets/tum_prem_ho.mp3')
    bgAudio.loop = true
    bgAudio.volume = 0.65
    setAudio(bgAudio)
    audioRef.current = bgAudio

    return () => {
      bgAudio.pause()
    }
  }, [])

  // Auto-play when the invitation card is opened
  const handleOpenCard = () => {
    setIsCardOpened(true)
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser restricted, user click fallback will catch it
        })
    }
  }

  // Fallback: Ensure song starts automatically on first user interaction if not already playing
  useEffect(() => {
    const startAudioOnGesture = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    }

    window.addEventListener('click', startAudioOnGesture, { once: true })
    window.addEventListener('touchstart', startAudioOnGesture, { once: true })

    return () => {
      window.removeEventListener('click', startAudioOnGesture)
      window.removeEventListener('touchstart', startAudioOnGesture)
    }
  }, [isPlaying])

  const toggleAudio = () => {
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }

  const handleReleaseLantern = () => {
    setLanternCount((prev) => prev + 1)
    setLanternTrigger((prev) => prev + 1)
  }

  return (
    <div className="relative min-h-screen bg-[#070b14] text-[#f8edd1] selection:bg-[#dfb141]/30 selection:text-[#ffd768]">
      {/* Royal Opening Wax Seal Card / Envelope */}
      <RoyalEnvelope isOpen={isCardOpened} onOpen={handleOpenCard} />

      {/* Interactive Floating Embers & Sky Lanterns Canvas */}
      <PicholaCanvas triggerLantern={lanternTrigger} />

      {/* Interactive Desktop Gold Stardust Cursor */}
      <SparkleTrail />

      {/* Navigation Header & Gold Progress Bar */}
      <Navbar />

      {/* Main Visual Palatial Experience */}
      <main className="relative z-20">
        <Hero
          onPlaySong={() => setIsSongPlayerOpen(true)}
          isPlayingSong={isPlaying}
        />
        <OurStory />
        <Countdown onTriggerLantern={handleReleaseLantern} />
        <Itinerary />
        <Rsvp />
        <Details />
        <Footer />
      </main>

      {/* Tum Prem Ho Dedicated Song Modal / Floating Drawer */}
      <TumPremHoPlayer
        isOpen={isSongPlayerOpen}
        onClose={() => setIsSongPlayerOpen(false)}
        isPlaying={isPlaying}
        onTogglePlay={toggleAudio}
      />

      {/* Floating Dynamic Island Bottom Dock */}
      <DynamicIslandDock
        isPlaying={isPlaying}
        onToggleAudio={toggleAudio}
        onOpenSongPlayer={() => setIsSongPlayerOpen((prev) => !prev)}
        onReleaseLantern={handleReleaseLantern}
        lanternCount={lanternCount}
      />
    </div>
  )
}
