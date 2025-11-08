import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import ProductCard from '../components/ProductCard';
import { Testimonial } from '../types';
import Animated from '../components/Animated';
import { hero } from '@/data/images';


const Hero: React.FC = () => (
    <div className="overflow-hidden bg-gray-100">
        <div className="container mx-auto  sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center pt-12 lg:py-0">
            <div className="px-4 lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4 hero-h1">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 hero-p">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <a href="#/shop" className="bg-black text-white px-12 py-4 rounded-full font-bold inline-block hover:bg-gray-800 transition-colors hero-button">Shop Now</a>
                <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 hero-stats">
                    <div className="text-center">
                        <p className="text-2xl font-bold">200+</p>
                        <p className="text-gray-600">International Brands</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">2,000+</p>
                        <p className="text-gray-600">High-Quality Products</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold">30,000+</p>
                        <p className="text-gray-600">Happy Customers</p>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 h-[70vh] lg:h-auto hero-image ">
                <img src={hero} alt="Fashion models" className="w-full h-full object-cover" />
            </div>
        </div>
    </div>
);

const BrandsBanner: React.FC = () => {
    const brands = [
        'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein',
        'Nike', 'Adidas', 'Puma', 'H&M', 'Levi\'s',
        'Tommy Hilfiger'
    ];

    // Duplicate the list to enable infinite loop
    const extendedBrands = [...brands, ...brands, ...brands];

    return (
        <div className="bg-black py-8 overflow-hidden relative">
            <Animated>
                <div className="whitespace-nowrap flex animate-scroll">
                    {extendedBrands.map((brand, index) => (
                        <p
                            key={index}
                            className="font-bold text-xl text-white mx-10 inline-block"
                        >
                            {brand}
                        </p>
                    ))}
                </div>
            </Animated>

            {/* Custom animation */}
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 10s linear infinite;
                }
            `}</style>
        </div>
    );
};


const DressStyleBrowser: React.FC = () => (
    <div className="bg-gray-100 rounded-3xl py-16 px-4 sm:px-6 lg:px-8">
        <Animated>
            <h2 className="text-center text-4xl font-black tracking-tighter mb-12">BROWSE BY DRESS STYLE</h2>
        </Animated>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-6 h-[60vh] min-h-[500px] text-white font-bold">
            <Animated className="col-span-2 row-span-2 block relative rounded-2xl overflow-hidden group">
                <a href="#/shop?style=Casual" className="w-full h-full">
                    <img src="https://img.freepik.com/free-photo/beautiful-shot-pretty-male-sitting-comfortably-front-his-house_181624-43288.jpg?semt=ais_hybrid&w=740&q=80" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Casual Style" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-start p-6">
                        <h3 className="text-3xl">Casual</h3>
                    </div>
                </a>
            </Animated>
            <Animated delay={100} className="col-span-2 block relative rounded-2xl overflow-hidden group">
                <a href="#/shop?style=Formal" className="w-full h-full">
                    <img src="https://wallup.net/wp-content/uploads/2015/07/Combined-clothes.jpg" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Formal Style" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-start p-6">
                        <h3 className="text-3xl">Formal</h3>
                    </div>
                </a>
            </Animated>
            <Animated delay={200} className="block relative rounded-2xl overflow-hidden group">
                <a href="#/shop?style=Party" className="w-full h-full">
                    <img src="https://media.istockphoto.com/id/1500253133/photo/fashionable-young-woman-holding-cocktail-with-beautiful-sunset-behind.jpg?s=612x612&w=0&k=20&c=aNopKZCSdF5ya6I-fnXRI0xnzGfRlcogzg1t8hSpjGI=" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Party Style" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-start p-6">
                        <h3 className="text-2xl">Party</h3>
                    </div>
                </a>
            </Animated>
            <Animated delay={300} className="block relative rounded-2xl overflow-hidden group">
                <a href="#/shop?style=Gym" className="w-full h-full">
                    <img src="https://media.istockphoto.com/id/618553342/photo/beauty-young-girl-outdoors-enjoying-nature.jpg?s=612x612&w=0&k=20&c=hekc8yrqf9OzJQ_-jjR4gp5FwUci401sHFjyDKo3cUk=" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" alt="Gym Style" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-start p-6">
                        <h3 className="text-2xl">Stylish</h3>
                    </div>
                </a>
            </Animated>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
    const originalTestimonials: Testimonial[] = useMemo(() => [
        { name: 'Sarah M.', quote: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations." },
        { name: 'Alex K.', quote: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions." },
        { name: 'James L.', quote: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection is not only diverse but also on-point with the latest trends." },
        { name: 'Maddy F.', quote: "The customer service is exceptional, and the clothes are true to size. I can't recommend Shop.co enough!" },
        { name: 'Mike P.', quote: "A fantastic online store with a great variety of products. My order arrived quickly and was packaged beautifully." },
    ], []);

    const extendedTestimonials = useMemo(() => [
        ...originalTestimonials, ...originalTestimonials, ...originalTestimonials
    ], [originalTestimonials]);

    const [currentIndex, setCurrentIndex] = useState(originalTestimonials.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [itemWidth, setItemWidth] = useState(0);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateWidth = () => {
            if (itemRef.current) {
                const cardNode = itemRef.current;
                const cardStyle = window.getComputedStyle(cardNode);
                const marginRight = parseInt(cardStyle.marginRight) || 0;
                setItemWidth(cardNode.offsetWidth + marginRight);
            }
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    const handlePrev = () => {
        if (!isTransitioning) return;
        setCurrentIndex(prev => prev - 1);
    };

    const handleNext = () => {
        if (!isTransitioning) return;
        setCurrentIndex(prev => prev + 1);
    };

    useEffect(() => {
        if (!isTransitioning) {
            requestAnimationFrame(() => setIsTransitioning(true));
        }
    }, [isTransitioning]);

    const handleTransitionEnd = () => {
        if (currentIndex <= 0) {
            setIsTransitioning(false);
            setCurrentIndex(originalTestimonials.length);
        } else if (currentIndex >= originalTestimonials.length * 2) {
            setIsTransitioning(false);
            setCurrentIndex(originalTestimonials.length);
        }
    };

    const brands = [
        'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein', 
        'Nike', 'Adidas', 'Puma', 'H&M', 'Levi\'s', 'Tommy Hilfiger', 'Ralph Lauren'
    ];
    const extendedBrands = [...brands, ...brands]; // Duplicate for seamless scroll


    const StarIcon: React.FC = () => (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0l-3.368 2.447c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.25 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
    );

    const LeftArrow = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>);
    const RightArrow = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>);

    return (
        <div className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Animated>
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-black tracking-tighter">OUR HAPPY CUSTOMERS</h2>
                        <div className="flex items-center space-x-2">
                            <button onClick={handlePrev} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                                <LeftArrow />
                            </button>
                            <button onClick={handleNext} className="p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                                <RightArrow />
                            </button>
                        </div>
                    </div>
                </Animated>
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 w-24 z-10  pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 z-10  pointer-events-none" />
                <Animated>
                    <div className="overflow-hidden">
                        <div
                            className="flex "
                            style={{
                                transform: `translateX(-${currentIndex * itemWidth}px)`,
                                transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {extendedTestimonials.map((testimonial, index) => (
                                <div key={index} ref={index === 0 ? itemRef : null} className="border border-gray-200 rounded-2xl p-6 h-full flex-shrink-0 w-[90vw] md:w-[45vw] lg:w-[30vw] mr-8">
                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                                    </div>
                                    <h3 className="font-bold text-lg mb-3 flex items-center">{testimonial.name}
                                        <svg className="w-5 h-5 text-green-500 ml-1.5" viewBox="0 0 24 24" fill="currentColor">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.414 7.586a1 1 0 00-1.414-1.414L11 11.172l-1.586-1.586a1 1 0 00-1.414 1.414l2.293 2.293a1 1 0 001.414 0l4.293-4.293z" clipRule="evenodd" />
                                        </svg>
                                    </h3>
                                    <p className="text-gray-600">"{testimonial.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Animated>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
    const { products } = useAppContext();
    const newArrivals = products.filter(p => p.isNew).slice(0, 4);
    const topSelling = products.filter(p => p.isTopSelling).slice(0, 4);

    return (
        <div>
            <Hero />
            <BrandsBanner />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <Animated>
                    <h2 className="text-center text-4xl font-black tracking-tighter mb-12">NEW ARRIVALS</h2>
                </Animated>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newArrivals.map((product, index) => (
                        <Animated key={product.id} delay={index * 100}>
                            <ProductCard product={product} />
                        </Animated>
                    ))}
                </div>
                <Animated className="text-center mt-12">
                    <a href="#/shop?filter=new" className="px-12 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition-colors">View All</a>
                </Animated>
            </div>
            <hr className="container mx-auto border-gray-200" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <Animated>
                    <h2 className="text-center text-4xl font-black tracking-tighter mb-12">TOP SELLING</h2>
                </Animated>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {topSelling.map((product, index) => (
                        <Animated key={product.id} delay={index * 100}>
                            <ProductCard product={product} />
                        </Animated>
                    ))}
                </div>
                <Animated className="text-center mt-12">
                    <a href="#/shop" className="px-12 py-3 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 transition-colors">View All</a>
                </Animated>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <DressStyleBrowser />
            </div>
            <Testimonials />
        </div>
    );
};

export default HomePage; 