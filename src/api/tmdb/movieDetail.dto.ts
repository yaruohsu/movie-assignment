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
  | 'title'
  | 'tagline'
  | 'overview'
  | 'backdrop_path'
  | 'poster_path'
  | 'genres'
  | 'vote_average'
  | 'release_date'
  | 'runtime'
  | 'production_companies'
  | 'homepage'
  | 'vote_count'
>;

export const toMovieDetail = (raw: MovieDetailRaw): MovieDetailPreview => ({
  title: raw.title,
  tagline: raw.tagline,
  overview: raw.overview,
  backdrop_path: raw.backdrop_path,
  poster_path: raw.poster_path,
  genres: raw.genres,
  vote_average: raw.vote_average,
  release_date: raw.release_date,
  runtime: raw.runtime,
  production_companies: raw.production_companies,
  homepage: raw.homepage,
  vote_count: raw.vote_count,
})
