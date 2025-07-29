import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import routes from './routes'
import './App.css'
import NavBar from './components/NavBar'

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <NavBar />
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
