import { Link } from "react-router-dom";

interface Props {
  character: any;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function CharacterCard({ character, isFavorite, onToggleFavorite }: Props) {
  return (
    // The w-full class is added here to ensure the card container takes up the full width of its parent element.
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
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
      <div className="p-4 flex-grow flex flex-col items-center justify-between text-center">
        <div>
          <h2 className="font-bold text-lg text-gray-900 mb-1">{character.name}</h2>
          <p className="text-sm text-gray-600">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
              character.status === 'Alive' ? 'bg-green-500' :
              character.status === 'Dead' ? 'bg-red-500' :
              'bg-gray-500'
            }`}></span>
            {character.status} - {character.species}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            to={`/character/${character.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md"
          >
            Details
          </Link>
          <button
            onClick={onToggleFavorite}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 shadow-md ${
              isFavorite
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}
