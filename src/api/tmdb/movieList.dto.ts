import fallbackPoster from '@/assets/images/fallback-poster.png'
export interface MovieRaw {
  adult: boolean
  backdrop_path: string | null
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Movie {
  id: number
  title: string
  posterUrl: string
}

export const toMovieList = (data: MovieRaw[]): Movie[] => {
  return data.map((item: MovieRaw) => {
    const isFullUrl = item.poster_path?.startsWith('http');
    return {
      id: item.id,
      title: item.title,
      posterUrl: item.poster_path
        ? isFullUrl
          ? item.poster_path
          : `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : fallbackPoster,
    };
  });
};

