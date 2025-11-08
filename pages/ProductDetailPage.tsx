import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import NotFoundPage from './NotFoundPage';
import ProductCard from '../components/ProductCard';
import { Review } from '../types';
import Animated from '../components/Animated';


const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = 'w-5 h-5' }) => (
    <svg className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.25 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
    </svg>
);

const VerifiedIcon = () => (
    <svg className="w-5 h-5 text-green-500 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.414 7.586a1 1 0 00-1.414-1.414L11 11.172l-1.586-1.586a1 1 0 00-1.414 1.414l2.293 2.293a1 1 0 001.414 0l4.293-4.293z" clipRule="evenodd" />
    </svg>
);

const MoreIcon = () => (
    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);


const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products, addToCart } = useAppContext();
    const navigate = useNavigate();
    
    const product = products.find(p => p.id === parseInt(id || ''));

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [error, setError] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [activeTab, setActiveTab] = useState('reviews');
    const [reviewsToShow, setReviewsToShow] = useState(4);


    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors[0] || '');
            setSelectedSize(product.sizes[2] || product.sizes[0] || '');
            setMainImage(product.imageUrls[0] || '');
        }
    }, [product]);

    if (!product) {
        return <NotFoundPage />;
    }

    const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const reviews = product.reviews || [];

    const renderStars = (rating: number, className?: string) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<StarIcon key={i} filled={i <= Math.round(rating)} className={className} />);
        }
        return stars;
    };
    
    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            setError('Please select a color and size.');
            return;
        }
        setError('');
        addToCart({ product, quantity, color: selectedColor, size: selectedSize });
        navigate('/cart');
    };
    
    const handleLoadMoreReviews = () => {
        setReviewsToShow(prev => prev + 4);
    };

    const tabButtonClasses = (tabName: string) => 
        `px-1 pb-3 border-b-2 font-semibold text-gray-800 focus:outline-none transition-colors ${
            activeTab === tabName
            ? 'border-black'
            : 'border-transparent text-gray-500 hover:text-gray-800'
        }`;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:underline">Home</Link> &gt; 
                <Link to="/shop" className="hover:underline"> Shop</Link> &gt; 
                <Link to={`/shop/${product.category}`} className="hover:underline"> {product.category}</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="flex flex-col lg:flex-row-reverse gap-4">
                    <div className="flex-grow">
                        <img src={mainImage} alt={product.name} className="w-full rounded-2xl aspect-[4/5] object-cover"/>
                    </div>
                    <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-1/5">
                        {product.imageUrls.slice(0, 4).map((url, index) => (
                            <button 
                                key={index} 
                                onClick={() => setMainImage(url)}
                                className={`flex-1 lg:flex-initial rounded-lg overflow-hidden border-2 transition-colors ${mainImage === url ? 'border-black' : 'border-transparent'}`}
                            >
                                <img src={url} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-auto aspect-square object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-wide mb-2">{product.name}</h1>
                     <div className="flex items-center mb-4">
                        {renderStars(product.rating)}
                        <span className="ml-2 text-sm text-gray-600">{product.rating}/5</span>
                    </div>
                    <div className="flex items-baseline space-x-3 mb-4">
                        <p className="text-3xl font-bold">${product.price}</p>
                        {product.oldPrice && (
                            <p className="text-2xl text-gray-400 line-through">${product.oldPrice}</p>
                        )}
                        {product.oldPrice && (
                            <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                            </span>
                        )}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                    
                    <hr className="my-6" />

                    <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-gray-700">Select Colors</h3>
                        <div className="flex space-x-3">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-black ring-2 ring-offset-1 ring-black' : 'border-gray-300'}`}
                                    style={{ backgroundColor: color }}
                                    aria-label={`Color ${color}`}
                                >
                                    {selectedColor === color && <CheckIcon />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-semibold mb-3 text-gray-700">Choose Size</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-3 rounded-full border text-sm font-semibold transition-colors ${selectedSize === size ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded-full px-4 py-3 bg-gray-100">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl font-bold text-gray-600 hover:text-black">-</button>
                            <span className="w-12 text-center font-semibold">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="text-xl font-bold text-gray-600 hover:text-black">+</button>
                        </div>
                        <button onClick={handleAddToCart} className="flex-1 bg-black text-white font-bold py-4 px-8 rounded-full hover:bg-gray-800 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="reviews-section" className="mt-20">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button onClick={() => setActiveTab('description')} className={tabButtonClasses('description')}>
                            Product Details
                        </button>
                        <button onClick={() => setActiveTab('reviews')} className={tabButtonClasses('reviews')}>
                            Rating & Reviews
                        </button>
                    </nav>
                </div>
                <div className="mt-8">
                    {activeTab === 'description' && (
                        <Animated className="prose max-w-none text-gray-600">
                             <p>{product.description}</p>
                        </Animated>
                    )}
                     {activeTab === 'reviews' && (
                        <Animated>
                            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                               <h3 className="text-2xl font-bold">All Reviews <span className="text-gray-500 font-normal">({reviews.length})</span></h3>
                               <div className="flex items-center gap-2 sm:gap-4">
                                   <button className="p-3 bg-gray-100 rounded-full"><FilterIcon /></button>
                                   {/* <select className="border rounded-full py-2 px-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black text-sm">
                                        <option>Latest</option>
                                        <option>Oldest</option>
                                        <option>Highest Rating</option>
                                        <option>Lowest Rating</option>
                                   </select> */}
                                   <button className="bg-black text-white font-bold py-2 px-4 sm:px-6 rounded-full hover:bg-gray-800 text-sm whitespace-nowrap">Write a Review</button>
                               </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {reviews.length > 0 ? (
                                    reviews.slice(0, reviewsToShow).map((review, index) => (
                                        <div key={index} className="border border-gray-200 rounded-xl p-6">
                                            <div className="flex items-center justify-between">
                                               <div className="flex">{renderStars(review.rating)}</div>
                                               <MoreIcon />
                                            </div>
                                            <div className="flex items-center mt-4 mb-2">
                                                 <h4 className="font-bold">{review.reviewer}</h4>
                                                 <VerifiedIcon />
                                            </div>
                                            <p className="text-gray-600 text-sm mb-4">"{review.comment}"</p>
                                            <p className="text-xs text-gray-500">Posted on {new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 mt-4 md:col-span-2">No reviews yet for this product.</p>
                                )}
                           </div>
                            {reviews.length > reviewsToShow && (
                               <div className="text-center mt-10">
                                   <button onClick={handleLoadMoreReviews} className="border rounded-full px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">Load More Reviews</button>
                               </div>
                           )}
                        </Animated>
                     )}
                </div>
            </div>

            <div className="mt-20 border-t pt-16">
                <Animated>
                    <h2 className="text-4xl font-black tracking-tighter text-center mb-10">YOU MIGHT ALSO LIKE</h2>
                </Animated>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {similarProducts.map((p, index) => (
                        <Animated key={p.id} delay={index * 100}>
                            <ProductCard product={p} />
                        </Animated>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
