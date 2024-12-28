'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/app/Components/ui/button"
import { Input } from "@/app/Components/ui/input"
import { Label } from "@/app/Components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/Components/ui/card"
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PropTypes from 'prop-types'
import Login from '../Login/page'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Loader = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
);

const InputField = ({ label, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
 

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()} className="text-gray-700 font-medium">{label}</Label>
      <div className="relative">
        <Input
          type={type === 'password' && showPassword ? 'text' : type}
          id={label.toLowerCase()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pr-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-600 
            ${isFocused ? 'ring-2 ring-orange-500 border-transparent' : 'hover:border-gray-700'}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>
    </div>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loginModal, setLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    // Convert label to camelCase for state keys
    const fieldName = e.target.id === 'confirm password' ? 'confirmPassword' : e.target.id;
    setFormData({ ...formData, [fieldName]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirmPassword) {
      toast.error('Confirm Password is required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    const payload = { ...formData, role: 'user' };
    
    try {
      const response = await axios.post('https://phone-cloud-plus-backend.vercel.app/api/v1/auth/signup', payload);
      console.log('Form submitted:', response.data);
      toast.success('Sign-up successful');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Sign-up failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
   
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md mt-16"
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-black bg-clip-text text-transparent">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => {
                  e.target.id = 'confirmPassword';  // Force the correct ID
                  handleChange(e);
                }}
              />
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-black text-white font-medium py-4 rounded-lg
                    hover:from-orange-700 hover:to-black transition-all duration-300 group disabled:opacity-70"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRightIcon size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <button 
                onClick={() => setLoginModal(true)}
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
    <Login show={loginModal} setShow={setLoginModal} />
    </>
  )
}

