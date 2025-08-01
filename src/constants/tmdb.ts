export const TMDB_ENDPOINTS = {
  SEARCH_MOVIE: '/search/movie',
  MOVIE_DETAIL: (id: number) => `/movie/${id}`,
  MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
}
