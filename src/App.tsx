import { useEffect } from 'react'
import './App.css'
import { getMovieDetail, searchMovies } from '@/api/tmdb/movieApi';



function App() {
  useEffect(() => {

    (async () => {
      const result = await searchMovies({ query: 'iron man', page: 1 });
      console.log(result);
    })();

    (async () => {
      const result = await getMovieDetail(1726);
      console.log(result);
    })();
  }, []);



  return (
    <h1>Movies To Watch</h1>
  )
}

export default App
