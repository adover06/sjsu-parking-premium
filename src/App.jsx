import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
        // support object with keys like "index: 0" by taking values
        const list = Array.isArray(data) ? data : Object.values(data || {})
        setGarages(list)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchGarages()
  }, [])

  return (
    <div className="App">
      <header>
        <div>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Garage Levels</h1>
      </header>

      <main>
        {loading && <p>Loading garages…</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <ul className="garage-list">
            {garages.length === 0 && <li>No garages found.</li>}
            {garages.map((g, i) => (
              <li key={g?.name || i} className="garage-item">
                <strong>{g?.name ?? `Garage ${i + 1}`}</strong>: {g?.fullness ?? '—'}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default App
