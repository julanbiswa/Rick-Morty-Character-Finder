import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/useTheme";

export default function Header() {

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {Dark, toggleDark}=useTheme()

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
    console.log(isLoggedIn ? "User logged out." : "Login button clicked.");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354l-7 7m0 0l-7 7m7-7v14m7 0l-7-7m0 0l7-7m-7 7l7 7" />
          </svg>
          <span className="text-2xl font-bold text-gray-100">Rick & Morty Explorer</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">Home</Link>
          <a href="#footer" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">About</a>

          <button
            onClick={toggleDark}
            className="p-2 rounded-full text-white hover:text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {Dark? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-moon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-sun"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          <button
            onClick={handleAuthClick}
            className="px-4 py-2 bg-indigo-500 text-white rounded-full font-bold shadow-md hover:bg-indigo-600 transition-colors duration-200"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </nav>
      </div>
    </header>
  );
}
