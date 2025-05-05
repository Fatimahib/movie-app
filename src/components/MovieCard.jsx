
// import { Link } from "react-router-dom";

// const MovieCard = ({ movie }) => {
//   // Determine rating color based on vote average
//   const getRatingColor = (rating) => {
//     if (rating >= 8) return '#1b5e20'; // Green for 8-10
//     if (rating >= 6) return '#f57f17'; // Orange for 6-7.9
//     return '#7f0000'; // Red for 0-5.9
//   };

//   const ratingColor = getRatingColor(movie.vote_average);

//   return (
//     <div className="group relative h-[510px] w-[300px] overflow-hidden rounded-lg bg-[#080F36] shadow-lg font-['Poppins']">
//       {/* Movie Poster with Link */}
//       <Link to={`/movie/${movie.id}`} className="block h-full flex flex-col">
//         {/* Image taking 80% height */}
//         <div className="h-[80%] overflow-hidden">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         </div>

//         <div className="h-[20%] bg-[#080F36] p-3 flex justify-between items-center">
//           <h3 className="text-white font-medium text-lg truncate max-w-[70%]">
//             {movie.title}
//           </h3>
//           <div 
//             className="w-10 h-10 flex items-center justify-center rounded text-white font-bold"
//             style={{ backgroundColor: ratingColor }}
//           >
//             {movie.vote_average.toFixed(1)}
//           </div>

//           <div className="absolute bottom-[0%] left-0 right-0 transform translate-x-full transition-all duration-500 group-hover:translate-x-0 bg-white/80 px-4 py-2 transition-transform ease-in-out">
//           <h4 className="text-center font-semibold text-lg text-black mb-1">Overview</h4>
//           <p className="text-sm text-black">{movie.overview}</p>
//         </div>
//         </div>

  
//       </Link>
//     </div>
//   );
// };

// export default MovieCard;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#1b5e20';
    if (rating >= 6) return '#f57f17';
    return '#7f0000';
  };

  const ratingColor = getRatingColor(movie.vote_average);

  return (
    <div 
      className="group relative h-[510px] w-[300px] overflow-hidden rounded-lg bg-[#080F36] shadow-lg font-['Poppins'] cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="h-full flex flex-col">
        <div className="h-[80%] overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="h-[20%] bg-[#080F36] p-3 flex justify-between items-center">
          <h3 className="text-white font-medium text-lg truncate max-w-[70%]">
            {movie.title}
          </h3>
          {currentUser && (
            <div 
              className="w-10 h-10 flex items-center justify-center rounded text-white font-bold"
              style={{ backgroundColor: ratingColor }}
            >
              {movie.vote_average.toFixed(1)}
            </div>
          )}
        </div>

        <div className="absolute bottom-[0%] left-0 right-0 transform translate-x-full transition-all duration-500 group-hover:translate-x-0 bg-white/80 px-4 py-2 transition-transform ease-in-out">
          <h4 className="text-center font-semibold text-lg text-black mb-1">Overview</h4>
          <p className="text-sm text-black">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;