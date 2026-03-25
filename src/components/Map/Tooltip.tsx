import type { TooltipData, IntentGroup } from '../../types'
import { INTENT_GROUPS, INTENT_GROUP_KEYS } from '../../data/intents'

interface Props {
  data: TooltipData | null
}

export default function Tooltip({ data }: Props) {
  if (!data) return null

  const { x, y, region } = data

  const TOOLTIP_W = 260
  const TOOLTIP_H = 200
  const GAP = 12

  const showLeft = x > window.innerWidth / 2
  const showAbove = y > window.innerHeight / 2

  const left = showLeft ? x - TOOLTIP_W - GAP : x + GAP
  const top = showAbove ? y - TOOLTIP_H - GAP : y + GAP

  return (
    <div
      className="map-tooltip"
      style={{
        left,
        top,
        minWidth: TOOLTIP_W,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-semibold text-white">{region.countryName}</span>
        <span className="text-xs text-slate-400">({region.countryCode})</span>
      </div>
      <div className="space-y-1.5">
        {INTENT_GROUP_KEYS.map((key: IntentGroup) => {
          const config = INTENT_GROUPS[key]
          const pct = region.distribution[key]
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span className="w-5 text-center">{config.icon}</span>
              <span className="w-16 text-slate-300">{config.label}</span>
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: config.color }}
                />
              </div>
              <span className="w-8 text-right text-slate-400 text-xs">{pct}%</span>
            </div>
          )
        })}
      </div>
      <div className="mt-2 pt-2 border-t border-white/10 text-xs text-slate-400">
        AI Activity Level: <span className="text-white font-medium">{region.volume}/100</span>
      </div>
    </div>
  )
}
