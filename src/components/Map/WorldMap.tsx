import { useRef, useEffect, useState, useCallback } from 'react'
import Globe from 'react-globe.gl'
import type { GlobeMethods } from 'react-globe.gl'
import type { FeatureCollection, Geometry } from 'geojson'
import type { RegionIntentData, TooltipData } from '../../types'
import { getCountryFill } from '../../lib/colors'
import Tooltip from './Tooltip'

interface Props {
  geoData: FeatureCollection<Geometry, { name: string }>
  getRegionData: (id: string) => RegionIntentData | undefined
}

export default function WorldMap({ geoData, getRegionData }: Props) {
  const globeRef = useRef<GlobeMethods>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const [hoverD, setHoverD] = useState<object | null>(null)
  const hoveredRegionRef = useRef<RegionIntentData | null>(null)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth
        setDimensions({ width: w, height: Math.max(500, w * 0.65) })
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredRegionRef.current) {
        setTooltip({ x: e.clientX, y: e.clientY, region: hoveredRegionRef.current })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGlobeReady = useCallback(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls()
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.5
      controls.enableDamping = true
    }
  }, [])

  const handlePolygonHover = useCallback((polygon: object | null) => {
    setHoverD(polygon)
    if (polygon) {
      const feature = polygon as GeoJSON.Feature
      const region = getRegionData(String(feature.id))
      hoveredRegionRef.current = region || null
      if (!region) setTooltip(null)
    } else {
      hoveredRegionRef.current = null
      setTooltip(null)
    }
  }, [getRegionData])

  const getPolygonCapColor = useCallback((d: object) => {
    const feature = d as GeoJSON.Feature
    const region = getRegionData(String(feature.id))
    if (region) return getCountryFill(region.topIntent, region.volume)
    return 'rgba(255, 255, 255, 0.05)'
  }, [getRegionData])

  const getPolygonAltitude = useCallback((d: object) => {
    return d === hoverD ? 0.04 : 0.01
  }, [hoverD])

  return (
    <div ref={containerRef} className="relative">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#3a86ff"
        atmosphereAltitude={0.15}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        polygonsData={geoData.features}
        polygonCapColor={getPolygonCapColor}
        polygonSideColor={() => 'rgba(255, 255, 255, 0.05)'}
        polygonStrokeColor={() => 'rgba(255, 255, 255, 0.15)'}
        polygonAltitude={getPolygonAltitude}
        polygonsTransitionDuration={200}
        onPolygonHover={handlePolygonHover}
        onGlobeReady={handleGlobeReady}
        animateIn={true}
      />
      <Tooltip data={tooltip} />
    </div>
  )
}
