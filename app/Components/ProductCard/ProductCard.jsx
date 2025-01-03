'use client'
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import tempImage from '@/public/assets/Images/temp.png';
import Image from 'next/image';
const ProductCard = ({ product, onClick }) => {
  const discountPercentage = product.priceAfterDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <div
      className="flex flex-col justify-between p-5 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer h-full bg-white overflow-hidden group relative border border-transparent hover:border-orange-100 hover:bg-gradient-to-b hover:from-white hover:to-orange-50"
      onClick={() => onClick(product._id)}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50">
        <Image 
          src={tempImage} 
          alt={tempImage} 
          width={300}
          height={224}
          className="w-full h-56 object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        {product.priceAfterDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
            {discountPercentage}% OFF
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>
      <div className="flex-grow space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 group-hover:text-[#ff6600] transition-colors">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          {product.priceAfterDiscount ? (
            <>
              <p className="text-xl font-bold text-[#ff6600]">${product.priceAfterDiscount.toFixed(2)}</p>
              <p className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
      <button className="group relative overflow-hidden mt-6 rounded-full text-sm transition-all duration-300 w-full">
        <div className="relative px-6 py-3 bg-[#ff6600] text-white group-hover:bg-[#ff6600]/90 transition-all duration-300">
          <span className="relative z-10 flex items-center justify-center font-bold">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Basket
          </span>
        </div>
        <div className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-[#ff6600] to-[#ff8533] transition-transform duration-300"></div>
      </button>
    </div>
  );
};

export default ProductCard;

