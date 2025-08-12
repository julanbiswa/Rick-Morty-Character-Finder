import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/RickAndMortay";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useFavorites } from "../hooks/useFavorites";
import { useSearchParams } from "react-router-dom";

export default function CharacterList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFavorites, setShowFavorites] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";

  const { favorites, toggleFavorite } = useFavorites();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["characters", page, search, status],
    queryFn: () => fetchCharacters(page, search, status),
    keepPreviousData: true
  });

  const updateParams = (newParams: Record<string, string>) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) updated.set(key, value);
      else updated.delete(key);
    });
    setSearchParams(updated);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 text-gray-800 pt-20">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 bg-white text-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-20">
        <p className="text-red-600 mb-4 font-medium text-lg">Error loading data. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const charactersToDisplay = showFavorites
    ? data?.results?.filter((char: any) => favorites.includes(char.id))
    : data?.results;

  return (
    <div className="p-6 max-w-8xl mx-auto min-h-screen bg-gray-200 text-gray-800 pt-25">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Rick & Morty Character Explorer
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        <div className="flex-1">
          <SearchBar onSearch={(val) => updateParams({ q: val, page: "1" })} initialValue={search} />
        </div>
        <div className="relative w-full md:w-auto">
          <select
            value={status}
            onChange={e => updateParams({ status: e.target.value, page: "1" })}
            className="w-full px-4 py-2 pr-10 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-inner appearance-none
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       transition-all duration-200 ease-in-out"
          >
            <option value="">All Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="px-6 py-3 rounded-md font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 transition"
          >
            {showFavorites ? "Hide Favorites" : `Show Favorites (${favorites.length})`}
          </button>
        </div>
      )}

      {showFavorites && favorites.length > 0 && (
        <div className="mb-10 bg-white border border-gray-300 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b border-gray-200 pb-2">Your Favorites</h2>
          <div className="flex overflow-x-auto gap-5 pb-2">
            {data?.results
              ?.filter((char: any) => favorites.includes(char.id))
              .map((char: any) => (
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

      {!charactersToDisplay?.length ? (
        <div className="py-10 text-center text-gray-500 text-lg">No characters found matching your criteria.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {charactersToDisplay.map((char: any) => (
              <CharacterCard
                key={char.id}
                character={char}
                isFavorite={favorites.includes(char.id)}
                onToggleFavorite={() => toggleFavorite(char.id)}
              />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={data.info.pages}
            onPageChange={(p) => updateParams({ page: String(p) })}
          />
        </>
      )}
    </div>
  );
}