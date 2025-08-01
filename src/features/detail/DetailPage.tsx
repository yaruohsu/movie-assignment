import { type FC } from 'react';
import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { LogoImage } from '@/components/LogoImage';
import { useWatchListStore } from '@/stores/useWatchListStore';
import { WishListToggle } from '@/components/WishListToggle';


const MovieDetailPage: FC = () => {
  const { id: idParam } = useParams()
  const id = Number(idParam)
  const { data, isLoading, isError, isInvalidId, isNotFound } = useMovieDetail(id)

  const {
    toggleWatchList,
    isInWatchList,
  } = useWatchListStore()

  if (isInvalidId) {
    return <div>Invalid movie ID</div>
  }
  if (isNotFound) {
    return <div>Movie not found</div>
  }
  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Failed to load movie details</div>

  const {
    title,
    tagline,
    overview,
    backdropPath,
    posterUrl,
    genres,
    voteAverage,
    releaseDate,
    runtime,
    productionCompanies,
    homepage,
  } = data;

  const inWatchList = isInWatchList(id)

  const handleToggle = () =>
    toggleWatchList({
      id,
      title: data.title,
      posterUrl,
    })

  return (
    <div className="text-foreground">
      {/* Banner */}
      {backdropPath && (
        <div
          className="w-full h-64 hidden md:block md:h-96 bg-top bg-cover"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${backdropPath})` }}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={posterUrl}
            alt={title}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="md:col-span-2 flex flex-col min-h-full space-y-4">
          {/* Title + Watch list */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
              <p className="text-muted-foreground italic">{tagline}</p>
            </div>
            <WishListToggle
              id={id}
              isSaved={inWatchList}
              posterUrl={posterUrl}
              title={title}
              onToggleSave={handleToggle}
            />
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 justify-center md:justify-start text-yellow-400">
            <Star className="w-5 h-5 fill-yellow-400" />
            <span className="text-lg font-semibold">{voteAverage}/10</span>
            <span className="text-sm text-muted-foreground">({data.vote_count} votes)</span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>{releaseDate}</span>
            <span>{runtime} min</span>
            <span>{genres.map((g) => g.name).join(', ')}</span>
          </div>

          <p className="text-base leading-relaxed">{overview}</p>

          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-primary hover:underline"
            >
              Visit Official Site →
            </a>
          )}

          {/* Production Companies */}
          {productionCompanies.length > 0 && (<div className="mt-auto pt-4">
            <h2 className="font-semibold">Production Companies</h2>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              {productionCompanies.map((company) => (
                <div key={company.id} className="flex items-center gap-2">
                  {company.logo_path ? (
                    <LogoImage
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                    />
                  ) : (
                    <span className="text-sm">{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;