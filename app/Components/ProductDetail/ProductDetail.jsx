'use client'
import React, { useState } from 'react';
import { Star, ArrowLeft, ShoppingCart, Heart, Check, Package, ShieldCheck, ArrowRight, 
         BadgeCheck, Clock, Truck, X, ShoppingBag } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {motion} from 'framer-motion'

const calculateRatingPercentages = (rate, count) => {
  // Simulate distribution based on the average rating
  const distribution = {
    5: Math.round((rate/5) * 50),
    4: Math.round((rate/5) * 30),
    3: Math.round((rate/5) * 15),
    2: Math.round((rate/5) * 3),
    1: Math.round((rate/5) * 2),
  };
  return Object.entries(distribution).reverse().map(([stars, percentage]) => ({
    stars,
    percentage: Math.min(100, Math.max(0, percentage)) // Ensure between 0-100
  }));
};

const ProductDetail = ({id, product}) => {
  const [selectedImage, setSelectedImage] = useState(product.imgCover);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Create a cart item with necessary properties
    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.imgCover,
      quantity: product.quantity,
      sold: product.sold,
      priceAfterDiscount: product.priceAfterDiscount,
    };
  
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);
  
    if (existingItemIndex !== -1) {
      // If item exists, increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add new item
      cart.push(cartItem);
    }
  
    console.log('Updated cart:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    setShowCheckoutOptions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 mt-24">
        <Link href="/Shop" legacyBehavior>
          <span className="inline-flex items-center space-x-2 mb-8 text-gray-600 hover:text-orange-500 transition-all duration-300 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-lg font-medium">Back to Products</span>
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enhanced Product Images */}
          <div className="space-y-6">
            <motion.div 
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={selectedImage || product.imgCover}
                alt={product.title}
                className="object-contain w-full h-full p-8"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {(product.images || [product.imgCover]).map((image, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square overflow-hidden rounded-2xl cursor-pointer 
                    ${selectedImage === image 
                      ? 'ring-4 ring-orange-500 shadow-lg' 
                      : 'ring-2 ring-gray-200'}`}
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image}
                    alt={`Product view ${i + 1}`}
                    className="object-contain w-full h-full p-2 bg-white"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Product Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                <BadgeCheck className="w-4 h-4 mr-2" />
                In Stock
              </span>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">{product.title}</h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-6 h-6 ${
                        index < Math.round(product.ratingAvg)
                          ? 'text-orange-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">({product.ratingCount} reviews)</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  {product.priceAfterDiscount ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        ${product.priceAfterDiscount}
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl text-gray-500 line-through">
                          ${product.price}
                        </span>
                        <span className="text-green-600 font-medium bg-green-100 px-3 py-1 rounded-full text-sm">
                          Save ${(product.price - product.priceAfterDiscount).toFixed(2)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                  )}
                </div>
                
                {product.sold > 0 && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                    <Package className="w-4 h-4 mr-2" />
                    {product.sold} sold
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200">
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Orders over $150</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-orange-500" />
                  <div>
                    <h4 className="font-medium">2 Year Warranty</h4>
                    <p className="text-sm text-gray-600">Full coverage</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-2xl 
                            font-semibold flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl 
                            transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white border-2 border-gray-200 py-4 px-6 rounded-2xl font-semibold 
                            flex items-center justify-center space-x-3 hover:border-orange-500 
                            hover:text-orange-500 transition-all duration-300"
                >
                  <Heart className="w-5 h-5" />
                  <span>Add to Wishlist</span>
                </motion.button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <ExpandableDescription description={product.description} />
            </div>
          </div>
        </div>

        {/* Enhanced Checkout Modal */}
        {showCheckoutOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Added to Cart!</h2>
                </div>
                <button
                  onClick={() => setShowCheckoutOptions(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <img src={product.imgCover} alt={product.title} className="w-20 h-20 object-contain rounded-lg bg-gray-100 p-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.title}</h3>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/Check-out">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl 
                                font-semibold flex items-center justify-center space-x-3"
                      onClick={() => setShowCheckoutOptions(false)}
                    >
                      <ShoppingBag className="w-5 h-5" />
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>

                  <button
                    onClick={() => setShowCheckoutOptions(false)}
                    className="w-full border-2 border-gray-200 py-3 px-4 rounded-xl font-semibold text-gray-600
                              hover:border-gray-300 transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Reviews Section */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-bold mb-8 text-black">Customer Reviews</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="text-5xl font-bold text-black mb-2">
                {product.ratingAvg}
                <span className="text-xl text-gray-500">/5</span>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-6 h-6 ${
                      index < Math.floor(product.ratingAvg) 
                        ? 'text-[#ff6600] fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Based on {product.ratingCount} reviews</div>
            </div>
            <div className="md:w-2/3">
              {calculateRatingPercentages(product.ratingCount, product.ratingCount).map(({ stars, percentage }) => (
                <div key={stars} className="flex items-center mb-3">
                  <div className="w-20 text-sm text-gray-600 font-medium">{stars} stars</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mx-3">
                    <div
                      className="bg-[#ff6600] h-2.5 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-sm text-gray-600">{percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

const ProductNotFound = ({ error }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
      <p className="text-gray-600">
        {error || "Sorry, we couldn't find the product you're looking for."}
      </p>
    </div>
  );
};

const ExpandableDescription = ({ description = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left hover:text-blue-600 transition-colors"
      >
        <span className="text-xl font-semibold">Description</span>
        <span>
          {isExpanded ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      <div
        className={`mt-4 text-gray-600 leading-relaxed transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;

