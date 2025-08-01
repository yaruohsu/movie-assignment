import type { Movie } from '@/api/tmdb/movieList.dto'
import type { WatchListMovie } from '@/stores/useWatchListStore'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import fallbackPoster from '@/assets/images/fallback-poster.png'
import { WishListToggle } from './WishListToggle'

type MovieCardProps = {
  movie: Movie | Omit<WatchListMovie, 'addTime'>
  isSaved?: boolean
  onCardClick?: (id: number) => void
  onImageClick?: (id: number) => void
  onToggleSave?: (movie: Omit<WatchListMovie, 'addTime'>) => void
  content?: React.ReactNode
}

export const MovieCard = ({
  movie,
  isSaved,
  onCardClick,
  onImageClick,
  onToggleSave,
  content,
}: MovieCardProps) => {
  const { id, title, posterUrl } = movie

  return (
    <Card
      className={cn('relative py-0 gap-1', onCardClick && 'cursor-pointer')}
      onClick={() => onCardClick?.(id)}
    >
      <div
        className={cn(
          'relative group aspect-[2/3] w-full overflow-hidden cursor-pointer',
          onImageClick && 'cursor-pointer'
        )}
        onClick={() => onImageClick?.(id)}
      >
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover rounded-t"
          onError={(e) => {
            if (!e.currentTarget.src.includes(fallbackPoster)) {
              e.currentTarget.src = fallbackPoster
            }
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* WatchList Toggle Button */}
      {onToggleSave && (
        <WishListToggle
          id={id}
          isSaved={isSaved ?? false}
          posterUrl={posterUrl}
          title={title}
          onToggleSave={onToggleSave}
          className="absolute top-2 right-2 z-10"
        />
      )}
      <CardContent className="flex flex-col gap-2 p-2">{content}</CardContent>
    </Card>
  )
}
