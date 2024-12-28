'use client'
import React, { useState, useEffect, Suspense } from "react";
import PaginationControls from "@/app/Components/PaginationControls/PaginationControls";
import Sidebar from "../SideBar/sidebar";
import { useRouter } from 'next/navigation';
import { X, Search, SortAsc, DollarSign, Tag, Trash2, Eye } from 'lucide-react';

const ShopGrid = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1550]);
    const [category, setCategory] = useState([]);
    const [clearAll, setClearAll] = useState(false);
    const [isOnline, setIsOnline] = useState(false); 

    useEffect(() => {

        setIsOnline(navigator.onLine);

        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    const [tempSearch, setTempSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const options = [4, 8, 12, 16, 20];

    const handlePageChange = (page) => setCurrentPage(page);
    const handleLimitChange = (limit) => {
        setPerPage(limit);
        setCurrentPage(1);
    };
    const handleSortChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(1);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
        setCurrentPage(1);
    };
    const handleCategoryChange = (selectedCategories) => {
        setCategory(selectedCategories);
        setCurrentPage(1);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products/");
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            fetchProducts();
        };

        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const page = parseInt(query.get('page') || '1', 10);
        const limit = parseInt(query.get('per_page') || '20', 10);
        const sort = query.get('sort') || 'latest';
        const search = query.get('search') || '';
        setCurrentPage(page);
        setPerPage(limit);
        setSort(sort);
        setSearchQuery(search);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        query.set('page', currentPage);
        query.set('per_page', perPage);
        if (sort !== 'latest') query.set('sort', sort);
        if (searchQuery) query.set('search', searchQuery);
        window.history.replaceState(null, '', `?${query.toString()}`);
    }, [currentPage, perPage, sort, searchQuery]);

    useEffect(() => {
        if (clearAll) {
            setTimeout(() => setClearAll(false), 100);
        }
    }, [clearAll]);

    const handleClearAll = () => {
        setSearchQuery('');
        setSort('latest');
        setPriceRange([0, 1550]);
        setCategory([]);
        setClearAll(true);
        setCurrentPage(1);
    };

    const handleRemoveFilter = (filterType) => {
        switch (filterType) {
            case 'search':
                setSearchQuery('');
                break;
            case 'sort':
                setSort('latest');
                break;
            case 'price':
                setPriceRange([0, 1550]);
                break;
            case 'category':
                setCategory([]);
                break;
            default:
                break;
        }
        setCurrentPage(1);
    };

    const handleSearchSubmit = (e) => {
        e?.preventDefault(); // Optional chaining for when called directly
        setSearchQuery(tempSearch);
        setCurrentPage(1);
    };

    const handleTempSearchChange = (e) => {
        const newValue = e.target.value;
        setTempSearch(newValue);
        if (newValue === '') {
            setSearchQuery('');
            setCurrentPage(1);
        }
    };

    const isFilterApplied = searchQuery || sort !== 'latest' || priceRange[0] !== 0 || priceRange[1] !== 1550 || category.length > 0;

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        (category.length > 0 ? category.includes(product.category) : true)
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
            case 'popularity':
                return b.rating.count - a.rating.count;
            case 'price-low-high':
                return a.price - b.price;
            case 'price-high-low':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );
    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, products.length);
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    const handleProductClick = (productId) => {
        console.log("Product ID:", productId);
        router.push(`/Shop/Products/${productId}`);
    };

    const FilterTag = ({ icon: Icon, label, value, onRemove }) => (
        <div className="inline-flex items-center space-x-2 bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full shadow-sm transition-all duration-300 hover:bg-gray-300 group">
            <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-600" />
            <span className="text-sm font-medium">{label}: {value}</span>
            <button onClick={onRemove} className="text-red-500 group-hover:text-red-600">
                <X className="w-4 h-4" />
            </button>
        </div>
    );

    const SkeletonCard = () => (
        <div className="flex flex-col justify-between p-2 sm:p-4 border rounded-md shadow-sm h-full bg-white animate-pulse">
            <div className="bg-gray-300 h-32 sm:h-48 mb-2 sm:mb-4 rounded-md"></div>
            <div className="bg-gray-300 h-4 mb-2 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-1/2 mb-4 rounded-md"></div>
            <div className="bg-gray-300 h-8 w-full rounded-full"></div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-screen">
            <Sidebar onPriceRangeChange={handlePriceRangeChange} onCategoryChange={handleCategoryChange} clearAll={clearAll} />
            <div className="w-full lg:w-3/4 p-2 sm:p-4">
                <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between items-start lg:items-center py-2 sm:py-4 border-b border-gray-300">
                    {/* Left Section */}
                    <div className="w-full lg:w-auto space-y-2 sm:space-y-3">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">Shop</h1>
                        {isFilterApplied && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                <button
                                    className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1.5 rounded-full shadow-sm transition-all duration-300 hover:bg-red-200 group"
                                    onClick={handleClearAll}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                    <span className="text-sm font-medium">Clear All</span>
                                </button>

                                {searchQuery && (
                                    <FilterTag
                                        icon={Search}
                                        label="Search"
                                        value={searchQuery}
                                        onRemove={() => handleRemoveFilter('search')}
                                    />
                                )}

                                {sort !== 'latest' && (
                                    <FilterTag
                                        icon={SortAsc}
                                        label="Sort"
                                        value={sort}
                                        onRemove={() => handleRemoveFilter('sort')}
                                    />
                                )}

                                {(priceRange[0] !== 0 || priceRange[1] !== 1550) && (
                                    <FilterTag
                                        icon={DollarSign}
                                        label="Price"
                                        value={`$${priceRange[0]} - $${priceRange[1]}`}
                                        onRemove={() => handleRemoveFilter('price')}
                                    />
                                )}

                                {category.length > 0 && (
                                    <FilterTag
                                        icon={Tag}
                                        label="Categories"
                                        value={category.join(', ')}
                                        onRemove={() => handleRemoveFilter('category')}
                                    />
                                )}
                            </div>
                        )}
                        <div className="bg-gray-100 p-2 rounded-md shadow-md  items-center flex justify-center ">   
                        <Eye className="w-4 h-4 mr-1" />
                        <p className="text-xs sm:text-sm text-gray-700">
                            Showing <strong className="text-[#ff6600]"> {start} - {end} </strong> of <strong className="text-[#ff6600]"> {filteredProducts.length} </strong> results
                        </p>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="flex flex-col sm:flex-row w-full lg:w-auto space-y-2 sm:space-y-0 sm:space-x-3 mt-4 lg:mt-0">
                        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={tempSearch}
                                onChange={handleTempSearchChange}
                                className="w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base text-black bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                            />
                            <button 
                                type="submit"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                <Search className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
                            </button>
                        </form>

                        <div className="relative w-full sm:w-auto">
                            <select
                                className="w-full appearance-none bg-white border border-gray-300 text-xs sm:text-sm text-gray-700 py-2 px-2 sm:px-3 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff6600]"
                                value={sort}
                                onChange={handleSortChange}
                            >
                                <option value="latest">Sort by latest</option>
                                <option value="popularity">Sort by popularity</option>
                                <option value="price-low-high">Sort by price: low to high</option>
                                <option value="price-high-low">Sort by price: high to low</option>
                            </select>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 absolute right-2 top-3 text-gray-500 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
                    {loading ? (
                        Array.from({ length: perPage }).map((_, index) => <SkeletonCard key={index} />)
                    ) : paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-between p-2 sm:p-4 border rounded-md shadow-sm hover:shadow-lg transition cursor-pointer h-full bg-white"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div>
                                    <img src="../../palceholder.png" alt={product.title} className="w-full h-32 sm:h-48 object-cover mb-2 sm:mb-4 rounded-md" />
                                    <h3 className="font-medium text-sm sm:text-base text-gray-800 line-clamp-2 hover:text-[#ff6600] transition-colors">{product.title}</h3>
                                    <p className="text-base sm:text-lg font-bold font-mono mt-1">${product.price}</p>
                                </div>
                                <button className="group relative overflow-hidden bg-[#ff6600] text-white font-bold px-6 py-2 rounded-full text-sm mt-4 transition-all duration-300 self-end hover:bg-[#e65c00]">
                                    <span className="relative z-10 group-hover:text-gray-600 transition-all duration-300">Add to Basket</span>
                                    <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-full bg-white origin-center"></div>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500 w-full">No products found.</p>
                    )}
                </div>
                <div className="mt-4 sm:mt-8">
                    <Suspense fallback={<div>Loading...</div>}>
                        <PaginationControls
                            totalPages={totalPages}
                            currentPage={currentPage}
                            perPage={perPage}
                            onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}
                            options={options}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default ShopGrid;
