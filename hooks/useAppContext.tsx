
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Product, CartItem, User, Review } from '../types';
import { products as initialProducts } from '../data/products';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, city: string, country: string) => Promise<void>;
  addReview: (productId: number, review: Pick<Review, 'rating' | 'comment'>) => Promise<Review>;
  logout: () => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('shop-co-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('shop-co-user');
    }
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
      );
      if (existingItem) {
        return prevCart.map((i) =>
          i.product.id === item.product.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevCart, item];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, []);
  
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
       setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const login = useCallback(async (email: string, password: string) => {
    // SIMULATE API CALL
    await new Promise(res => setTimeout(res, 500));
    
    const storedUsersString = localStorage.getItem('shop-co-users');
    const storedUsers: User[] = storedUsersString ? JSON.parse(storedUsersString) : [];

    const foundUser = storedUsers.find(u => u.email === email);
    
    // In a real app, you'd verify the password here. For this mock, we'll just check if the user exists.
    if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('shop-co-user', JSON.stringify(foundUser));
    } else {
        throw new Error("User not found or credentials incorrect.");
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string, city: string, country: string) => {
    // SIMULATE API CALL
    await new Promise(res => setTimeout(res, 500));

    const storedUsersString = localStorage.getItem('shop-co-users');
    const storedUsers: User[] = storedUsersString ? JSON.parse(storedUsersString) : [];

    if (storedUsers.find(u => u.email === email)) {
        throw new Error("An account with this email already exists.");
    }

    const newUser: User = { 
        id: Date.now().toString(), 
        name, 
        email, 
        location: `${city}, ${country}` 
    };
    // Note: In a real app, you would hash the password before saving.
    
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('shop-co-users', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('shop-co-user', JSON.stringify(newUser));
  }, []);

  const addReview = useCallback(async (productId: number, reviewData: Pick<Review, 'rating' | 'comment'>) => {
    if (!user) throw new Error("User must be logged in to add a review.");

    // SIMULATE API CALL
    await new Promise(res => setTimeout(res, 500)); 
    
    const newReview: Review = {
        ...reviewData,
        reviewer: user.name,
        date: new Date().toISOString(),
    };

    setProducts(currentProducts => currentProducts.map(p => {
        if (p.id === productId) {
            const updatedReviews = [newReview, ...(p.reviews || [])];
            const newRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
            return { 
                ...p, 
                reviews: updatedReviews,
                rating: Math.round(newRating * 10) / 10,
                reviewCount: updatedReviews.length
            };
        }
        return p;
    }));

    return newReview;
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('shop-co-user');
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);


  return (
    <AppContext.Provider
      value={{ products, cart, user, addToCart, removeFromCart, updateQuantity, login, signup, addReview, logout, clearCart, cartTotal, cartItemCount }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
