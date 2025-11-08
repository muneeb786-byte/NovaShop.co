
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';

const OrderConfirmationPage: React.FC = () => {
    const { products } = useAppContext();
        const relatedProducts = products.filter(p => p.isTopSelling).slice(0, 4);

  const { clearCart } = useAppContext();

  useEffect(() => {
    // Clear the cart once the user has successfully checked out.
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] bg-white px-4">
      <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center my-6">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-black text-gray-800 tracking-tighter">Thank you for your order!</h1>
      <p className="text-gray-600 mt-4 mb-8 max-w-md">
        Your order has been placed successfully. You will receive an email confirmation shortly with your order details.
      </p>
      <Link 
        to="/shop" 
        className="bg-black text-white px-10 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </Link>

      <div className="mt-20">
                <h2 className="text-3xl font-bold text-center mb-10">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
    </div>
    
    
  );
};

export default OrderConfirmationPage;
