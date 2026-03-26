import { useState, useEffect, useCallback } from 'react'
import * as topojson from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import type { RegionIntentData, DataSourceMode } from '../types'
import { generateSyntheticData } from '../data/regionProfiles'

interface CountryProperties {
  name: string
}

export function useMapData() {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, CountryProperties> | null>(null)
  const [officialData, setOfficialData] = useState<RegionIntentData[]>([])
  const [communityData, setCommunityData] = useState<RegionIntentData[]>([])
  const [dataSource, setDataSource] = useState<DataSourceMode>('official')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/data/world-110m.json').then(res => res.json()),
      fetch('/data/ai-intent-real.json').then(res => res.json()).catch(() => null),
    ]).then(([topo, realData]: [Topology, RegionIntentData[] | null]) => {
      const countries = topojson.feature(
        topo,
        topo.objects.countries as GeometryCollection<CountryProperties>
      ) as FeatureCollection<Geometry, CountryProperties>
      setGeoData(countries)
      setOfficialData(realData ?? generateSyntheticData())
      setLoading(false)
    })
  }, [])

  const updateCommunityData = useCallback((data: RegionIntentData[]) => {
    setCommunityData(data)
  }, [])

  const intentData = (() => {
    if (dataSource === 'community' && communityData.length > 0) return communityData
    if (dataSource === 'blended' && communityData.length > 0) {
      return blendData(officialData, communityData)
    }
    return officialData
  })()

  const getRegionData = (numericId: string): RegionIntentData | undefined => {
    return intentData.find(d => d.numericId === numericId)
  }

  return { geoData, intentData, loading, getRegionData, dataSource, setDataSource, updateCommunityData }
}

function blendData(official: RegionIntentData[], community: RegionIntentData[]): RegionIntentData[] {
  const communityMap = new Map(community.map(d => [d.countryCode, d]))
  const W_OFFICIAL = 0.8
  const W_COMMUNITY = 0.2

  return official.map(o => {
    const c = communityMap.get(o.countryCode)
    if (!c) return o

    const distribution = { ...o.distribution }
    for (const key of Object.keys(distribution) as Array<keyof typeof distribution>) {
      distribution[key] = Math.round(o.distribution[key] * W_OFFICIAL + c.distribution[key] * W_COMMUNITY)
    }
    const total = Object.values(distribution).reduce((a, b) => a + b, 0)
    for (const key of Object.keys(distribution) as Array<keyof typeof distribution>) {
      distribution[key] = Math.round((distribution[key] / total) * 100)
    }
    const topIntent = (Object.entries(distribution) as [typeof key, number][])
      .sort((a, b) => b[1] - a[1])[0][0] as keyof typeof distribution

    return {
      ...o,
      distribution,
      topIntent,
      volume: Math.round(o.volume * W_OFFICIAL + c.volume * W_COMMUNITY),
      sources: [...(o.sources ?? []), 'Community'],
    }
  })
}
