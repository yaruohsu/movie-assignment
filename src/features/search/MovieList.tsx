import type { Movie } from '@/api/tmdb/movieList.dto'
import { MovieCard } from '@/components/MovieCard'
import { useNavigate } from 'react-router-dom'

interface MovieListProps {
  movies: Movie[]
}

export const MovieList = ({ movies }: MovieListProps) => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => navigate(`../detail/${movie.id}`)}
        />
      ))}
    </div>
  )

}