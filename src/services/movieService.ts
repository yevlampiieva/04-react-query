import axios from "axios";
import { Movie } from "../types/movie";

interface fetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<fetchMoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
};
