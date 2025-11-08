
export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
}

export type ProductSubCategory = 'T-Shirt' | 'Shorts' | 'Shirt' | 'Hoodie' | 'Jeans' | 'Polo Shirt' | 'Printed Shirt' | 'Graphic Shirt' | 'Checked Shirt' | 'Leather Jacket' | 'Casual Jacket' | 'Sweatshirt' | 'Coat' | 'Pants' | 'Cargo' | 'Dress' | 'Skirt' | 'Blouse' | 'Tracksuit';


export interface Product {
  id: number;
  name: string;
  category: 'Men' | 'Women' | 'Kids' | 'All';
  subCategory: ProductSubCategory;
  dressStyle: 'Casual' | 'Formal' | 'Party' | 'Gym' | 'Stylish';
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrls: string[];
  colors: string[];
  sizes: string[];
  description: string;
  isNew?: boolean;
  isTopSelling?: boolean;
  reviews?: Review[];
  brand?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
}

export interface Testimonial {
    name: string;
    quote: string;
}