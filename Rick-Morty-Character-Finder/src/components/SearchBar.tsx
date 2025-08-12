import { useState, useEffect, useRef } from "react";

interface Props {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = "" }: Props) {
  const [query, setQuery] = useState(initialValue);
  
  // Use useRef to hold the timeout ID, initializing it to null
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    // Clear any existing timeout before setting a new one
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Set a new timeout and save its ID to the ref
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 400);

    debounceRef.current = timeoutId;

    // The cleanup function now correctly clears the timeout
    return () => clearTimeout(debounceRef.current as number);
  }, [query, onSearch]); // The fix: added `onSearch` to the dependency array

  return (
    <input
      type="text"
      placeholder="Search characters..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-inner 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                 placeholder-gray-400 transition-all duration-200 ease-in-out"
    />
  );
}
