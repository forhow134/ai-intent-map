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
        setError('Submission failed, please try again.')
        setSubmitting(false)
        return
      }
    }

    setSubmitting(false)
    setDone(true)
    onSubmitted?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative glow-card w-full max-w-md px-8 py-8 md:px-10 md:py-10 animate-in fade-in zoom-in-95">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors text-lg leading-none"
        >
          x
        </button>

        <h2 className="text-xl font-semibold text-white mb-3">Share Your AI Usage</h2>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          Tell us how you use AI. Your input helps paint a clearer global picture.
        </p>

        {done ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-4">
              {intent && INTENT_GROUPS[intent].icon}
            </div>
            <p className="text-white font-medium mb-2">Thanks for sharing!</p>
            <p className="text-sm text-slate-400 mb-8">
              Your input makes the map more accurate.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-lg text-sm text-cyan-400 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-7">
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
                Demo mode: Supabase not configured, reports will not be saved.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
