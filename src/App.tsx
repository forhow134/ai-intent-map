import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import WorldMap from './components/Map/WorldMap'
import StatsBar from './components/Dashboard/StatsBar'
import IntentBreakdown from './components/Dashboard/IntentBreakdown'
import RegionRanking from './components/Dashboard/RegionRanking'
import { useMapData } from './hooks/useMapData'

export default function App() {
  const { geoData, intentData, loading, getRegionData } = useMapData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">Loading map data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-6 max-w-[1400px] mx-auto w-full">
        <StatsBar data={intentData} />

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            {geoData && (
              <div className="glow-card p-4 overflow-hidden">
                <WorldMap geoData={geoData} getRegionData={getRegionData} />
              </div>
            )}
          </div>

          <div className="lg:w-80 space-y-4 shrink-0">
            <IntentBreakdown data={intentData} />
            <RegionRanking data={intentData} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
