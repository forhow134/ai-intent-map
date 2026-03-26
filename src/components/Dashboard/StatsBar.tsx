import type { RegionIntentData, DataSourceMode } from '../../types'

interface Props {
  data: RegionIntentData[]
  dataSource: DataSourceMode
  onDataSourceChange: (mode: DataSourceMode) => void
}

const SOURCE_LABELS: Record<DataSourceMode, string> = {
  official: 'Official',
  community: 'Community',
  blended: 'Blended',
}

export default function StatsBar({ data, dataSource, onDataSourceChange }: Props) {
  const totalCountries = data.length
  const avgVolume = Math.round(data.reduce((s, d) => s + d.volume, 0) / (data.length || 1))

  const intentCounts: Record<string, number> = {}
  for (const d of data) {
    intentCounts[d.topIntent] = (intentCounts[d.topIntent] || 0) + 1
  }
  const topGlobal = Object.entries(intentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'coding'

  const allSources = new Set<string>()
  for (const d of data) {
    d.sources?.forEach(s => allSources.add(s))
  }
  const sourceStr = allSources.size > 0
    ? Array.from(allSources).slice(0, 3).join(' + ')
    : 'Survey-based'

  const stats = [
    { label: 'Countries Tracked', value: totalCountries.toString() },
    { label: 'Avg Activity Score', value: avgVolume.toString() },
    { label: 'Top Global Intent', value: topGlobal.charAt(0).toUpperCase() + topGlobal.slice(1) },
    { label: 'Data Sources', value: sourceStr },
  ]

  const modes: DataSourceMode[] = ['official', 'community', 'blended']

  return (
    <div className="space-y-5 px-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="glow-card px-5 py-5 text-center">
            <div className="text-lg font-semibold text-white truncate" title={s.value}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {modes.map(mode => (
          <button
            key={mode}
            onClick={() => onDataSourceChange(mode)}
            className={`px-4 py-2 text-xs rounded-full transition-all ${
              dataSource === mode
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : 'text-slate-500 hover:text-slate-300 border border-transparent'
            }`}
          >
            {SOURCE_LABELS[mode]}
          </button>
        ))}
      </div>
    </div>
  )
}
