import { Bookmark } from 'lucide-react'
import type { FC } from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

export const WishListToggle: FC<{
  id: number
  isSaved: boolean
  posterUrl: string
  title: string
  onToggleSave: (movie: { id: number; title: string; posterUrl: string }) => void
  className?: string
}> = ({ id, isSaved, posterUrl, title, onToggleSave, className }) => (
  <Button
    className={cn(
      'bg-background/0 hover:bg-background/80 backdrop-blur-sm rounded-full p-1 transition cursor-pointer',
      className
    )}
    onClick={(e) => {
      e.stopPropagation()
      onToggleSave({ id, title, posterUrl })
    }}
  >
    <Bookmark
      className={cn(
        'w-6 h-6 transition-all duration-300',
        isSaved ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-muted-foreground'
      )}
      strokeWidth={2}
    />
  </Button>
)
