
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import Animated from '../components/Animated';

const ChevronDownIcon = ({ className = '' }: { className?: string }) => (
    <svg className={`w-5 h-5 transition-transform ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);
const FilterIconSvg = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
);

const FilterSidebar: React.FC<{
  activeFilters: any;
  onFilterChange: (filterType: string, value: string) => void;
}> = ({ activeFilters, onFilterChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
      category: true,
      productType: true,
      dressStyle: true,
  });
  
  const categories = ['Men', 'Women'];
  const productTypes = ['Shirts', 'Pants'];
  const dressStyles = ['Formal', 'Casual', 'Party', 'Stylish'];
  
  const handleToggleSection = (section: keyof typeof openSections) => {
      setOpenSections(prev => ({...prev, [section]: !prev[section]}));
  };

  const handleFilterClick = (filterType: string, value: string) => {
    onFilterChange(filterType, value);
    setIsSidebarOpen(false); // Close mobile sidebar on click
  };
  
  const sidebarContent = (
    <div className="divide-y divide-gray-200">
        <div className="py-6">
            <button onClick={() => handleToggleSection('category')} className="w-full flex justify-between items-center font-bold text-lg">
                Category <ChevronDownIcon className={!openSections.category ? '-rotate-90' : ''} />
            </button>
            {openSections.category && (
                 <div className="mt-4 space-y-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleFilterClick('category', cat)}
                            className={`w-full text-left py-1 text-gray-700 hover:text-black transition-colors ${activeFilters.category.includes(cat) ? 'font-bold text-black' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </div>
        <div className="py-6">
            <button onClick={() => handleToggleSection('productType')} className="w-full flex justify-between items-center font-bold text-lg">
                Product Type <ChevronDownIcon className={!openSections.productType ? '-rotate-90' : ''} />
            </button>
            {openSections.productType && (
                 <div className="mt-4 space-y-2">
                    {productTypes.map(type => (
                       <button
                            key={type}
                            onClick={() => handleFilterClick('type', type)}
                            className={`w-full text-left py-1 text-gray-700 hover:text-black transition-colors ${activeFilters.type.includes(type) ? 'font-bold text-black' : ''}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}
        </div>

        <div className="py-6">
            <button onClick={() => handleToggleSection('dressStyle')} className="w-full flex justify-between items-center font-bold text-lg">
                Dress Style <ChevronDownIcon className={!openSections.dressStyle ? '-rotate-90' : ''} />
            </button>
            {openSections.dressStyle && (
                 <div className="mt-4 space-y-2">
                    {dressStyles.map(style => (
                        <button
                            key={style}
                            onClick={() => handleFilterClick('dressStyle', style)}
                            className={`w-full text-left py-1 text-gray-700 hover:text-black transition-colors ${activeFilters.dressStyle.includes(style) ? 'font-bold text-black' : ''}`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );

  return (
    <>
      <button 
        className="lg:hidden fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg z-20"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FilterIconSvg />
      </button>

      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto z-50 transform transition-transform lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-2xl">&times;</button>
        </div>
        {sidebarContent}
      </div>

      <aside className="hidden lg:block w-1/4 pr-8">
        <div className="border rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <FilterIconSvg />
          </div>
          {sidebarContent}
        </div>
      </aside>
    </>
  );
};


const ShopPage: React.FC = () => {
  const { products } = useAppContext();
  const { category: categoryParam } = useParams<{ category?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialFilters = () => {
    const params = new URLSearchParams(location.search);
    const categoryFromParam = categoryParam ? [categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)] : [];
    const categoryFromQuery = params.get('category') ? params.get('category').split(',') : [];

    return {
      category: [...new Set([...categoryFromParam, ...categoryFromQuery])],
      type: params.get('type') ? params.get('type').split(',') : [],
      dressStyle: params.get('style') ? params.get('style').split(',') : [],
      searchQuery: params.get('q') || '',
      specialFilter: params.get('filter') || '',
    };
  };

  const [filters, setFilters] = useState(getInitialFilters);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    setFilters(getInitialFilters());
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, categoryParam, location.pathname]);
  
  const handleFilterChange = (filterType: string, value: string) => {
    const newFiltersState = { ...filters };
    
    const currentValues = (newFiltersState[filterType as keyof typeof newFiltersState] as string[]) || [];

    const newValues = currentValues.length === 1 && currentValues[0] === value
      ? [] // If it's the only one selected, deselect it
      : [value]; // Otherwise, select this new one

    newFiltersState[filterType as keyof typeof newFiltersState] = newValues as any;

    const params = new URLSearchParams();
    if (newFiltersState.category.length > 0) params.set('category', newFiltersState.category.join(','));
    if (newFiltersState.type.length > 0) params.set('type', newFiltersState.type.join(','));
    if (newFiltersState.dressStyle.length > 0) params.set('style', newFiltersState.dressStyle.join(','));
    if (filters.searchQuery) params.set('q', filters.searchQuery);

    newFiltersState.specialFilter = '';

    navigate(`/shop?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    const typeMap: { [key: string]: string[] } = {
        'Shirts': ['T-Shirt', 'Shirt', 'Polo Shirt', 'Printed Shirt', 'Graphic Shirt', 'Checked Shirt', 'Blouse'],
        'Pants': ['Jeans', 'Pants', 'Shorts', 'Cargo'],
    };
    
    let filtered = products.filter(product => {
      if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
      if (filters.category.length > 0 && !filters.category.some(cat => cat === product.category)) return false;
      
      if (filters.type.length > 0) {
        const productMatchesType = filters.type.some(type => 
          typeMap[type]?.includes(product.subCategory)
        );
        if (!productMatchesType) return false;
      }
      
      if (filters.dressStyle.length > 0 && !filters.dressStyle.includes(product.dressStyle)) return false;
      if (filters.specialFilter === 'new' && !product.isNew) return false;
      if (filters.specialFilter === 'sale' && !product.oldPrice) return false;
      return true;
    });

    switch (sortBy) {
        case 'Price: Low to High': filtered.sort((a, b) => a.price - b.price); break;
        case 'Price: High to Low': filtered.sort((a, b) => b.price - a.price); break;
        case 'Rating': filtered.sort((a, b) => b.rating - a.rating); break;
        default: filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }
    return filtered;
  }, [products, filters, sortBy]);
  
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  const startProduct = totalProducts > 0 ? (currentPage - 1) * productsPerPage + 1 : 0;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);
  
  const pageTitle = useMemo(() => {
      if (filters.searchQuery) return `Results for "${filters.searchQuery}"`;
      if (filters.category.length > 0) return filters.category.join(' & ');
      if (categoryParam) return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (filters.specialFilter === 'new') return 'New Arrivals';
      if (filters.specialFilter === 'sale') return 'On Sale';
      return "All Products";
  }, [filters, categoryParam]);

  const Pagination = () => {
      const pageNumbers = [];
      const maxPageButtons = 4;
      if (totalPages <= 1) return null;

      if (totalPages <= maxPageButtons + 2) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        if (currentPage > 3) {
          pageNumbers.push('...');
        }
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            start = 2;
            end = 4;
        }
        if (currentPage >= totalPages - 2) {
            start = totalPages - 3;
            end = totalPages - 1;
        }

        for (let i = start; i <= end; i++) {
          pageNumbers.push(i);
        }

        if (currentPage < totalPages - 2) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
      

      return (
          <div className="flex justify-between items-center mt-12 border-t pt-8">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(c => c - 1)} className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Previous
              </button>
              
              {/* Desktop pagination */}
              <div className="hidden sm:flex items-center space-x-1">
                {pageNumbers.map((num, i) => (
                    <button key={i} onClick={() => typeof num === 'number' && setCurrentPage(num)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === num ? 'bg-black text-white' : 'hover:bg-gray-100'} ${typeof num !== 'number' ? 'cursor-default' : 'border'}`}>
                        {num}
                    </button>
                ))}
              </div>

              {/* Mobile pagination */}
              <div className="sm:hidden text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </div>

              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(c => c + 1)} className="px-4 py-2 border rounded-lg disabled:opacity-50 flex items-center gap-2 hover:bg-gray-100 transition-colors">
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
          </div>
      )
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:underline">Home</Link> &gt; <span className="font-medium text-black">{pageTitle}</span>
      </div>
      <div className="flex flex-col lg:flex-row">
        <FilterSidebar activeFilters={filters} onFilterChange={handleFilterChange} />
        <main className="w-full lg:w-3/4 lg:pl-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
            <h1 className="text-4xl font-bold">{pageTitle}</h1>
            <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600 whitespace-nowrap">Showing {startProduct}-{endProduct} of {totalProducts} Products</span>
                <div className="relative">
                    {/* <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded-full py-2 pl-4 pr-8 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option>Most Popular</option>
                        <option>Rating</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select> */}
                    {/* <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4" /> */}
                </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedProducts.map((product, index) => (
              <Animated key={product.id} delay={ (index % 3) * 100}>
                <ProductCard product={product} />
              </Animated>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-12 py-20 border rounded-2xl">
                <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
                <p>We couldn't find any products matching your filters. Try adjusting your selection.</p>
            </div>
          )}
          {totalPages > 1 && <Pagination />}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
