import { MovieList } from '@/components/MovieList'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useInfiniteMovieSearch } from '@/hooks/useInfiniteMovieSearch'
import { useEffect, useRef, useState } from 'react'

const Search = () => {
  const [query] = useState('snoopy')

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteMovieSearch(query)

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
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Movie to Watch</h1>
        <div className="flex w-full max-w-sm gap-2">
          <Input type="text" placeholder="Search for a movie... " />
          <Button
            type="submit"
            variant="outline"
            onClick={() => alert('Search functionality not implemented yet')}
          >
            Search
          </Button>
        </div>
      </div>
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
