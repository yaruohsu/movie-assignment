import { useNavigate, useLocation } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Bookmark } from 'lucide-react'
import { useState, useEffect } from 'react'
import logo from '@/assets/images/logo.png'

export default function NavBar() {
  const [query, setQuery] = useState('')
  const [canGoBack, setCanGoBack] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()


  const handleSearch = () => {
    navigate('/search?q=' + encodeURIComponent(query))
  }


  useEffect(() => {
    const hasHistory = window.history.length > 1
    const notOnSearchPage = !location.pathname.startsWith('/search')
    setCanGoBack(hasHistory && notOnSearchPage)
  }, [location.pathname])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('q') || ''
    setQuery(q)
  }, [location.search])

  return (
    <nav className="w-full p-1 md:p-4 bg-background text-foreground border-b border-border flex items-center justify-between">
      {/* Left section: Back icon + Logo */}
      <div className="flex items-center gap-3">
        {/* Back icon: only on mobile and if can go back and not on search page */}
        {canGoBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="sm:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-md" />
          <span className="font-semibold text-lg hidden sm:inline">Movies2Watch</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex-1 px-1 md:px-4 max-w-md">
        <div className="flex w-full max-w-sm gap-2">
          <Input
            type="text"
            placeholder="Search for a movie... "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur()
                handleSearch()
              }
            }}
          />
          <Button type="submit" variant="outline" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Watchlist */}
      <div className="flex items-center gap-2">
        {/* Mobile: icon only */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/watchList')}
          className="sm:hidden"
        >
          <Bookmark className="w-5 h-5" />
        </Button>

        {/* Desktop: icon + text */}
        <Button
          variant="ghost"
          className="hidden sm:flex items-center gap-1 text-sm font-medium"
          onClick={() => navigate('/watchList')}
        >
          <Bookmark className="w-5 h-5" />
          WatchList
        </Button>
      </div>
    </nav>
  )
}
