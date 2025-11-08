import React from 'react';

const brands = [
    { name: 'VERSACE', logo: 'https://cdn.worldvectorlogo.com/logos/versace-logo-1.svg' },
    { name: 'ZARA', logo: 'https://cdn.worldvectorlogo.com/logos/zara-logo-1.svg' },
    { name: 'GUCCI', logo: 'https://cdn.worldvectorlogo.com/logos/gucci-logo-1.svg' },
    { name: 'PRADA', logo: 'https://cdn.worldvectorlogo.com/logos/prada-logo-1.svg' },
    { name: 'Calvin Klein', logo: 'https://cdn.worldvectorlogo.com/logos/calvin-klein-2017-logo.svg' },
    { name: 'Nike', logo: 'https://cdn.worldvectorlogo.com/logos/nike.svg'},
    { name: 'Adidas', logo: 'https://cdn.worldvectorlogo.com/logos/adidas-5.svg'},
    { name: 'Puma', logo: 'https://cdn.worldvectorlogo.com/logos/puma-logo.svg'},
    { name: 'Levi\'s', logo: 'https://cdn.worldvectorlogo.com/logos/levis-1.svg'},
    { name: 'Tommy Hilfiger', logo: 'https://cdn.worldvectorlogo.com/logos/tommy-hilfiger-3.svg'},
];

const BrandsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black tracking-tighter">Our Brands</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    We partner with the world's most renowned brands to bring you a curated selection of high-quality fashion.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                {brands.map((brand) => (
                    <div key={brand.name} className="flex justify-center items-center p-8 bg-gray-50 rounded-xl h-40 transition-shadow hover:shadow-lg group">
                        <img 
                            src={brand.logo} 
                            alt={brand.name} 
                            className="max-h-12 max-w-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandsPage;
