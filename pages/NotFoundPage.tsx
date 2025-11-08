
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] bg-white">
      <h1 className="text-6xl font-black text-gray-800">404</h1>
      <p className="text-2xl font-bold mt-4">Page Not Found</p>
      <p className="text-gray-600 mt-2 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
