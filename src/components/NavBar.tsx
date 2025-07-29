import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useSearchStore } from '@/stores/searchStore'
import logo from '@/assets/images/logo.png'

export default function NavBar() {
  const [localQuery, setLocalQuery] = useState('')
  const navigate = useNavigate()
  const setQuery = useSearchStore((state) => state.setQuery)

  const handleSearch = () => {
    setQuery(localQuery)
    navigate('/search')
  }

  return (
    <nav className="w-full px-4 py-3 bg-background text-foreground border-b border-border flex items-center justify-between">
      {/* Logo Icon */}
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="w-8 h-8 rounded-md" />
        <span className="font-semibold text-lg hidden sm:inline">Movies2Watch</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 px-4 max-w-md">
        <div className="flex w-full max-w-sm gap-2">
          <Input
            type="text"
            placeholder="Search for a movie... "
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur()
                handleSearch()
              }
            }}
          />
          <Button type="submit" variant="outline" className="cursor-pointer" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Watchlist */}
      <div>
        <Button
          variant="ghost"
          className="text-sm font-medium"
          onClick={() => navigate('/watchList')}
        >
          WatchList
        </Button>
      </div>
    </nav>
  )
}
