interface Props {
  onReportClick: () => void
  totalReports: number
}

export default function Header({ onReportClick, totalReports }: Props) {
  return (
    <header className="relative py-10 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            AI Intent Map
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-lg leading-relaxed">
            Explore how the world uses AI — not what people ask, but what they're <em className="text-slate-300">doing</em>.
            <br />
            <span className="text-slate-500 text-xs">Data from OWID, OECD, Stanford AI Index & community reports.</span>
          </p>
        </div>

        <button
          onClick={onReportClick}
          className="self-start md:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
            bg-cyan-500/15 text-cyan-400 border border-cyan-500/30
            hover:bg-cyan-500/25 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
        >
          <span>+</span>
          Report Your AI Usage
          {totalReports > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-cyan-500/25 rounded-full text-xs font-semibold">
              {totalReports}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
