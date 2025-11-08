
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Link } from 'react-router-dom';

const TrashIcon = () => (
    <svg className="w-5 h-5 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

const CartPage: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useAppContext();
    const deliveryFee = 15;
    const discount = cartTotal > 0 ? (cartTotal * 0.20) : 0;
    const total = cartTotal - discount + deliveryFee;

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {cart.map(item => (
                            <div key={item.product.id} className="flex flex-col sm:flex-row items-center p-4 border rounded-xl shadow-sm">
                                <img src={item.product.imageUrls[0]} alt={item.product.name} className="w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6" />
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-lg font-bold">{item.product.name}</h2>
                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                    <p className="text-sm text-gray-500">Color: <span className="inline-block w-4 h-4 rounded-full align-middle border border-black" style={{ backgroundColor: item.color }}></span></p>
                                    <p className="text-lg font-bold mt-2">${item.product.price}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                    <div className="flex items-center border rounded-full px-3 py-2">
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="text-lg font-bold px-2">-</button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="text-lg font-bold px-2">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.product.id)}>
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="border rounded-xl shadow-sm p-6 sticky top-28">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Discount (-20%)</span>
                                <span className="text-red-500">-${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span>${deliveryFee.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        {/* <div className="mt-6 flex items-center">
                            <input type="text" placeholder="Add promo code" className="flex-1 border rounded-l-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black" />
                            <button className="bg-black text-white font-bold px-6 py-3 rounded-r-full hover:bg-gray-800">Apply</button>
                        </div> */}
                        <Link to="/checkout" className="block text-center w-full bg-black text-white font-bold py-4 mt-4 rounded-full hover:bg-gray-800">
                            Go to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
