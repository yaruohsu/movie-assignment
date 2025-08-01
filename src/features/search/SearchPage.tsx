import { useEffect, useRef } from 'react'
import { MovieList } from '@/features/search/MovieList'
import { useInfiniteMovieSearch } from '@/hooks/useInfiniteMovieSearch'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
  const [searchParams] = useSearchParams()
  const keyword = decodeURIComponent(searchParams.get('q') ?? '')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteMovieSearch(keyword)

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!bottomRef.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })
    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const movies = data?.pages.flatMap((p) => p.movies) ?? []

  if (isError) return <div className="text-red-500">Error：{error.message}</div>

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <>
          <MovieList movies={movies} />
          <div ref={bottomRef} className="h-12" />
          {isFetchingNextPage && <p className="text-gray-400 mt-4">Loading more...</p>}
          {!hasNextPage && <p className="text-gray-500 mt-4">No more results</p>}
        </>
      )}
    </div>
  )
}

export default Search
