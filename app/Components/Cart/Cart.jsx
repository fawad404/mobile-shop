'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '@/app/authUserSlice';
import { useRouter } from 'next/navigation';  // Update this import

const EmptyCart = ({ darkMode }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`flex flex-col items-center justify-center p-8 ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } rounded-lg shadow-lg text-center`}
  >
    <ShoppingBag className="w-24 h-24 text-orange-500 mb-4" />
    <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
    <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
    <Link href="/Shop">
      <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 px-4 py-2
      ">
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Button>
    </Link>
  </motion.div>
);

const ProductCard = ({ item, darkMode, updateQuantity, removeItem }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`flex flex-col md:flex-row items-center justify-between p-6 mb-4 rounded-lg ${
      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-orange-50'
    } transition-all duration-200 shadow-lg`}
  >
    <div className="flex flex-col md:flex-row items-center md:space-x-6 w-full md:w-auto">
      <div className="relative group">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105" 
        />
        <div className={`absolute inset-0 rounded-lg ${
          darkMode ? 'bg-black' : 'bg-white'
        } opacity-0 group-hover:opacity-10 transition-opacity`}/>
      </div>
      
      <div className="text-center md:text-left mt-4 md:mt-0">
        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
        <p className="text-orange-500 font-medium text-lg">${item.price.toFixed(2)}</p>
        <div className="flex items-center justify-center md:justify-start space-x-3 mt-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
            className={`h-8 w-8 rounded-full ${
              darkMode ? 'hover:bg-gray-500' : 'hover:bg-orange-100'
            }`}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-semibold">{item.quantity || 1}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
            className={`h-8 w-8 rounded-full ${
              darkMode ? 'hover:bg-gray-500' : 'hover:bg-orange-100'
            }`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

    <div className="flex flex-col items-end mt-4 md:mt-0">
      <div className="flex items-center gap-3 mb-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <Link href={`/Check-out/${item.id}`}>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1"
          >
            Buy Now
          </Button>
        </Link>
      </div>
      <p className="font-medium mt-2">
        Subtotal: <span className="text-orange-500">${((item.quantity || 1) * item.price).toFixed(2)}</span>
      </p>
    </div>
  </motion.div>
);

const Cart = () => {
  const [darkMode, setDarkMode] = useState(false);
  const cart = useSelector((state) => state.authUser.cart); // Get cart from Redux store
  const dispatch = useDispatch();
  const router = useRouter();  // This stays the same but uses new navigation

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Retrieved cart from localStorage:', storedCart); // Log the retrieved cart
    dispatch(updateCart(storedCart)); // Update cart in Redux store
  }, [dispatch]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    dispatch(updateCart(updatedCart));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    dispatch(updateCart(updatedCart)); // Update cart in Redux store
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage')); // Trigger the storage event
  };

  const handleCheckout = () => {
    if (!cart.length) {
      return;
    }
    router.push('/Check-out');  // This stays the same
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 mt-16">
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <EmptyCart darkMode={darkMode} />
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <ShoppingCart className="mr-2" />
                    Your Cart ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)
                  </h2>
                  <AnimatePresence>
                    {cart.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        darkMode={darkMode}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="h-px bg-gray-300 my-2"></div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-orange-500">${total.toFixed(2)}</span>
                    </div>
                    {subtotal < 100 && (
                      <p className="text-sm text-orange-500 mt-2">
                        Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                      </p>
                    )}
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-lg font-semibold">Proceed to Checkout</span>
                  </Button>

                  <div className="mt-4 p-4 bg-orange-100 rounded-lg">
                    <p className="text-sm text-orange-700 text-center">
                      Secure Checkout • Fast Shipping • Easy Returns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;

