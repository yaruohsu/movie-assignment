
import { apiClient } from '@/api/apiClient';
import { TMDB_ENDPOINTS } from '@/constants/tmdb';
import mockSearchResult from '../__mocks__/search.json';
import mockMovieDetail from '../__mocks__/detail.json';

const language = 'en-US';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';


export const searchMovies = async (data: { query: string; page: number; }) => {
  if (USE_MOCK) {
    return mockSearchResult;
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
  return res.data;
};

export const getMovieDetail = async (id: number) => {
  if (USE_MOCK) {
    return mockMovieDetail;
  }

  const res = await apiClient.get(TMDB_ENDPOINTS.MOVIE_DETAIL(id), {
    params: {
      language
    },
  });
  return res.data;
}
