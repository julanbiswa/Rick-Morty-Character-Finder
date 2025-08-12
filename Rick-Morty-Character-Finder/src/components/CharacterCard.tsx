import { Link } from "react-router-dom";

// Define a proper interface for the character object
interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  gender: string;
  type: string;
}

interface Props {
  character: Character; // Now using the explicit Character type
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={onToggleFavorite}
            className="p-2 bg-gray-200 bg-opacity-70 rounded-full text-gray-800 hover:bg-opacity-100 transition-colors duration-200"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-200 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-600'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{character.name}</h2>
          <p className="mt-1 text-sm text-gray-600">{character.status} - {character.species}</p>
        </div>
        <div className="mt-4">
          <Link
            to={`/character/${character.id}`}
            className="block w-full text-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
