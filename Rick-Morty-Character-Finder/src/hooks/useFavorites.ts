import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      let updated: number[];
      if (prev.includes(id)) {
        updated = prev.filter(fav => fav !== id);
      } else {
        updated = [...prev, id];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite };
}
