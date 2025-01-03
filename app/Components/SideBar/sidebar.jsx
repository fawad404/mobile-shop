'use client';
import React, { useState, useEffect } from "react";
import RangeSlider from "./rangebar";
import { DollarSign } from "lucide-react";

const Sidebar = ({ onPriceRangeChange, onBrandChange, clearAll }) => {
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [brands, setBrands] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);  

  const handleBrandChange = (brandId) => {
    const updatedBrands = checkedBrands.includes(brandId)
      ? checkedBrands.filter((id) => id !== brandId)
      : [...checkedBrands, brandId];
    setCheckedBrands(updatedBrands);
    onBrandChange(updatedBrands);
  };

  useEffect(() => {
    if (clearAll) {
      setCheckedBrands([]);
      setFilterSearch('');
      setBrandSearch('');
    }
  }, [clearAll]);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);  
      try {
        const response = await fetch("https://phone-cloud-plus-backend.vercel.app/api/v1/brands");
        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }

        const data = await response.json();
        console.log("brands", data.getAllBrands);

        setBrands(data.getAllBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setIsLoading(false);  
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="w-full lg:w-1/3 xl:w-1/4 backdrop-blur-md bg-white/30 border-r border-white/40 shadow-md">
      <button
        className="lg:hidden w-full px-6 py-4 text-white bg-orange-500 flex items-center justify-between mt-16 shadow-lg transform transition-transform hover:scale-[0.99] active:scale-[0.97]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold flex items-center">
          <svg className="w-5 h-5 mr-2 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-8 overflow-y-auto max-h-[calc(100vh - 4rem)] custom - scrollbar bg-[url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")]
`}>
  < div className = "mb-10 relative" >
          <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10 animate-pulse">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-orange-500" />
              <path d="M50 10V90M10 50H90" stroke="currentColor" strokeWidth="8" className="text-orange-500" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gray-800 bg-clip-text text-transparent mb-3">
            Smart Filters
          </h2>
          <p className="text-sm text-gray-600 font-medium">Refine your shopping experience</p>
        </div >

  < div className = "mb-10" >
          <div className="flex items-center mb-4">
            <DollarSign className="w-7 h-7 text-orange-500 mr-2 animate-bounce-slow" />
            <h3 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Price Range
            </h3>
          </div>
          <div className="bg-white/60 px-6 py-8 rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <RangeSlider onPriceRangeChange={onPriceRangeChange} />
          </div>
        </div >

  < div className = "mb-8" >
          <div className="flex items-center mb-6">
            <svg className="w-7 h-7 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <h3 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Brand Categories
            </h3>
          </div>
          <div className="bg-white/60 p-6 rounded-2xl border border-white/60 shadow-lg backdrop-blur-sm">
            <input
              type="search"
              placeholder="Search Brands ..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm mb-6"
            />
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <svg className="w-10 h-10 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              </div>
            ) : (
              <ul className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {filteredBrands.map((brand) => (
                  <li key={brand._id} className="group transform transition-all duration-300 hover:-translate-y-1">
                    <label className="flex items-center justify-between p-4 rounded-xl cursor-pointer border border-transparent hover:border-purple-200 bg-gradient-to-r from-white/40 to-white/60 hover:from-white/60 hover:to-white/80 backdrop-blur-sm transition-all">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-purple-600 border-purple-300 rounded-lg focus:ring-purple-500 transition-all duration-300"
                          checked={checkedBrands.includes(brand._id)}
                          onChange={() => handleBrandChange(brand._id)}
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {brand.name}
                        </span>
                      </div>
                      <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div >
      </div >
    </div >
  
  );
};

export default Sidebar;