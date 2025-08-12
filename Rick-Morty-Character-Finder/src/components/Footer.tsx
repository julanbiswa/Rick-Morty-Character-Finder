// import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-950 border-t border-gray-800 mt-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* On small screens (mobile), there will be 1 column. On medium screens and up, it becomes 3 columns. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">About this project</h3>
            <p className="mb-2">
              The "Rick & Morty Explorer" is a web application designed to showcase characters from the popular TV show, "Rick and Morty." It provides a clean and intuitive interface for users to browse, search, and view details about their favorite characters.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Key Features</h3>
            <ul className="space-y-1">
              <li>• Browse and search all characters</li>
              <li>• Filter characters by status (e.g., Alive, Dead)</li>
              <li>• View detailed information for each character</li>
              <li>• Mark and manage favorite characters</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies Used</h3>
            <p className="mb-2">
              This application is built with modern web technologies to ensure a fast and responsive user experience.
            </p>
            <ul className="space-y-1">
              <li>• **Frontend:** React.js for the user interface</li>
              <li>• **Styling:** Tailwind CSS for a utility-first design approach</li>
              <li>• **Data Fetching:** React Query for efficient state management and caching</li>
              <li>• **API:** Utilizes the public Rick and Morty API</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10 pt-6 border-t border-gray-800">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Rick & Morty Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
