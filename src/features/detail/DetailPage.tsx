import { type FC } from 'react';
import { Star } from 'lucide-react';
import fallbackPoster from '@/assets/images/fallback-poster.png'
import data from '@/api/__mocks__/detail.json';


const MovieDetailPage: FC = () => {

  // TBD:
  // 1. get id from URL params
  // 2. const { data, isLoading, error } = useGetMovieDetailQuery(id);
  // 

  const {
    title,
    tagline,
    overview,
    backdrop_path,
    poster_path,
    genres,
    vote_average,
    release_date,
    runtime,
    production_companies,
    homepage,
  } = data;

  return (
    <div className="text-foreground">
      {/* Banner */}
      {backdrop_path && (
        <div
          className="w-full h-64 md:h-96 bg-cover bg-center"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})` }}
        />
      )}


      <div className="max-w-5xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="w-full rounded-xl shadow-lg"
            onError={(e) => {
              if (!e.currentTarget.src.includes(fallbackPoster)) {
                e.currentTarget.src = fallbackPoster
              }
            }}
          />
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            <p className="text-muted-foreground italic">{tagline}</p>
          </div>

          <div className="flex items-center gap-2 justify-center md:justify-start text-yellow-400">
            <Star className="w-5 h-5 fill-yellow-400" />
            <span className="text-lg font-semibold">{vote_average}/10</span>
            <span className="text-sm text-muted-foreground">({data.vote_count} votes)</span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>{release_date}</span>
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

          <div>
            <h2 className="font-semibold mt-6">Production Companies</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              {production_companies.map((company) => (
                <div key={company.id} className="flex items-center gap-2">
                  {company.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      className="h-6 object-contain"
                    />
                  )}
                  <span className="text-sm">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;