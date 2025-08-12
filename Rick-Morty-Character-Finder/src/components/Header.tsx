import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close menu on scroll down
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center space-x-2">
          <img src="https://placehold.co/40x40/3f4058/ffffff?text=RM" alt="Logo" className="rounded-full" />
          <span className="text-xl sm:text-2xl font-bold text-white">Rick & Morty Explorer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-indigo-400 transition">Home</Link>
          <a href="#footer" className="text-gray-300 hover:text-indigo-400 transition">About</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md p-2 transition-colors duration-200"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu Panel */}
      <div className={`lg:hidden bg-gray-900 transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-40 py-2' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-4 px-2 pt-2 pb-3">
          <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 block w-full text-center py-2" onClick={toggleMobileMenu}>Home</Link>
          <a href="#footer" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 block w-full text-center py-2" onClick={toggleMobileMenu}>About</a>
        </div>
      </div>
    </header>
  );
}
