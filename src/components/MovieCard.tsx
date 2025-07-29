import fallbackPoster from '@/assets/images/fallback-poster.png';

type MovieCardProps = {
  id: number;
  title: string;
  posterUrl: string;
};

export const MovieCard = ({ id, title, posterUrl }: MovieCardProps) => (
  <div
    role="button"
    tabIndex={0}
    onClick={() => console.log(`Movie ID: ${id}`)}
    className="flex flex-col gap-3 group cursor-pointer"
  >
    <div className="relative aspect-[2/3] w-full overflow-hidden">
      <img
        alt={title}
        className="h-full w-full rounded-lg object-cover"
        src={posterUrl ? posterUrl : fallbackPoster}
        onError={(e) => {
          if (!e.currentTarget.src.includes(fallbackPoster)) {
            e.currentTarget.src = fallbackPoster;
          }
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
    </div>
    <h2 className="text-base md:text-lg lg:text-xl text-foreground line-clamp-2 text-center">{title}</h2>
  </div>
);
