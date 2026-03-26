import { useState, useEffect } from 'react'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import WorldMap from './components/Map/WorldMap'
import StatsBar from './components/Dashboard/StatsBar'
import IntentBreakdown from './components/Dashboard/IntentBreakdown'
import RegionRanking from './components/Dashboard/RegionRanking'
import ReportModal from './components/Report/ReportModal'
import { useMapData } from './hooks/useMapData'
import { useUserReports } from './hooks/useUserReports'

export default function App() {
  const { geoData, intentData, loading, getRegionData, dataSource, setDataSource, updateCommunityData } = useMapData()
  const { communityData, totalReports, refetch } = useUserReports()
  const [reportOpen, setReportOpen] = useState(false)

  useEffect(() => {
    if (communityData.length > 0) {
      updateCommunityData(communityData)
    }
  }, [communityData, updateCommunityData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400 animate-pulse">Loading map data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReportClick={() => setReportOpen(true)} totalReports={totalReports} />

      <main className="flex-1 px-6 max-w-[1400px] mx-auto w-full">
        <StatsBar data={intentData} dataSource={dataSource} onDataSourceChange={setDataSource} />

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

      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmitted={refetch}
      />
    </div>
  )
}
