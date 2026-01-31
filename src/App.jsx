import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function percentFromGarage(g) {
  // Accept multiple possible shapes from the API
  // { fullness: 60 } or { available: 600, total: 1000 }
  // handle numeric fullness
  if (typeof g?.fullness === 'number') return Math.round(g.fullness)
  // handle fullness as a string like "60 %" or "60%"
  if (typeof g?.fullness === 'string') {
    const m = g.fullness.match(/-?\d+(?:\.\d+)?/)
    if (m) return Math.round(parseFloat(m[0]))
  }
  if (typeof g?.available === 'number' && typeof g?.total === 'number') {
    if (g.total === 0) return 0
    return Math.round(((g.total - g.available) / g.total) * 100)
  }
  return null
}

function App() {
  const [garages, setGarages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGarages = async () => {
      setLoading(true)
      setError(null)
      try {
        const apiBase = import.meta.env.DEV ? 'http://localhost:8000' : ''
        const res = await fetch(`${apiBase}/api/garage-levels`)
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const data = await res.json()
        const list = Array.isArray(data) ? data : Object.values(data || {})
        setGarages(list)
      } catch (err) {
        setError(err?.message ?? String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchGarages()
  }, [])

  return (
    <div className="App-root">
      <div className="container">
        <header className="top">
          <nav className="nav-left">&larr; HOME</nav>
          <div className="title">
            <h1>SJSU Parking Status</h1>
            <p className="subtitle">Real-time occupancy levels and availability for campus parking garages.</p>
          </div>
          <div className="time">{new Date().toLocaleTimeString()}</div>
        </header>

        <main>
          {loading && <p className="muted">Loading garages…</p>}
          {error && <p className="error">Error: {error}</p>}

          {!loading && !error && (
            <div className="grid">
              {garages.length === 0 && <div className="muted">No garages found.</div>}
              {garages.map((g, i) => {
                const name = g?.name ?? g?.label ?? `Garage ${i + 1}`
                const percent = percentFromGarage(g)
                const available = g?.available ?? (typeof g?.total === 'number' && typeof percent === 'number' ? Math.round(g.total * (1 - percent / 100)) : null)
                const total = g?.total ?? null
                const address = g?.address ?? g?.location ?? ''
                const maps = g?.maps_url ?? null

                const statusText = (() => {
                  if (typeof available === 'number' && typeof total === 'number') return `${available} of ${total} spots · ${available > 100 ? 'Plenty of space' : available === 0 ? 'Full' : 'Some spaces'}`
                  if (typeof percent === 'number') return `${percent}% occupied`
                  return 'No data'
                })()

                return (
                  <article key={name + i} className="card simple-card">
                    <div className="card-header">{name.toUpperCase()}</div>
                    <div className="card-body simple">
                      <div className="percent">
                        <span className="num">{typeof percent === 'number' ? percent : '—'}</span>
                        <span className="label">%</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
