import { useState, useEffect, useCallback } from 'react'
import type { RegionIntentData, IntentGroup } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

interface CountryIntentSummary {
  country_code: string
  intent: string
  count: number
}

export function useUserReports() {
  const [communityData, setCommunityData] = useState<RegionIntentData[]>([])
  const [totalReports, setTotalReports] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchReports = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return

    setLoading(true)
    const { data, error } = await supabase
      .from('country_intent_summary')
      .select('*')

    if (error || !data) {
      setLoading(false)
      return
    }

    const summaries = data as CountryIntentSummary[]
    const total = summaries.reduce((s, r) => s + r.count, 0)
    setTotalReports(total)

    const byCountry = new Map<string, Map<string, number>>()
    for (const row of summaries) {
      if (!byCountry.has(row.country_code)) {
        byCountry.set(row.country_code, new Map())
      }
      byCountry.get(row.country_code)!.set(row.intent, row.count)
    }

    const result: RegionIntentData[] = []
    for (const [countryCode, intents] of byCountry) {
      const totalCount = Array.from(intents.values()).reduce((a, b) => a + b, 0)
      const distribution: Record<IntentGroup, number> = {
        coding: 0, creative: 0, research: 0, business: 0, learning: 0,
      }
      for (const [intent, count] of intents) {
        if (intent in distribution) {
          distribution[intent as IntentGroup] = Math.round((count / totalCount) * 100)
        }
      }
      const topIntent = (Object.entries(distribution) as [IntentGroup, number][])
        .sort((a, b) => b[1] - a[1])[0][0]

      result.push({
        countryCode,
        countryName: countryCode,
        numericId: '',
        distribution,
        topIntent,
        volume: Math.min(100, Math.round(totalCount / 10)),
        sources: ['Community'],
      })
    }

    setCommunityData(result)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  return { communityData, totalReports, loading, refetch: fetchReports }
}
