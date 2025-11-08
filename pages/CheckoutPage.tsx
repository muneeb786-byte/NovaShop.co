import React, { useState, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { useNavigate, Link } from 'react-router-dom';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const CheckoutPage: React.FC = () => {
    const { cart, cartTotal, user } = useAppContext();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle required redirects
    useEffect(() => {
        if (!user) {
            navigate('/signup');
        } else if (cart.length === 0 && !isSubmitting) {
            navigate('/');
        }
    }, [user, cart, navigate, isSubmitting]);

    // Pre-fill form data from user profile
    useEffect(() => {
        if (user) {
            const [city = '', country = ''] = user.location?.split(', ').map(s => s.trim()) || [];
            setFormState(prevState => ({
                ...prevState,
                fullName: user.name || '',
                email: user.email || '',
                city: city,
                country: country,
            }));
        }
    }, [user]); // This effect runs only when the user object changes


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically add form validation
        setIsSubmitting(true);
        // Simulate a faster API call
        setTimeout(() => {
            navigate('/order-confirmation');
        }, 300);
    };

    const deliveryFee = 15;
    const discount = cartTotal > 0 ? (cartTotal * 0.20) : 0;
    const total = cartTotal - discount + deliveryFee;
    
    // Render nothing if we are about to redirect
    if (!user || (cart.length === 0 && !isSubmitting)) {
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-black tracking-tighter">Checkout</h1>
                    <div className="flex justify-center items-center mt-4 text-sm font-medium text-gray-500">
                        <span>Cart</span>
                        <span className="mx-2">&gt;</span>
                        <span className="text-black font-bold">Checkout</span>
                        <span className="mx-2">&gt;</span>
                        <span>Confirmation</span>
                    </div>
                </header>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border">
                            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
                                    <input type="text" name="fullName" id="fullName" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.fullName} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
                                    <input type="email" name="email" id="email" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.email} />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number *</label>
                                    <input type="tel" name="phone" id="phone" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.phone} />
                                </div>
                                 <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                                    <input type="text" name="country" id="country" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.country} />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street address *</label>
                                    <textarea name="address" id="address" required rows={3} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.address}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input type="text" name="city" id="city" required className="ww-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.city} />
                                </div>
                                 <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State / Province *</label>
                                    <input type="text" name="state" id="state" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.state} />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal code *</label>
                                    <input type="text" name="zip" id="zip" required className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black" onChange={handleInputChange} value={formState.zip} />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mt-10 mb-6">Payment Method</h2>
                            <div className="border border-black rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center mr-3">
                                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                                    </div>
                                    <span className="font-semibold">Cash on Delivery</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Pay with cash upon delivery.</p>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border ">
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-4">
                                    {cart.map(item => (
                                        <div key={item.product.id} className="flex items-center">
                                            <img src={item.product.imageUrls[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                                            <div className="flex-1">
                                                <p className="font-semibold">{item.product.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-3 pt-4 border-t">
                                    <div className="flex justify-between text-gray-700"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-gray-700"><span>Discount (-20%)</span><span className="text-red-500">-${discount.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-gray-700"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-bold py-4 mt-6 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400">
                                    {isSubmitting ? 'Processing...' : 'Confirm Order'}
                                </button>
                                <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    Secure Checkout - SSL Encrypted
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;