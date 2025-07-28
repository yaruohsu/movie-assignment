
import { apiClient } from '@/api/apiClient';
import { TMDB_ENDPOINTS } from '@/constants/tmdb';
import mockSearchResult from '@/api/__mocks__/search.json';
import mockMovieDetail from '@/api/__mocks__/detail.json';
import { toMovieDetail } from './movieDetail.dto';
import { toMovieList } from './movieList.dto';

const language = 'en-US';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';


export const searchMovies = async (data: { query: string; page: number; }) => {
  if (USE_MOCK) {
    return toMovieList(mockSearchResult.results);
  }

  const { query, page } = data
  const res = await apiClient.get(TMDB_ENDPOINTS.SEARCH_MOVIE, {
    params: {
      'include_adult': false,
      language,
      query,
      page: page || 1,

    },
  });

  return toMovieList(res.data.results);
};

export const getMovieDetail = async (id: number) => {
  if (USE_MOCK) {
    return toMovieDetail(mockMovieDetail);
  }

  const res = await apiClient.get(TMDB_ENDPOINTS.MOVIE_DETAIL(id), {
    params: {
      language
    },
  });

  return toMovieDetail(res.data);
}
