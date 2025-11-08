
import React from 'react';

const TwitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.296 1.634 4.208 3.951 4.634-.65.178-1.337.215-2.033.16.599 1.864 2.333 3.227 4.394 3.265-1.713 1.34-3.873 2.14-6.223 2.14-.404 0-.802-.023-1.195-.069 2.19 1.404 4.805 2.22 7.646 2.22 9.172 0 14.197-7.604 13.904-14.513 1.033-.746 1.896-1.68 2.585-2.783z"/></svg>;
const FacebookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/></svg>;

const Footer: React.FC = () => {
    return (
        <footer className=" bg-gray-100 text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-[200px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="text-2xl font-black tracking-tighter mb-4">NOVA.CO</h3>
                        <p className="text-gray-600 mb-4 text-sm max-w-xs">
                            We have clothes that suit your style and which you're proud to wear. From women to men.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-black hover:text-gray-600"><TwitterIcon /></a>
                            <a href="#" className="text-black hover:text-gray-600"><FacebookIcon /></a>
                            <a href="#" className="text-black hover:text-gray-600"><InstagramIcon /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold tracking-widest text-sm uppercase mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li className="hover:underline">About</li>
                            <li className="hover:underline">Features</li>
                            <li className="hover:underline">Works</li>
                            <li className="hover:underline">Career</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold tracking-widest text-sm uppercase mb-4">Help</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li className="hover:underline">Customer Support</li>
                            <li className="hover:underline">Delivery Details</li>
                            <li className="hover:underline">Terms & Conditions</li>
                            <li className="hover:underline">Privacy Policy</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold tracking-widest text-sm uppercase mb-4">FAQ</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li className="hover:underline">Account</li>
                            <li className="hover:underline">Manage Deliveries</li>
                            <li className="hover:underline">Orders</li>
                            <li className="hover:underline">Payments</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold tracking-widest text-sm uppercase mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li className="hover:underline">Free eBooks</li>
                            <li className="hover:underline">Development Tutorial</li>
                            <li className="hover:underline">How to - Blog</li>
                            <li className="hover:underline">Youtube Playlist</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>Shop.co © 2000-2023, All Rights Reserved</p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6"/>
                        <img src="https://cdn.worldvectorlogo.com/logos/mastercard-modern-design-.svg" alt="Mastercard" className="h-6"/>
                        <img src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg" alt="PayPal" className="h-6"/>
                        <img src="https://cdn.worldvectorlogo.com/logos/apple-pay-2.svg" alt="Apple Pay" className="h-6"/>
                        <img src="https://cdn.worldvectorlogo.com/logos/google-pay-2.svg" alt="Google Pay" className="h-6"/>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
