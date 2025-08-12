// import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
// Inline SVG for Chevron Left and Right icons
const MdOutlineChevronLeft = () => (
  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);
const MdOutlineChevronRight = () => (
  <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const baseButtonClasses = "px-4 py-2 border rounded-md text-sm font-medium transition-colors duration-200 flex items-center";
  const enabledButtonClasses = "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700";
  const disabledButtonClasses = "border-gray-800 bg-gray-900 text-gray-500 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={`${baseButtonClasses} ${page <= 1 ? disabledButtonClasses : enabledButtonClasses}`}
      >
        <MdOutlineChevronLeft />
        {/* The 'Previous' text is only visible on screens wider than small */}
        <span className="hidden sm:inline">Previous</span>
      </button>
      <span className="px-4 py-2 text-sm font-semibold text-gray-300">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`${baseButtonClasses} ${page >= totalPages ? disabledButtonClasses : enabledButtonClasses}`}
      >
        {/* The 'Next' text is only visible on screens wider than small */}
        <span className="hidden sm:inline">Next</span>
        <MdOutlineChevronRight />
      </button>
    </div>
  );
}
