import type { FC } from 'react'
import { BookmarkMinus } from 'lucide-react'
import { useWatchListStore } from '@/stores/useWatchListStore'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
            <Card key={movie.id} className="relative group hover:shadow-md transition-shadow py-0 gap-1">
              <div
                className="relative aspect-[2/3] w-full overflow-hidden cursor-pointer"
                onClick={() => navigate(`/detail/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.posterUrl}`}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-t"
                />
              </div>
              <CardContent className="flex flex-col gap-2 p-2 ">
                <div className="flex text-sm font-medium h-10 items-center justify-center">{movie.title}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleWatchList(movie)}
                  className=" text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <BookmarkMinus className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default WatchListPage
