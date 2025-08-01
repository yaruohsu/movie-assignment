import { useNavigate } from 'react-router-dom'
import type { Movie } from '@/api/tmdb/movieList.dto'
import { MovieCard } from '@/components/MovieCard'
import { useWatchListStore } from '@/stores/useWatchListStore'

interface MovieListProps {
  movies: Movie[]
}

export const MovieList = ({ movies }: MovieListProps) => {
  const navigate = useNavigate()
  const { watchList, toggleWatchList } = useWatchListStore()

  const isSaved = (id: number) => watchList.some((m) => m.id === id)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isSaved={isSaved(movie.id)}
          onToggleSave={toggleWatchList}
          onCardClick={() => navigate(`../detail/${movie.id}`)}
          content={
            <h2 className="text-base md:text-lg lg:text-xl text-foreground line-clamp-2 text-center">
              {movie.title}
            </h2>
          }
        />
      ))}
    </div>
  )

}