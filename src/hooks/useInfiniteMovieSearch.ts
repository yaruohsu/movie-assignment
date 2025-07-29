import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMovies } from '@/api/tmdb/movieApi'

export const useInfiniteMovieSearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['movieSearch', query],
    queryFn: async ({ pageParam = 1 }) => {
      return searchMovies(query, pageParam)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.currentPage ?? 0) + 1 : undefined,
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  })
}
