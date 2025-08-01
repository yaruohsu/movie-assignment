import type { FC } from 'react'
import { useWatchListStore } from '@/stores/useWatchListStore'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { MovieCard } from '@/components/MovieCard'
import { Button } from '@/components/ui/button'

const WatchListPage: FC = () => {
  const { watchList, toggleWatchList } = useWatchListStore()
  const navigate = useNavigate()

  const sorted = [...watchList].sort((a, b) => b.addTime - a.addTime)

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 md:mb-10">Your Watch List</h1>
      {sorted.length === 0 ? (
        <p className="text-muted-foreground">You haven’t saved any movies yet.</p>
      ) : (
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
      )}
    </div>
  )
}

export default WatchListPage
