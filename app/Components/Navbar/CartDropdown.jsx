'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const CartDropdown = ({ isOpen, onClose }) => {
  const cart = useSelector((state) => state.authUser.cart);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div 
            className=" bg-black bg-opacity-50 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed right-4 top-0 h-[calc(100vh-88px)] w-[350px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] z-[61] mt-[88px] rounded-l-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <ShoppingBag className="h-6 w-6 text-orange-500" />
                  Your Cart ({cart.length})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-orange-50 rounded-full transition-all duration-300 hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div 
              className="overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-gray-50 h-[calc(100vh-350px)]"
              style={{
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-track': { background: '#f7f7f7' },
                '&::-webkit-scrollbar-thumb': { background: '#fed7aa', borderRadius: '20px' }
              }}
            >
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <Link href="/Shop">
                    <Button 
                      variant="ghost" 
                      className="mt-4 text-orange-500 hover:text-orange-600"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 p-6">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-4 hover:bg-orange-50/50 rounded-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50 group"
                    >
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate group-hover:text-orange-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-orange-500 font-semibold text-sm mt-2 flex items-center gap-1">
                          ${item.price.toFixed(2)} 
                          <span className="text-gray-400">×</span> 
                          {item.quantity || 1}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Subtotal: ${((item.quantity || 1) * item.price).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-6 space-y-4 backdrop-blur-lg bg-white/80">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-xl font-semibold text-orange-500">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-3">
                  <Link href="/Cart" className="block">
                    <Button 
                      onClick={onClose}
                      variant="outline"
                      className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-medium h-12 text-lg transition-all duration-300"
                    >
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/Check-out" className="block">
                    <Button 
                      onClick={onClose}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium h-12 text-lg shadow-lg shadow-orange-200/50 transition-all duration-300"
                    >
                      Checkout <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-center text-gray-500 mt-2 font-medium">
                  Free shipping on orders over $100
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDropdown;
