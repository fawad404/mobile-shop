import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Sun, Moon } from 'lucide-react';
import logo from "../../assets/Images/logo.png"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 top-0 h-auto ${
      scrolled ? 'bg-white shadow-lg dark:bg-gray-800' : 'bg-gray-800 dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-14 w-14" src={logo} alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Products</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-300 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white dark:text-gray-300 dark:hover:text-white">
                <span className="sr-only">View shopping cart</span>
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="p-1 rounded-full text-gray-300 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white ml-3 dark:text-gray-300 dark:hover:text-white">
                <span className="sr-only">View account</span>
                <User className="h-6 w-6" />
              </button>

            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? 'block fixed inset-0 bg-gray-800 dark:bg-gray-900' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
          <MobileNavLink to="/shop" onClick={toggleMenu}>Products</MobileNavLink>
          <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
          <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700 dark:border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src="/avatar.jpg" alt="User avatar" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-gray-300 dark:text-white">Tom Cook</div>
              <div className="text-sm font-medium leading-none text-gray-400 dark:text-gray-400">tom@example.com</div>
            </div>
          </div>
         
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 relative"
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 dark:bg-white transform scale-x-0 transition-transform duration-200 origin-left hover:scale-x-100"></span>
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 relative"
    onClick={onClick}
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gray-900 dark:bg-white transform scale-x-0 transition-transform duration-200 origin-left hover:scale-x-100"></span>
  </Link>
);

export default Navbar;

