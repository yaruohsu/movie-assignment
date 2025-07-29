import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Suspense } from 'react'
import routes from './routes'

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4 text-blue-500">
          <Link to="/">Search</Link>
          <Link to="/detail">Detail</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>

        <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}
