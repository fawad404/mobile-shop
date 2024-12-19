import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../Components/ui/button' // Fixed import path for Button
import { cn } from '../../../lib/utils'
import logo from '../../assets/Images/logo.png'
import Login from '../../../Pages/Login/Login' // Fixed import path for Login
const navItems = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/repair-booking", label: "Repair Booking" },
  { path: "/repair-tracker", label: "Repair Tracker" }
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation()
  const dropdownRef = useRef(null)
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Cart data for count update:', cart); // Log the cart data for count update
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('storage', updateCartCount);
    }
  }, [])

  const handleToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
    <header className={cn(
      " top-0 w-full fixed z-50 transition-all duration-300",
     "bg-white/95 backdrop-blur-md shadow-md py-4" 
    )}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14"> {/* Adjusted height */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.img
                src={logo}
                alt="Logo"
                className="h-24 w-24" // Adjusted logo size
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    isActive(item.path)
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 hover:bg-orange-500 hover:text-white"
                  )}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative" ref={dropdownRef}>
                <Link to='/'>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex items-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                  <User className="h-12 w-12 mr-2 text-gray-800" onClick={() => setLoginModal(true)}/>
                  <ChevronDown className="h-4 w-4 text-gray-800" />
                </Button>
                  </Link>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
                      <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</Link>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/check-out" className="ml-3 relative">
              <Button variant="ghost" size="icon" className="ml-3 relative">
                <ShoppingCart className="h-5 w-5 text-gray-800" />
                <span className="sr-only">Shopping cart</span>
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-orange-500 text-xs text-white">
                  {cartCount}
                </span>
              </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex lg:hidden">
            <Button variant="ghost" size="icon" onClick={handleToggle}>
              {menuOpen ? (
                <X className="h-6 w-6 text-gray-800" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-white z-40 h-screen w-[50%]"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b bg-white border-gray-200">
                <Link to="/" className="flex items-center">
                  <motion.img
                    src={logo}
                    alt="Logo"
                    className="h-16 w-16" // Adjusted logo size in mobile menu
                    animate={{ scale: isScrolled ? 0.9 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                        isActive(item.path)
                          ? "bg-orange-500 text-white"
                          : "text-gray-700 hover:bg-orange-500 hover:text-white"
                      )}
                      onClick={handleToggle}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <User className="h-10 w-10 rounded-full text-gray-800" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">User Name</div>
                      <div className="text-sm font-medium text-gray-500">user@example.com</div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <ShoppingCart className="h-6 w-6 text-gray-800" aria-hidden="true" />
                      <span className="sr-only">Shopping cart</span>
                      
                    </Button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      Settings
                    </Link>
                    <Link to="/signout" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
      <Login show={loginModal} setShow={setLoginModal} />
    </>
  )
}

export default Navbar

