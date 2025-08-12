import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  // Function to handle the login/logout button click
  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
    // In a real application, you would add a call to your authentication API here.
    // For login: Show a login modal or navigate to a login page.
    // For logout: Clear user session/token from local storage and redirect.
    console.log(isLoggedIn ? "User logged out." : "Login button clicked.");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
          
          {/* Login/Logout Button */}
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
