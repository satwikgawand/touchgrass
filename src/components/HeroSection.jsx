export default function HeroSection() {
  const handleScroll = () => {
    document.getElementById('quest-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]" />

      <div className="max-w-2xl w-full text-center space-y-6 relative z-10">
        {/* System boot flavor */}
        <p className="text-[#00ff41]/50 text-xs font-mono tracking-widest uppercase">
          &gt; SYSTEM LOADED. QUEST ASSIGNED.
        </p>

        {/* App name */}
        <h1 className="text-5xl sm:text-7xl font-mono font-bold tracking-tight text-white leading-none">
          TOUCH
          <br />
          <span className="text-[#00ff41]">GRASS</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-mono text-gray-300 leading-relaxed">
          You've been living on autopilot.
          <br />
          <span className="text-[#00ff41]">Here's today's side quest.</span>
        </p>

        {/* Description */}
        <p className="text-sm font-mono text-gray-500 max-w-md mx-auto leading-relaxed">
          One random quest per day. No accounts. No algorithms. Just you,
          a mission, and the outside world. Complete it, reroll it, or
          skip it — your call.
        </p>

        {/* Scroll CTA */}
        <button
          onClick={handleScroll}
          className="mt-8 inline-flex flex-col items-center gap-2 text-[#00ff41]/70 hover:text-[#00ff41] transition-colors font-mono text-sm group"
          aria-label="Scroll to quest"
        >
          <span className="tracking-widest">[ VIEW QUEST ]</span>
          <span className="text-xl group-hover:translate-y-1 transition-transform">↓</span>
        </button>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-4 left-4 text-[#00ff41]/20 font-mono text-xs">
        v1.0.0
      </div>
      <div className="pointer-events-none absolute top-4 right-4 text-[#00ff41]/20 font-mono text-xs">
        NPC_OVERRIDE.exe
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 text-[#00ff41]/20 font-mono text-xs">
        touchgrass.brnrot.fun
      </div>
    </section>
  )
}
