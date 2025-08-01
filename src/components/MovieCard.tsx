import type { Movie } from '@/api/tmdb/movieList.dto'
import fallbackPoster from '@/assets/images/fallback-poster.png'
import type { WatchListMovie } from '@/stores/useWatchListStore'
import { Bookmark, BookmarkCheck } from 'lucide-react'

type MovieCardProps = {
  movie: Movie
  isSaved: boolean
  onClick?: (id: number) => void
  onToggleSave?: (movie: Omit<WatchListMovie, 'addTime'>) => void
}

export const MovieCard = ({ movie, isSaved, onClick, onToggleSave }: MovieCardProps) => {
  const { id, title, posterUrl } = movie

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(id)}
      className="flex flex-col gap-3 group cursor-pointer"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
        <img
          alt={title}
          className="h-full w-full object-cover"
          src={posterUrl || fallbackPoster}
          onError={(e) => {
            if (!e.currentTarget.src.includes(fallbackPoster)) {
              e.currentTarget.src = fallbackPoster
            }
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

        {/* WatchList Toggle Button */}
        {onToggleSave && (
          <button
            className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-1 transition cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave({ id, title, posterUrl })
            }}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-yellow-400" />
            ) : (
              <Bookmark className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </div>

      <h2 className="text-base md:text-lg lg:text-xl text-foreground line-clamp-2 text-center">
        {title}
      </h2>
    </div>
  )
}
