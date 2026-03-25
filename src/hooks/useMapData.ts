import { useState, useEffect } from 'react'
import * as topojson from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import type { RegionIntentData } from '../types'
import { generateSyntheticData } from '../data/regionProfiles'

interface CountryProperties {
  name: string
}

export function useMapData() {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, CountryProperties> | null>(null)
  const [intentData, setIntentData] = useState<RegionIntentData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/world-110m.json')
      .then(res => res.json())
      .then((topo: Topology) => {
        const countries = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection<CountryProperties>
        ) as FeatureCollection<Geometry, CountryProperties>
        setGeoData(countries)
        setIntentData(generateSyntheticData())
        setLoading(false)
      })
  }, [])

  const getRegionData = (numericId: string): RegionIntentData | undefined => {
    return intentData.find(d => d.numericId === numericId)
  }

  return { geoData, intentData, loading, getRegionData }
}
