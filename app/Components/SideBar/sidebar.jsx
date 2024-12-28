'use client'
import React, { useState, useEffect } from "react";
import RangeSlider from "./rangebar";
import { DollarSign  } from "lucide-react";

const Sidebar = ({ onPriceRangeChange, onCategoryChange, clearAll }) => {
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  const handleCategoryChange = (category) => {
    const updatedCategories = checkedCategories.includes(category)
      ? checkedCategories.filter((item) => item !== category)
      : [...checkedCategories, category];
    setCheckedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  useEffect(() => {
    if (clearAll) {
      setCheckedCategories([]);
      setFilterSearch('');
      setCategorySearch('');
    }
  }, [clearAll]);

  const categories = [
    "Audio Accessories",
    "Back Glass",
    "Battery",
    "Camera Lens Protector",
    "Car Accessories",
    "Cases",
    "Charging Accessories",
    "Computer/Laptop Accessories",
    "Devices",
    "Display Accessories",
    "Headphones",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing"
  ].filter(category => 
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div className="w-full lg:w-1/3 xl:w-1/4 bg-gradient-to-b from-white to-blue-50 border-r shadow-lg">
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden w-full px-6 py-3 text-white bg-gradient-to-r from-orange-400 to-black flex items-center justify-between mt-16"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </span>
        <svg 
          className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Sidebar Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-6 overflow-y-auto max-h-[calc(100vh-4rem)] custom-scrollbar`}>
        {/* Decorative Header */}
        <div className="mb-8 relative">
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-orange-500" />
              <path d="M50 10V90M10 50H90" stroke="currentColor" strokeWidth="8" className="text-orange-500" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Smart Filters</h2>
          <p className="text-sm text-gray-500 italic">Refine your shopping experience</p>
        </div>

        {/* Price Range with Label */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <DollarSign className="w-7 h-7 text-orange-500 mr-2" />
            <h3 className="font-semibold text-lg">Price Range</h3>
          </div>
          <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <RangeSlider onPriceRangeChange={onPriceRangeChange} />
          </div>
        </div>


        {/* Product Categories */}
        <div className="mb-8 ">
          <div className="flex items-center mb-4">
            <svg className="w-7 h-7 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <h3 className="font-semibold text-lg">Product Categories</h3>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
            <div className="flex items-center mb-4">
              <input
                type="search"
                placeholder="Search categories..."
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <ul className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {categories.map((category, index) => (
                <li key={index} className="group">
                  <label className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all cursor-pointer border border-transparent hover:border-blue-200">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                        checked={checkedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{category}</span>
                    </div>
                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
