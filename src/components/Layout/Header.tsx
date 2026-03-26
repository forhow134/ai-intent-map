interface Props {
  onReportClick: () => void
  totalReports: number
}

export default function Header({ onReportClick, totalReports }: Props) {
  return (
    <header className="text-center py-8 px-4 relative">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
        AI Intent Map
      </h1>
      <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
        Explore how the world uses AI — not what people ask, but what they're <em>doing</em>.
        <br />
        <span className="text-slate-500">Data from OWID, OECD, Stanford AI Index & community reports.</span>
      </p>

      <button
        onClick={onReportClick}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          bg-cyan-500/15 text-cyan-400 border border-cyan-500/30
          hover:bg-cyan-500/25 hover:border-cyan-500/50 transition-all"
      >
        <span>+</span>
        Report Your AI Usage
        {totalReports > 0 && (
          <span className="ml-1 px-1.5 py-0.5 bg-cyan-500/20 rounded-full text-xs">
            {totalReports}
          </span>
        )}
      </button>
    </header>
  )
}
