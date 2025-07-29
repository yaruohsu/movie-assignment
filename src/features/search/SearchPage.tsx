import { searchMovies } from "@/api/tmdb/movieApi";
import type { Movie } from "@/api/tmdb/movieList.dto";
import { MovieList } from "@/components/MovieList";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";

const Search = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {

    (async () => {
      const res = await searchMovies('Oppenheimer', 1);
      setMovies(res.movies);
    }
    )();

  }, [])
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Movie to Watch</h1>
        <div className="flex w-full max-w-sm gap-2">
          <Input type="text" placeholder="Search for a movie... " />
          <Button type="submit" variant="outline" onClick={() => alert('Search functionality not implemented yet')}>
            Search
          </Button>
        </div>

      </div>

      <MovieList movies={movies} />
    </div>
  );
}

export default Search;