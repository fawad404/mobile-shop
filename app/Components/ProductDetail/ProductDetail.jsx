'use client'
import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ShoppingCart, Heart, Check, Package, ShieldCheck, ArrowRight, 
         BadgeCheck, Clock, Truck, X, ShoppingBag } from 'lucide-react';
import tempImg from '@/public/assets/Images/temp.png'
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

const ProductDetail = ({id}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCheckoutOptions, setShowCheckoutOptions] = useState(false);
  console.log('Fetching product...', id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
  
        const data = JSON.parse(text);
        if (!data) {
          throw new Error('Invalid data received');
        }
        setProduct(data);
        setSelectedImage(data.image);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      console.log("Product ID from params:", id);
      fetchProduct();
    }
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Current cart:', cart); // Log the current cart
    cart.push(product);
    console.log('Updated cart:', cart); // Log the updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // Trigger the storage event
    setShowCheckoutOptions(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return <ProductNotFound error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8  mt-36">
      <Link href="/Shop" legacyBehavior>
        <a className="inline-flex items-center space-x-2 mb-6 text-gray-600 hover:text-orange-500 transition-all duration-300 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg font-medium">Back to Products</span>
        </a>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div 
            className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={selectedImage}
              alt={product.title}
              className="object-contain w-full h-full p-4 transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[product.image, tempImg, tempImg, tempImg].map((image, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer border-2 
                  ${selectedImage === image ? 'border-orange-500' : 'border-transparent'}`}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Product view ${i + 1}`}
                  className="object-contain w-full h-full p-2"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
              <BadgeCheck className="w-4 h-4 mr-1" />
              In Stock
            </span>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">{product.title}</h1>
          </div>

          {/* Rating Section */}
          <div className="flex items-center space-x-4">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(product.rating.rate)
                      ? 'text-orange-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 font-medium">({product.rating.count} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
              <Clock className="w-4 h-4 mr-1" />
              Limited Time Offer
            </span>
          </div>

          {/* Features */}
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
          <div>
          <ExpandableDescription description={product.description} />
          </div>

          {/* Add to Cart Section */}
          <div className="space-y-4">
            <motion.button
              onClick={() => addToCart(product)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl 
                        font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl 
                        transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full border-2 border-gray-200 py-4 px-6 rounded-xl font-semibold 
                        flex items-center justify-center space-x-3 hover:border-orange-500 
                        hover:text-orange-500 transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
              <span>Add to Wishlist</span>
            </motion.button>
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
                <img src={product.image} alt={product.title} className="w-20 h-20 object-contain rounded-lg bg-gray-100 p-2" />
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
              {product.rating.rate.toFixed(1)}
              <span className="text-xl text-gray-500">/5</span>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 ${
                    index < Math.floor(product.rating.rate)
                      ? 'text-[#ff6600] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">Based on {product.rating.count} reviews</div>
          </div>
          <div className="md:w-2/3">
            {calculateRatingPercentages(product.rating.rate, product.rating.count).map(({ stars, percentage }) => (
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

