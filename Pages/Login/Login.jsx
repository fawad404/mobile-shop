import  {React, useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../../src/Components/ui/input' // Fixed import path for Input
import { X } from 'lucide-react'

const Login = ({ show, setShow }) => {
  const [isLogin, setIsLogin] = useState(true)
  const modalRef = useRef(null)

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

  return (
    <>
      {show && (
        <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50 top-0 left-0 w-screen h-screen">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-md bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative p-8">
              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 text-orange-600 hover:text-orange-800 transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold text-center text-orange-800 mb-6">
                {isLogin ? "Welcome Back!" : "Join Us Today"}
              </h2>
              <form className="space-y-4">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-black placeholder-orange-400"
                />
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-black placeholder-orange-400"
                />
                {!isLogin && (
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-black placeholder-orange-400"
                  />
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md"
                >
                  {isLogin ? "Sign In" : "Sign Up"}
                </button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-orange-700">
                  {isLogin ? "Not a member yet?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 font-semibold text-orange-600 hover:text-orange-800 transition-colors"
                  >
                    {isLogin ? "Join now" : "Sign in"}
                  </button>
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

