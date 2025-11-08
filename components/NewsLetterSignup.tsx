
import React from 'react';
import Animated from './Animated';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const NewsletterSignup: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-[-115px]">
             <Animated>
                <div className=" bg-black text-white rounded-3xl">
                    <div className="px-6 lg:px-16 py-12 md:py-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter max-w-lg">
                            STAY UPTO DATE ABOUT OUR LATEST OFFERS
                        </h2>
                        <div className="w-full max-w-md">
                            <form className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MailIcon />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Subscribe to Newsletter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Animated>
        </div>
    );
};

export default NewsletterSignup;
