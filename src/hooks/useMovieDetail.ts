import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail } from '@/api/tmdb/movieApi'

export const useMovieDetail = (
  id: number,
) => {
  const isValidId = typeof id === 'number' && !isNaN(id)

  const queryResult = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail(id),
    enabled: isValidId,
    staleTime: 1000 * 60 * 5,
  })

  return {
    ...queryResult,
    isInvalidId: !isValidId,
  }
}