// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/RickAndMortay";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useFavorites } from "../hooks/useFavorites";
import { useSearchParams } from "react-router-dom";
import StatusDropdown from "../components/StatusDropdown";

// Define a comprehensive interface for a single character to be used across all components
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  type: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
}

// Define the type for the full API response from the character list endpoint
interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export default function CharacterList() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [showFavorites, setShowFavorites] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";

  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, isError } = useQuery<ApiResponse>({ // Use the updated ApiResponse type here
    queryKey: ["characters", page, search, status],
    queryFn: () => fetchCharacters(page, search, status),
    placeholderData: (previousData) => previousData,
  });

  const updateParams = (newParams: Record<string, string>) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) updated.set(key, value);
      else updated.delete(key);
    });
    setSearchParams(updated);
  };

  const charactersToDisplay = data?.results || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-900 text-gray-300">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-indigo-400 font-bold animate-pulse">Summoning characters...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-gray-300">
        <p className="text-red-500 mb-4 font-semibold text-lg">Failed to fetch characters from the multiverse.</p>
        <button
          onClick={() => {
            // A simple refresh of the page to re-fetch
            window.location.reload();
          }}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 text-gray-300 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-10 animate-fadeInUp">
          Rick & Morty Explorer
        </h1>

        {/* Search & Filter Controls */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4 animate-fadeInUp">
          <SearchBar
            onSearch={(value) => {
              updateParams({ q: value, page: "1" });
            }}
            initialValue={search}
          />
          <StatusDropdown
            value={status}
            onSelect={(value) => {
              updateParams({ status: value, page: "1" });
            }}
          />
        </div>

        {/* Favorites section, only displays if favorites exist */}
        {favorites.length > 0 && (
          <div className="mb-8 bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 animate-slideDown">
            <h2 className="text-2xl font-semibold text-white mb-5 border-b border-gray-700 pb-2">Your Favorites</h2>
            <div className="flex overflow-x-auto gap-5 pb-2">
              {charactersToDisplay
                .filter((char) => favorites.includes(char.id))
                .map((char) => (
                  <div key={char.id} className="flex-shrink-0 w-64">
                    <CharacterCard
                      character={char}
                      isFavorite={true}
                      onToggleFavorite={() => toggleFavorite(char.id)}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Main Character Grid */}
        {!charactersToDisplay?.length ? (
          <div className="py-10 text-center text-gray-500 text-lg">No characters found matching your criteria.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {charactersToDisplay.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char} // `char` is now correctly typed as `Character`
                  isFavorite={favorites.includes(char.id)}
                  onToggleFavorite={() => toggleFavorite(char.id)}
                />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={data!.info.pages}
              onPageChange={(newPage) => updateParams({ page: String(newPage) })}
            />
          </>
        )}
      </div>
    </div>
  );
}
