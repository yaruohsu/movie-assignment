import { useQuery } from '@tanstack/react-query'
import { fetchMovieVideos } from '@/api/tmdb/movieApi'

export const useMovieVideos = (id: number) => {
  const isValidId = typeof id === 'number' && !isNaN(id)

  const query = useQuery({
    queryKey: ['movieVideos', id],
    queryFn: () => fetchMovieVideos(id),
    enabled: isValidId,
    staleTime: 1000 * 60 * 10,
  })

  return {
    ...query,
    isInvalidId: !isValidId,
  }
}
