import type { IntentGroup } from '../types'
import { INTENT_GROUPS } from '../data/intents'

export function getIntentColor(group: IntentGroup): string {
  return INTENT_GROUPS[group].color
}

export function getCountryFill(topIntent: IntentGroup, volume: number): string {
  const color = getIntentColor(topIntent)
  const opacity = 0.4 + (volume / 100) * 0.6
  return adjustOpacity(color, opacity)
}

function adjustOpacity(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
