import type { RegionIntentData } from '../../types'
import { INTENT_GROUPS } from '../../data/intents'

interface Props {
  data: RegionIntentData[]
}

export default function RegionRanking({ data }: Props) {
  const topRegions = [...data]
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 8)

  return (
    <div className="glow-card p-6">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-5">
        Top AI Activity Regions
      </h3>
      <div className="space-y-3">
        {topRegions.map((region, i) => {
          const config = INTENT_GROUPS[region.topIntent]
          return (
            <div key={region.countryCode} className="flex items-center gap-3 py-2">
              <span className="text-xs text-slate-500 w-4 font-mono">{i + 1}</span>
              <span className="text-sm text-slate-200 flex-1 truncate">{region.countryName}</span>
              <span
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: `${config.color}20`, color: config.color }}
              >
                {config.label}
              </span>
              <span className="text-xs font-mono text-slate-400 w-6 text-right">{region.volume}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
