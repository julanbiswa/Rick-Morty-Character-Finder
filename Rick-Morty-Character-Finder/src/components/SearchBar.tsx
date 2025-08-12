import { useState, useEffect, useRef } from "react";

interface Props {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: Props) {
  const [query, setQuery] = useState(initialValue);
  const debounceRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      // The input will be full width on all screens and have appropriate padding and border
      className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-400 transition-all duration-200 ease-in-out"
    />
  );
}
