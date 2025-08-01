import { apiClient } from '@/api/apiClient'
import { TMDB_ENDPOINTS } from '@/constants/tmdb'
import mockSearchResult from '@/api/__mocks__/search.json'
import mockMovieDetail from '@/api/__mocks__/detail.json'
import mockMovieVideos from '@/api/__mocks__/videos.json'
import {
  toMovieDetail,
  toMovieVideos,
  type MovieDetailPreview,
  type MovieVideo,
} from './movieDetail.dto'
import { toMovieList, type Movie } from './movieList.dto'
import axios from 'axios'

const language = 'en-US'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export interface SearchMoviesResult {
  movies: Movie[]
  hasMore: boolean
  currentPage?: number
}

export const searchMovies = async (
  query: string,
  pageParam: number
): Promise<SearchMoviesResult> => {
  if (USE_MOCK) {
    return {
      movies: toMovieList(mockSearchResult.results),
      hasMore: mockSearchResult.page < mockSearchResult.total_pages,
    }
  }

  try {
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
      currentPage: res.data.page,
    }
  } catch (error) {
    console.error('Error fetching search results:', error)
    throw new Error('Something went wrong while searching for movies. Please try again.')
  }
}

export const fetchMovieDetail = async (id: number): Promise<MovieDetailPreview> => {
  if (USE_MOCK) {
    return toMovieDetail(mockMovieDetail)
  }

  try {
    const res = await apiClient.get(TMDB_ENDPOINTS.MOVIE_DETAIL(id), {
      params: {
        language,
      },
    })

    return toMovieDetail(res.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('NOT_FOUND')
      }
    }
    console.error('Error fetching movie detail:', error)
    throw new Error('Something went wrong while retrieving movie details. Please try again.')
  }
}

export const fetchMovieVideos = async (id: number): Promise<MovieVideo[]> => {
  if (USE_MOCK) {
    return toMovieVideos(mockMovieVideos.results)
  }

  try {
    const res = await apiClient.get(TMDB_ENDPOINTS.MOVIE_VIDEOS(id), {
      params: {
        language,
      },
    })

    return toMovieVideos(res.data.results)
  } catch (error) {
    console.error('Error fetching movie videos:', error)
    throw new Error('Something went wrong while retrieving movie videos. Please try again.')
  }
}
