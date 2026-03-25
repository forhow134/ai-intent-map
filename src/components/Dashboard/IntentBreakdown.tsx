import type { RegionIntentData, IntentGroup } from '../../types'
import { INTENT_GROUPS, INTENT_GROUP_KEYS } from '../../data/intents'

interface Props {
  data: RegionIntentData[]
}

export default function IntentBreakdown({ data }: Props) {
  const globalDist: Record<IntentGroup, number> = { coding: 0, creative: 0, research: 0, business: 0, learning: 0 }
  let totalVolume = 0

  for (const region of data) {
    for (const key of INTENT_GROUP_KEYS) {
      globalDist[key] += region.distribution[key] * region.volume
    }
    totalVolume += region.volume
  }

  if (totalVolume > 0) {
    for (const key of INTENT_GROUP_KEYS) {
      globalDist[key] = Math.round(globalDist[key] / totalVolume)
    }
  }

  const sorted = INTENT_GROUP_KEYS
    .map(k => ({ key: k, value: globalDist[k], config: INTENT_GROUPS[k] }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="glow-card p-5">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
        Global Intent Distribution
      </h3>
      <div className="space-y-3">
        {sorted.map(({ key, value, config }) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm flex items-center gap-2">
                <span>{config.icon}</span>
                <span className="text-slate-200">{config.label}</span>
              </span>
              <span className="text-sm font-mono" style={{ color: config.color }}>{value}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${value}%`, background: config.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
