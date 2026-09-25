export function useSoundEffects() {
  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      const now = ctx.currentTime

      // Two harmonic bell tones
      ;[523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.08)
        
        gain.gain.setValueAtTime(0.06, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 1.3)
      })
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  const playBlessingSitar = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      const now = ctx.currentTime

      const notes = [440, 554.37, 659.25, 830.61, 880, 1108.73]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.07)

        gain.gain.setValueAtTime(0.08, now + idx * 0.07)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.4)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.07)
        osc.stop(now + idx * 0.07 + 1.5)
      })
    } catch {
      // AudioContext fallback
    }
  }

  return { playChime, playBlessingSitar }
}
