import type { IntentGroup } from '../../types'
import { INTENT_GROUPS, INTENT_GROUP_KEYS } from '../../data/intents'

interface Props {
  selectedIntent: IntentGroup | null
  selectedAction: string | null
  onIntentChange: (intent: IntentGroup) => void
  onActionChange: (action: string | null) => void
}

export default function IntentPicker({ selectedIntent, selectedAction, onIntentChange, onActionChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-2">Primary AI Usage</label>
        <div className="grid grid-cols-2 gap-2">
          {INTENT_GROUP_KEYS.map(key => {
            const config = INTENT_GROUPS[key]
            const active = selectedIntent === key
            return (
              <button
                key={key}
                onClick={() => { onIntentChange(key); onActionChange(null) }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all border ${
                  active
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-white'
                    : 'border-white/5 bg-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                }`}
              >
                <span>{config.icon}</span>
                <span>{config.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {selectedIntent && (
        <div>
          <label className="block text-sm text-slate-400 mb-2">Specific Action (optional)</label>
          <div className="flex flex-wrap gap-1.5">
            {INTENT_GROUPS[selectedIntent].actions.map(action => (
              <button
                key={action.key}
                onClick={() => onActionChange(selectedAction === action.key ? null : action.key)}
                className={`px-2.5 py-1 rounded-full text-xs transition-all border ${
                  selectedAction === action.key
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                    : 'border-white/5 text-slate-500 hover:text-slate-300'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
