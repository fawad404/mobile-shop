'use client'
import { React, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/app/Components/ui/input'
import { X, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/app/authUserSlice'

const Login = ({ show, setShow }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const modalRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShow(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setShow])

  const handleJoinNow = () => {
    setShow(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    setLoading(true); // Set loading to true

    try {
      const response = await fetch('https://phone-cloud-plus-backend.vercel.app/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const user = await response.json();
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Dispatch and store in localStorage (now handled by the reducer)
      dispatch(setAuthUser({ user, cart: storedCart }));
      
      toast.success('Login successful!');
      setShow(false);
    } catch (error) {
      console.error('There was a problem with the login request:', error);
      toast.error('Login failed!'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50 top-0 left-0 w-screen h-screen">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden"
          >
            <div className="relative p-8">
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors duration-300"
              >
                <X size={24} />
              </button>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome Back!
                </h2>
                <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
              </div>
              
              <form className="space-y-5" onSubmit={handleLogin}>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:via-orange-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Not a member yet?{' '}
                  <Link href="/signup">
                    <span
                      onClick={() => setShow(false)}
                      className="font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent hover:from-orange-700 hover:to-pink-700 transition-colors"
                    >
                      Join now
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Login

