import type { Movie } from '@/api/tmdb/movieList.dto'
import { MovieCard } from '@/components/MovieCard'

interface MovieListProps {
  movies: Movie[]
  onMovieClick?: (id: number) => void
}

export const MovieList = ({ movies, onMovieClick }: MovieListProps) => (
  <div className="container mx-auto px-4 py-6">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} onClick={onMovieClick} />
      ))}
    </div>
  </div>
)
