
import { apiClient } from '@/api/apiClient';
import { TMDB_ENDPOINTS } from '@/constants/tmdb';

const language = 'en-US';

export const searchMovies = async (data: { query: string; page: number; }) => {
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
  const res = await apiClient.get(TMDB_ENDPOINTS.MOVIE_DETAIL(id), {
    params: {
      language
    },
  });
  return res.data;
}
