import fallbackPoster from '@/assets/images/fallback-poster.png'
interface Genre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface BelongsToCollection {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
}

export interface MovieDetailRaw {
  adult: boolean
  backdrop_path: string | null
  belongs_to_collection: BelongsToCollection | null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetailPreview = Pick<
  MovieDetailRaw,
  'title' | 'tagline' | 'overview' | 'genres' | 'runtime' | 'homepage' | 'vote_count'
> & {
  posterUrl: string
  backdropPath?: string | null
  voteAverage: number
  releaseDate: string
  productionCompanies: ProductionCompany[]
}

export const toMovieDetail = (raw: MovieDetailRaw): MovieDetailPreview => ({
  title: raw.title,
  tagline: raw.tagline,
  overview: raw.overview,
  backdropPath: raw.backdrop_path,
  posterUrl: raw.poster_path ? `https://image.tmdb.org/t/p/w500${raw.poster_path}` : fallbackPoster,
  genres: raw.genres,
  voteAverage: raw.vote_average,
  releaseDate: raw.release_date,
  runtime: raw.runtime,
  productionCompanies: raw.production_companies,
  homepage: raw.homepage,
  vote_count: raw.vote_count,
})
