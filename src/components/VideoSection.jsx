import { useEffect, useState } from "react";

const VideoSection = ({ movieId }) => {
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [movieId]);

  return (
    <div className="w-full h-96 bg-black rounded-lg overflow-hidden my-8">
      {videoKey ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          Trailer not available
        </div>
      )}
    </div>
  );
};

export default VideoSection;
