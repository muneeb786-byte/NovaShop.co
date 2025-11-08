import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Product } from '../types';
import { categories } from '../data/products';

const SearchIcon = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const CartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
);
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
);
const ChevronDownIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

const Header: React.FC = () => {
    const { cartItemCount, user, products, logout } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const shopDropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    
    // State for search suggestions
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const desktopSearchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);

    // Debounce search input
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
            return;
        }

        const handler = setTimeout(() => {
            const filteredProducts = products.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(filteredProducts.slice(0, 5)); // Show top 5 suggestions
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery, products]);
    
    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
             if (
                desktopSearchRef.current && !desktopSearchRef.current.contains(event.target as Node) &&
                (!mobileSearchRef.current || !mobileSearchRef.current.contains(event.target as Node))
            ) {
                setIsSearchActive(false);
            }
             if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
                setIsShopDropdownOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
            // Reset state after search
            setSearchQuery('');
            setIsSearchActive(false);
            setIsMenuOpen(false); 
        }
    };
    
    const handleLogout = () => {
        logout();
        setIsProfileDropdownOpen(false);
        navigate('/');
    };
    
    useEffect(() => {
        // Close menus and search on navigation
        setIsMenuOpen(false);
        setIsShopDropdownOpen(false);
        setIsProfileDropdownOpen(false);
        setIsSearchActive(false);
        setSearchQuery('');
    }, [location.pathname, location.search]);

    const navLinkClasses = "hover:text-gray-700 transition-colors";

    const mainNavLinks = (
        <>
        <a href="#/" className={navLinkClasses}>Home</a>
            <div className="relative" ref={shopDropdownRef}>
                <button 
                    onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)} 
                    className="flex items-center font-medium"
                >
                    Shop <ChevronDownIcon />
                </button>
                {isShopDropdownOpen && (
                    <div className="absolute z-20 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        <a href="#/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Products</a>
                        {categories.map(cat => (
                           <a key={cat.category} href={`#/shop/${cat.category}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{cat.category}</a>
                        ))}
                        <a href="#/shop/Kids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kids</a>
                    </div>
                )}
            </div>
            
            <a href="#/shop?filter=sale" className={navLinkClasses}>On Sale</a>
            <a href="#/shop?filter=new" className={navLinkClasses}>New Arrivals</a>
            <a href="#/brands" className={navLinkClasses}>Brands</a>
        </>
    );

    const SuggestionsDropdown = () => (
        <div className="absolute top-full mt-2 w-full bg-white rounded-[3px] shadow-lg border z-40 max-h-96 overflow-y-auto">
          <ul>
            {suggestions.map(product => (
              <li key={product.id} className="border-b last:border-b-0">
                <Link 
                  to={`/product/${product.id}`} 
                  className="flex items-center p-3 hover:bg-gray-100 transition-colors"
                >
                  <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-16 object-cover rounded-md mr-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </Link>
              </li>
            ))}
             <li className="border-t">
                <Link
                    to={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    className="block text-center p-3 font-semibold text-sm text-black hover:bg-gray-100"
                >
                    View all results for "{searchQuery}"
                </Link>
            </li>
          </ul>
        </div>
    );

    return (
        <header className="bg-white  sticky top-0 z-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 " >
                <div className="flex items-center justify-between h-20 border-b border-gray-200">
                    <div className="flex items-center">
                        <button
                            className="lg:hidden mr-4"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <MenuIcon />
                        </button>
                        <a href="#/" className="text-2xl font-black tracking-tighter">NOVA.CO</a>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {mainNavLinks}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <div ref={desktopSearchRef} className="relative hidden md:block">
                            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                                <SearchIcon />
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search for products..."
                                    className="bg-transparent focus:outline-none ml-2 w-[250px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchActive(true)}
                                    autoComplete="off"
                                />
                            </form>
                            {isSearchActive && suggestions.length > 0 && <SuggestionsDropdown />}
                        </div>
                        <a href="#/cart" className="relative">
                            <CartIcon />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                            )}
                        </a>
                         {user ? (
                            <div ref={profileDropdownRef} className="relative">
                                <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                                    {user.name.charAt(0)}
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 z-20 mt-2 w-56 bg-white rounded-md shadow-lg py-1 border">
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-sm font-semibold">{user.name}</p>
                                            {user.location && <p className="text-xs text-gray-500 mt-1">{user.location}</p>}
                                        </div>
                                        <a href="#/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</a>
                                        <a href="#/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</a>
                                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a href="#/signup" className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors ">
                                Sign Up
                            </a>
                        )}
                    </div>
                </div>

                 {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            {mainNavLinks}
                        </nav>
                        <div ref={mobileSearchRef} className="relative mt-4">
                            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                                <SearchIcon />
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search..."
                                    className="bg-transparent focus:outline-none ml-2 w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchActive(true)}
                                    autoComplete="off"
                                />
                            </form>
                             {isSearchActive && suggestions.length > 0 && <SuggestionsDropdown />}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;