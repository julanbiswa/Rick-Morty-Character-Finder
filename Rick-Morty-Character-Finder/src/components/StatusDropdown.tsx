import { useState, useRef, useEffect } from 'react';

// Inline SVG for Chevron Right icon
const MdOutlineChevronRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

interface StatusDropdownProps {
  onSelectStatus: (status: string | null) => void;
  selectedStatus: string | null;
}

const statusOptions = ['Alive', 'Dead', 'unknown'];

const StatusDropdown = ({ onSelectStatus, selectedStatus }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (status: string) => {
    onSelectStatus(status);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-20" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
          onClick={toggleDropdown}
        >
          {selectedStatus || 'Filter by Status'}
          <MdOutlineChevronRight
            className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 dark:bg-gray-800">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {statusOptions.map((status) => (
              <a
                key={status}
                onClick={() => handleSelect(status)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
                role="menuitem"
              >
                {status}
              </a>
            ))}
            <a
              onClick={() => handleSelect("")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
              role="menuitem"
            >
              All
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;