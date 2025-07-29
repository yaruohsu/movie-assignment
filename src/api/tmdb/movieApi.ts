import { apiClient } from '@/api/apiClient'
import { TMDB_ENDPOINTS } from '@/constants/tmdb'
import mockSearchResult from '@/api/__mocks__/search.json'
import mockMovieDetail from '@/api/__mocks__/detail.json'
import { toMovieDetail, type MovieDetail } from './movieDetail.dto'
import { toMovieList, type Movie } from './movieList.dto'

const language = 'en-US'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

interface MoviesList {
  movies: Movie[]
  hasMore: boolean
}

export const searchMovies = async (query: string, pageParam: number): Promise<MoviesList> => {
  if (USE_MOCK) {
    return {
      movies: toMovieList(mockSearchResult.results),
      hasMore: mockSearchResult.page < mockSearchResult.total_pages,
    }
  }

  if (!query) {
    return { movies: [], hasMore: false }
  }

  const res = await apiClient.get(TMDB_ENDPOINTS.SEARCH_MOVIE, {
    params: {
      include_adult: false,
      language,
      query,
      page: pageParam || 1,
    },
  })

  return {
    movies: toMovieList(res.data.results),
    hasMore: res.data.page < res.data.total_pages,
  }
}

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  if (USE_MOCK) {
    return toMovieDetail(mockMovieDetail)
  }
  if (!id) {
    throw new Error('Movie ID is required')
  }

  const res = await apiClient.get(TMDB_ENDPOINTS.MOVIE_DETAIL(id), {
    params: {
      language,
    },
  })

  return toMovieDetail(res.data)
}
