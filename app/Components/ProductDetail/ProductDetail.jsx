'use client'
import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ShoppingCart, Heart, Check } from 'lucide-react';
import tempImg from '@/public/assets/Images/temp.png'
import { useParams } from 'next/navigation';
import Link from 'next/link';

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
    <div className="container mx-auto px-4 py-8 max-w-7xl mt-36">
      <Link href="/Shop" legacyBehavior>
        <a className="flex items-center space-x-2 mb-6 text-black hover:text-[#ff6600] transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Back to Products</span>
        </a>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={selectedImage}
              alt={product.title}
              layout="fill"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[product.image, tempImg, tempImg, tempImg].map((image, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-md cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Image ${i}`}
                  layout="fill"
                  className="transition-opacity duration-300 ease-in-out hover:opacity-75"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-black leading-tight">{product.title}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(product.rating.rate)
                      ? 'text-[#ff6600] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating.count} reviews)</span>
          </div>
          <p className="text-2xl font-semibold text-black">
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>

          {/* Category */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-black">Category</h3>
            <span className="inline-block bg-[#ff6600] text-white px-4 py-2 rounded-full text-sm font-medium">
              {product.category}
            </span>
          </div>

          <ExpandableDescription description={product.description} />

          {/* Add to Cart */}
          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 group bg-[#ff6600] text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-start justify-center space-x-3 text-lg font-semibold relative overflow-hidden"
              >
                <div className="absolute inset-0 h-full w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-gradient-to-r from-[#ff6600] to-[#ff9900] origin-left"></div>
                <ShoppingCart className="w-6 h-6 z-20 group-hover:scale-110" />
                <span className='z-20 group-hover:scale-110'>Add to Cart</span>
              </button>
              <button className="p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                <Heart className="w-7 h-7 text-[#ff6600]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCheckoutOptions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Product added to cart!</h2>
            <div className="flex space-x-4">
              <Link href="/check-out" legacyBehavior>
                <a className="bg-[#ff6600] text-white py-2 px-4 rounded-lg">
                  Go to Checkout
                </a>
              </Link>
              <button
                onClick={() => setShowCheckoutOptions(false)}
                className="bg-gray-300 text-black py-2 px-4 rounded-lg"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
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

