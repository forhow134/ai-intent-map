import type { RegionIntentData } from '../../types'

interface Props {
  data: RegionIntentData[]
}

export default function StatsBar({ data }: Props) {
  const totalCountries = data.length
  const avgVolume = Math.round(data.reduce((s, d) => s + d.volume, 0) / (data.length || 1))

  const intentCounts: Record<string, number> = {}
  for (const d of data) {
    intentCounts[d.topIntent] = (intentCounts[d.topIntent] || 0) + 1
  }
  const topGlobal = Object.entries(intentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'coding'

  const stats = [
    { label: 'Countries Tracked', value: totalCountries.toString() },
    { label: 'Avg Activity Score', value: avgVolume.toString() },
    { label: 'Top Global Intent', value: topGlobal.charAt(0).toUpperCase() + topGlobal.slice(1) },
    { label: 'Data Source', value: 'Survey-based' },
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {stats.map(s => (
        <div key={s.label} className="glow-card px-5 py-3 text-center min-w-[140px]">
          <div className="text-lg font-semibold text-white">{s.value}</div>
          <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
