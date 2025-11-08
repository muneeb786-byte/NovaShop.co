
import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.25 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<StarIcon key={i} filled={i <= Math.round(product.rating)} />);
        }
        return stars;
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div onClick={handleCardClick} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-gray-100">
                <img src={product.imageUrls[0]} alt={product.name} className="w-full h-auto object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-bold truncate ">{product.name}</h3>
                <div className="flex items-center mt-1">
                    <div className="flex">{renderStars()}</div>
                    <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}/5</span>
                </div>
                <div className="flex items-baseline mt-2 space-x-2">
                    <p className="text-xl font-bold">${product.price}</p>
                    {product.oldPrice && (
                        <>
                            <p className="text-lg text-gray-400 line-through">${product.oldPrice}</p>
                             <span className="bg-red-100 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
