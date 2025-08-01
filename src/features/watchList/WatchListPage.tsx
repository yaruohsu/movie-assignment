import type { FC } from 'react'
import { useWatchListStore } from '@/stores/useWatchListStore'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { MovieCard } from '@/components/MovieCard'
import { Button } from '@/components/ui/button'

const WatchListPage: FC = () => {
  const { watchList, getRandomMovie, toggleWatchList } = useWatchListStore()
  const navigate = useNavigate()

  const sorted = [...watchList].sort((a, b) => b.addTime - a.addTime)

  const handleLotteryClick = () => {
    const movie = getRandomMovie()
    if (movie) {
      alert(`🎬 Tonight's pick: ${movie.title}`)
    } else {
      alert("你的 WatchList 是空的 😅")
    }
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 md:mb-10">Your Watch List</h1>
      {sorted.length === 0 ? (
        <p className="text-muted-foreground">You haven’t saved any movies yet.</p>
      ) : (
        <div className="flex flex-col items-center">
          <Button
            onClick={handleLotteryClick}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition mb-4 self-end cursor-pointer"
          >
            🎲 Wanna pick a movie ?
          </Button>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sorted.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onImageClick={() => navigate(`/detail/${movie.id}`)}
                content={
                  <>
                    <div className="flex text-sm font-medium h-10 items-center justify-center">{movie.title}</div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleWatchList(movie)}
                      className=" text-red-500 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WatchListPage
