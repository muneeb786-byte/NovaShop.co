import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';

const SuccessIcon = () => (
    <svg className="w-24 h-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const OrderSuccessPage: React.FC = () => {
    const { products } = useAppContext();
    const relatedProducts = products.filter(p => p.isTopSelling).slice(0, 4);

    const { clearCart } = useAppContext();
    
      useEffect(() => {
        // Clear the cart once the user has successfully checked out.
        clearCart();
        // We only want this to run once when the page loads.
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
                <div className="mb-6">
                    <SuccessIcon />
                </div>
                <h1 className="text-4xl font-black mb-4">Thank You For Your Order!</h1>
                <p className="text-gray-600 mb-8 text-lg">Your order has been placed successfully. A confirmation email has been sent to your address.</p>
                <Link 
                    to="/shop" 
                    className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>

            <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-10">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
