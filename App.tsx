
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './hooks/useAppContext';
import Header from './components/Header';
import News from './components/NewsLetterSignup';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import BrandsPage from './pages/BrandsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import NotFoundPage from './pages/NotFoundPage';

// A helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

const CloseIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);


const AppLayout: React.FC = () => {
  const location = useLocation();
  const hideOnRoutes = ['/login', '/signup'];
  const shouldHide = hideOnRoutes.includes(location.pathname);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  
  return (
    <div className={!shouldHide ? "flex flex-col min-h-screen" : ""}>
      <ScrollToTop />
      {shouldHide ? (
        <header className="absolute top-0 left-0 p-4 sm:p-6 lg:p-8 z-10">
          <a href="#/" className="text-2xl font-black tracking-tighter">SHOP.CO</a>
        </header>
      ) : (
        <>
          
          <Header />
        </>
      )}
      <main className={!shouldHide ? "flex-grow" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!shouldHide && <News />}
      {!shouldHide && <Footer />}
      
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
