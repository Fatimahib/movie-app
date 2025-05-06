

// import { useEffect } from "react";
// import { useMovies } from "../context/MovieContext";
// import MovieCard from "../components/MovieCard";

// import Navbar from "../components/Navbar";
// import { useState } from "react";

// const Home = () => {
//   const { movies, loading, error } = useMovies();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() === "") {
//       setFilteredMovies(movies);
//       setHasSearched(false);
//     } else {
//       const filtered = movies.filter(movie => 
//         movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredMovies(filtered);
//       setHasSearched(true);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setFilteredMovies(movies);
//     setHasSearched(false);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-gray-dark-second text-gray-900 dark:text-white flex items-center justify-center">
//         <div className="animate-pulse text-2xl">Loading movies...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-gray-dark-second text-gray-900 dark:text-white flex items-center justify-center">
//         <div className="text-2xl text-red-main">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-dark-second pb-20 transition-colors duration-200">
//       <Navbar />
//       <div className="container mx-auto px-4 pt-24">
    
//         <form onSubmit={handleSearch} className="flex justify-center p-2 my-5">
//           <input 
//             type="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-80 h-11 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//             placeholder="Search movies..."
//           />
//           <button 
//             type="submit"
//             className="border-2 border-red-500 text-red-500 rounded-lg text-sm font-medium px-5 py-2.5 mb-2 mr-2 hover:bg-red-500 hover:text-white transition-colors duration-200 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-white"
//           >
//             Search
//           </button>
//           {hasSearched && (
//             <button
//               type="button"
//               onClick={handleClearSearch}
//               className="border-2 border-gray-500 text-gray-500 rounded-lg text-sm font-medium px-5 py-2.5 mb-2 hover:bg-gray-500 hover:text-white transition-colors duration-200 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-white"
//             >
//               Clear
//             </button>
//           )}
//         </form>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {(hasSearched ? filteredMovies : movies).map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const {
    movies,
    loading,
    error,
    searchMovies,       // new function for API-based search
    searchResults,      // search result from API
    isSearching,        // flag for tracking search state
    resetSearch         // reset to default movies
  } = useMovies();

  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    if (searchQuery.trim() === "") {
      resetSearch(); // show default
    } else {
      await searchMovies(searchQuery); // fetch from API
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    resetSearch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-dark-second text-gray-900 dark:text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-dark-second text-gray-900 dark:text-white flex items-center justify-center">
        <div className="text-2xl text-red-main">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-dark-second pb-20 transition-colors duration-200">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <form onSubmit={handleSearch} className="flex justify-center p-2 my-5">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!currentUser}
            className="w-80 h-11 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder={currentUser ? "Search movies..." : "Please log in to search"}
          />
          <button
            type="submit"
            disabled={!currentUser}
            className="border-2 border-red-500 text-red-500 rounded-lg text-sm font-medium px-5 py-2.5 mb-2 mr-2 hover:bg-red-500 hover:text-white transition-colors duration-200 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-white disabled:opacity-50"
          >
            Search
          </button>
          {(isSearching || searchQuery) && currentUser && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="border-2 border-gray-500 text-gray-500 rounded-lg text-sm font-medium px-5 py-2.5 mb-2 hover:bg-gray-500 hover:text-white transition-colors duration-200 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(isSearching ? searchResults : movies).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {isSearching && searchResults.length === 0 && !loading && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            No movies found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

