import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../api/RickAndMortay";
import { useFavorites } from "../hooks/useFavorites";

export default function CharacterDetail() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id!),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white text-gray-800 dark:bg-gray-700 dark:text-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-indigo-600 font-bold animate-pulse">Loading character details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 bg-white text-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10">
        <p className="text-red-600 mb-4 font-semibold text-lg">Error loading character details. It may not exist.</p>
        <Link
          to="/"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-bold transition"
        >
          Go Back to Home
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(data.id);
  const favoriteButtonClasses = isFav
    ? "bg-red-600 text-white hover:bg-red-700"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <div className="p-5 max-w-xl mx-auto my-25 bg-white rounded-2xl shadow-xl border border-gray-200 mt-40 dark:bg-gray-700 dark:text-white">
      <Link
        to="/"
        className="text-indigo-600 hover:text-indigo-800 dark:hover:text-white font-semibold flex items-center gap-1 mb-6 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to all characters
      </Link>
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-56 h-56 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
          />
        </div>
        <h2 className="text-4xl font-extrabold text-center mt-6 text-gray-800 dark:text-white">{data.name}</h2>
        <p className="text-center text-gray-600 text-lg font-medium mt-2 dark:text-white">{data.status} - {data.species}</p>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm dark:bg-gray-500">
                <p className="text-sm font-semibold text-gray-500 dark:text-white">Origin</p>
                <p className="text-lg font-medium text-gray-800 mt-1 dark:text-white">{data.origin.name}</p>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm dark:bg-gray-500">
                <p className="text-sm font-semibold text-gray-500 dark:text-white">Location</p>
                <p className="text-lg font-medium text-gray-800 mt-1 dark:text-white">{data.location.name}</p>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm dark:bg-gray-500">
                <p className="text-sm font-semibold text-gray-500 dark:text-white">Gender</p>
                <p className="text-lg font-medium text-gray-800 mt-1 dark:text-white">{data.gender}</p>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm dark:bg-gray-500">
                <p className="text-sm font-semibold text-gray-500 dark:text-white">Type</p>
                <p className="text-lg font-medium text-gray-800 mt-1 dark:text-white">{data.type || "Unknown"}</p>
            </div>
        </div>

        <button
          onClick={() => toggleFavorite(data.id)}
          className={`px-6 py-3 rounded-md mt-8 font-semibold shadow-md transition-colors duration-300 ${favoriteButtonClasses}`}
        >
          {isFav ? "Unfavorite" : "Favorite"}
        </button>
      </div>
    </div>
  );
}