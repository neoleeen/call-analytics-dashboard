import { useEffect, useState } from "react"
import KpiCard from "@/components/KpiCard"
import DurationChart from "@/components/DurationChart"
import CostByCityChart from "@/components/CostByCityChart"
import CallsPerHourChart from "@/components/CallsPerHourChart"
import CallsByCityChart from "@/components/CallsByCityChart"
import CallLogTable from "@/components/CallLogTable"
import ThemeToggle from "@/components/ThemeToggle"
import DataNotes from "@/components/DataNotes"
import {
  getTotalCalls,
  getTotalCost,
  getAverageDuration,
  getSuccessfulCalls,
  getFailedCalls,
  getDurationStats,
  getAverageCost,
  getCostByCity,
  getCallsByCity,
  getCallsPerHour,
  getRecentCalls,
  getSuccessRate,
  getDurationMismatches,
  formatCurrency,
  formatTime,
} from "@/lib/calculations"

const API_URL = "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr"

function App() {
  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    async function loadCalls() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error("Request failed")
        }
        const data = await response.json()
        setCalls(data)
        setLastUpdated(new Date())
      } catch {
        setError("Couldn't load the call data. Check your connection and try again.")
      } finally {
        setLoading(false)
      }
    }

    loadCalls()
  }, [])

  function renderContent() {
    if (loading) {
      return (
        <div className="glass rounded-xl p-10 text-center text-muted-foreground">
          Loading call data...
        </div>
      )
    }

    if (error) {
      return (
        <div className="glass rounded-xl p-10 text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Try again
          </button>
        </div>
      )
    }

    if (calls.length === 0) {
      return (
        <div className="glass rounded-xl p-10 text-center text-muted-foreground">
          No call records found.
        </div>
      )
    }

    const totalCost = getTotalCost(calls)
    const averageDuration = getAverageDuration(calls)

    return (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KpiCard title="Total Calls" value={getTotalCalls(calls)} />
          <KpiCard title="Total Call Cost" value={formatCurrency(totalCost)} />
          <KpiCard title="Average Duration" value={`${Math.round(averageDuration)}s`} />
          <KpiCard title="Successful Calls" value={getSuccessfulCalls(calls)} />
          <KpiCard title="Failed Calls" value={getFailedCalls(calls)} />
        </div>

        <div className="mt-4">
          <DataNotes
            total={calls.length}
            successRate={getSuccessRate(calls)}
            durationMismatches={getDurationMismatches(calls)}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DurationChart data={getDurationStats(calls)} />
          <CostByCityChart
            data={getCostByCity(calls)}
            averageCost={formatCurrency(getAverageCost(calls))}
          />
          <CallsPerHourChart data={getCallsPerHour(calls)} />
          <CallsByCityChart data={getCallsByCity(calls)} />
        </div>

        <div className="mt-8">
          <CallLogTable calls={getRecentCalls(calls)} />
        </div>
      </>
    )
  }

  return (
    <div className="page-bg relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />
      </div>

      <div className="relative mx-auto max-w-7xl p-4 sm:p-8">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Call Analytics Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              {lastUpdated
                ? `${calls.length} call records · Updated ${formatTime(lastUpdated)}`
                : "Telecom call data record (CDR) analysis"}
            </p>
          </div>
          <ThemeToggle />
        </header>

        {renderContent()}
      </div>
    </div>
  )
}

export default App