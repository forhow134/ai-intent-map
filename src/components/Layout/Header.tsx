export default function Header() {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        AI Intent Map
      </h1>
      <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
        Explore how the world uses AI — not what people ask, but what they're <em>doing</em>.
        <br />
        <span className="text-slate-500">Privacy-safe. Intent-only. No raw prompts.</span>
      </p>
    </header>
  )
}
