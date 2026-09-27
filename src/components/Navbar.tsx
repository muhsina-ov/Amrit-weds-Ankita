import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrollProgress } from '@/hooks/useParallax'
import { WEDDING } from '@/config'

export default function Navbar() {
  const { scrollProgress, scrollY } = useScrollProgress()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = scrollY > 60

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Functions', href: '#itinerary' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Venue & Travel', href: '#details' },
  ]

  return (
    <>
      {/* 24K Gold Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#dfb141]/20">
        <div
          className="h-full bg-gradient-to-r from-[#b88a28] via-[#ffd768] to-[#dfb141] shadow-[0_0_8px_#dfb141] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation Header */}
      <header
        className={`fixed top-0.5 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070b14]/90 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl border-b border-[#dfb141]/25'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          {/* Logo / Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfb141]/70 bg-gradient-to-br from-[#121c33] to-[#070b14] shadow-[0_0_15px_rgba(223,177,65,0.3)]">
              <span className="font-royal text-sm font-bold tracking-widest text-[#ffd768]">A&amp;A</span>
            </div>
            <div>
              <span className="font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#f8edd1] block">
                {WEDDING.bride} &amp; {WEDDING.groom}
              </span>
              <span className="font-royal text-[9px] uppercase tracking-[0.25em] text-[#dfb141] block">
                9th Dec 2026 • Sahyadri
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-royal text-xs font-semibold uppercase tracking-[0.2em] text-[#e6d3a3] transition-colors hover:text-[#ffd768]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full border border-[#dfb141]/50 bg-[#0d1527]/90 p-2 text-[#ffd768] shadow-md backdrop-blur-md"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-[#dfb141]/30 bg-[#070b14]/98 px-6 py-6 shadow-2xl backdrop-blur-2xl animate-fade-in">
            <nav className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-royal text-xs font-bold uppercase tracking-[0.25em] text-[#e6d3a3] py-2 border-b border-[#dfb141]/15"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
