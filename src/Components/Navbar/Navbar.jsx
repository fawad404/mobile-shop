import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';
import logo from "../../assets/Images/logo.png";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path:"/repair-booking", label: "Repair Booking"},
  { path:"/repair-tracker", label: "Repair Tracker"}
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed w-full z-[60] transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
        : 'bg-transparent py-4'
    } top-0`}>
      <div className="max-w-screen-2xl relative w-full mx-auto flex flex-wrap items-center gap-4 px-4 sm:px-10">
        <div className="flex items-center">
          <Link to="/" className={`flex items-center hover:scale-105 ${isScrolled ? 'scale-90' : ''} transition-all duration-300`}>
            <img src={logo} alt="logo" className="w-20" />
          </Link>
        </div>

        <div id="collapseMenu" className={`${menuOpen ? "block" : "hidden"} lg:block lg:static fixed inset-0 z-[70]`}>
          <div className={`${menuOpen ? "opacity-50" : "opacity-0 pointer-events-none"} fixed inset-0 bg-black transition-opacity duration-300 lg:hidden z-[71]`} 
            onClick={handleToggle} />
          
          <button id="toggleClose" className="lg:hidden fixed top-4 right-4 z-[73] rounded-full bg-blue-600 p-3 hover:bg-blue-700 transition-colors"
            onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-white" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>
          </button>

          <ul className={`lg:flex nav-items ${
            isScrolled ? 'text-gray-800' : 'text-gray-400'
          } lg:ml-32 lg:gap-x-12 text-lg lg:items-center
            max-lg:fixed max-lg:bg-white max-lg:w-[280px] max-lg:top-0 max-lg:left-0 
            max-lg:h-screen max-lg:p-8 max-lg:shadow-2xl max-lg:z-[72] 
            max-lg:transform max-lg:transition-transform max-lg:duration-300
            ${menuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}`}>
            {navItems.map((item) => (
              <li key={item.path} className="max-lg:border-b max-lg:py-3 px-3">
                <Link 
                  to={item.path} 
                  className={`block font-medium transition-all duration-300 
                    hover:text-gray-900 hover:scale-105 hover:translate-x-1
                    ${isActive(item.path) ? "text-gray-900 scale-105" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex ml-auto items-center gap-4">
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-full transition-all duration-300 
              hover:bg-gray-100 hover:scale-105 active:scale-95">
              <User className="w-6 h-6" />
            </button>
            
            <button className="p-2.5 rounded-full relative transition-all duration-300 
              hover:bg-gray-100 hover:scale-105 active:scale-95">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs 
                font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
          </div>

          <button id="toggleOpen" 
            className={`lg:hidden hover:scale-105 transition-all duration-300 
            ${isScrolled ? 'text-gray-800' : 'text-gray-400'}`} 
            onClick={handleToggle}>
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

