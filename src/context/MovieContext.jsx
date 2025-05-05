
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
      console.error("Movie Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMovieDetails = async (id) => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      setError(error.message);
      console.error("Movie Details Error:", error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <MovieContext.Provider 
      value={{ 
        movies, 
        loading, 
        error, 
        selectedMovie, 
        getMovieDetails 
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);