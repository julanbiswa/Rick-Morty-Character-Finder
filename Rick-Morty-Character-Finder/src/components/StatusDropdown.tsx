import React, { useState, useRef, useEffect } from 'react';
// Inline SVG for Chevron Right icon
const MdOutlineChevronRight = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

interface Props {
  value: string;
  onSelect: (value: string) => void;
}

const options = [
  { label: 'All Status', value: '' },
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

export default function StatusDropdown({ value, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(option => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (optionValue) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  return (
    // The dropdown will be full width on mobile devices and scale down on larger screens.
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption.label}</span>
        <MdOutlineChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden animate-slideDownUp" role="listbox" aria-labelledby="status-label">
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-3 cursor-pointer hover:bg-indigo-100 ${option.value === value ? 'bg-indigo-50 text-indigo-800 font-semibold' : 'text-gray-900'}`}
              onClick={() => handleSelectOption(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
