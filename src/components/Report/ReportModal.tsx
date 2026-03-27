import { useState } from 'react'
import type { IntentGroup } from '../../types'
import { INTENT_GROUPS } from '../../data/intents'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import CountrySelect from './CountrySelect'
import IntentPicker from './IntentPicker'

interface Props {
  open: boolean
  onClose: () => void
  onSubmitted?: () => void
}

export default function ReportModal({ open, onClose, onSubmitted }: Props) {
  const [country, setCountry] = useState('')
  const [intent, setIntent] = useState<IntentGroup | null>(null)
  const [subAction, setSubAction] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (!open) return null

  const reset = () => {
    setCountry('')
    setIntent(null)
    setSubAction(null)
    setError(null)
    setDone(false)
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = async () => {
    if (!country || !intent) return

    setSubmitting(true)
    setError(null)

    if (isSupabaseConfigured && supabase) {
      const { error: err } = await supabase.from('user_reports').insert({
        country_code: country,
        intent,
        sub_action: subAction,
      })
      if (err) {
        setError('Failed to submit. Please try again.')
        setSubmitting(false)
        return
      }
    }

    setSubmitting(false)
    setDone(true)
    onSubmitted?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative glow-card w-full max-w-md p-6 animate-in fade-in zoom-in-95">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-white transition-colors text-lg leading-none rounded-full hover:bg-white/5"
        >
          x
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Share Your AI Usage</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Tell us how you use AI — it helps everyone see the bigger picture.
          </p>
        </div>

        {done ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-3">
              {intent && INTENT_GROUPS[intent].icon}
            </div>
            <p className="text-white font-medium mb-1">Thanks for sharing!</p>
            <p className="text-sm text-slate-400 mb-6">
              Your input makes this map more useful.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg text-sm text-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <CountrySelect value={country} onChange={setCountry} />

            <IntentPicker
              selectedIntent={intent}
              selectedAction={subAction}
              onIntentChange={setIntent}
              onActionChange={setSubAction}
            />

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={!country || !intent || submitting}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all
                disabled:opacity-30 disabled:cursor-not-allowed
                bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border border-cyan-500/30"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>

            {!isSupabaseConfigured && (
              <p className="text-xs text-amber-500/70 text-center">
                Demo mode — Supabase not configured. Reports won't be saved.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
