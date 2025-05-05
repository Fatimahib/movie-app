

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import Navbar from "../components/Navbar";
import VideoSection from "../components/VideoSection";

const MovieDetail = () => {
  const { id } = useParams();
  const { selectedMovie, getMovieDetails, loading, error } = useMovies();

  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  useEffect(() => {
    getMovieDetails(id);
  }, [id, getMovieDetails]);

  if (loading || !selectedMovie) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-2xl">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-2xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = selectedMovie;

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="md:container px-10 mx-auto py-5">
      <h1 className="text-center text-3xl mb-4 text-black dark:text-white">{title}</h1>
        {/* <VideoSection movieId={id} /> */}


        <div className="flex justify-center px-10">
        <div className="w-2/3 mb-6">
            <VideoSection movieId={id} />
          </div>
          </div>

        <div className="flex justify-center px-10 mt-6">
  <div className="flex flex-col lg:flex-row w-2/3 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-700">
    <img
      className="lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
      src={poster_path ? baseImageUrl + poster_path : defaultImage}
      alt="poster"
    />
    <div className="p-6 flex flex-col justify-between">
      <div>
        <h5 className="text-xl font-medium mb-2 text-black dark:text-white">Overview</h5>
        <p className="text-base mb-4 text-black dark:text-white">{overview}</p>
      </div>
      <ul className="rounded-lg border border-gray-400 text-black dark:text-white">
        <li className="px-6 py-2 border-b border-gray-400">
          Release Date: {release_date}
        </li>
        <li className="px-6 py-2 border-b border-gray-400">
          Rate: {vote_average?.toFixed(1)}
        </li>
        <li className="px-6 py-2 border-b border-gray-400">
          Total Vote: {vote_count}
        </li>
        <li className="px-6 py-2">
          <Link
            to={-1}
            className="text-blue-600 hover:text-blue-700 transition"
          >
            Go Back
          </Link>
        </li>
      </ul>
    </div>
  </div>
        </div>


      </div>
    </div>
  );
};

export default MovieDetail;
