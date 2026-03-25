export type IntentGroup = 'coding' | 'creative' | 'research' | 'business' | 'learning'

export type IntentAction =
  | 'debug' | 'build' | 'refactor' | 'code_review' | 'deploy'
  | 'design' | 'write' | 'brainstorm' | 'image_gen'
  | 'search' | 'summarize' | 'analyze_data' | 'translate'
  | 'email' | 'marketing' | 'planning' | 'finance'
  | 'explain' | 'tutor' | 'practice' | 'quiz'

export interface IntentGroupConfig {
  label: string
  color: string
  icon: string
  actions: { key: IntentAction; label: string }[]
}

export interface RegionIntentData {
  countryCode: string
  countryName: string
  numericId: string
  distribution: Record<IntentGroup, number>
  topIntent: IntentGroup
  volume: number
}

export interface TooltipData {
  x: number
  y: number
  region: RegionIntentData
}
