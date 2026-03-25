import type { IntentGroup, IntentGroupConfig } from '../types'

export const INTENT_GROUPS: Record<IntentGroup, IntentGroupConfig> = {
  coding: {
    label: 'Coding',
    color: '#00D4FF',
    icon: '💻',
    actions: [
      { key: 'debug', label: 'Debug' },
      { key: 'build', label: 'Build' },
      { key: 'refactor', label: 'Refactor' },
      { key: 'code_review', label: 'Code Review' },
      { key: 'deploy', label: 'Deploy' },
    ],
  },
  creative: {
    label: 'Creative',
    color: '#FF6B9D',
    icon: '🎨',
    actions: [
      { key: 'design', label: 'Design' },
      { key: 'write', label: 'Write' },
      { key: 'brainstorm', label: 'Brainstorm' },
      { key: 'image_gen', label: 'Image Gen' },
    ],
  },
  research: {
    label: 'Research',
    color: '#C084FC',
    icon: '🔬',
    actions: [
      { key: 'search', label: 'Search' },
      { key: 'summarize', label: 'Summarize' },
      { key: 'analyze_data', label: 'Analyze Data' },
      { key: 'translate', label: 'Translate' },
    ],
  },
  business: {
    label: 'Business',
    color: '#34D399',
    icon: '📊',
    actions: [
      { key: 'email', label: 'Email' },
      { key: 'marketing', label: 'Marketing' },
      { key: 'planning', label: 'Planning' },
      { key: 'finance', label: 'Finance' },
    ],
  },
  learning: {
    label: 'Learning',
    color: '#FBBF24',
    icon: '📚',
    actions: [
      { key: 'explain', label: 'Explain' },
      { key: 'tutor', label: 'Tutor' },
      { key: 'practice', label: 'Practice' },
      { key: 'quiz', label: 'Quiz' },
    ],
  },
}

export const INTENT_GROUP_KEYS = Object.keys(INTENT_GROUPS) as IntentGroup[]
