import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageBanner from './components/layout/PageBanner';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NewsDetailPage from './pages/NewsDetailPage';
import NetworkPage from './pages/NetworkPage';
import News from './components/sections/News';
import ProductDetailPage from './pages/ProductDetailPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} /> {/* new route */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/news" element={
          <div className="pt-16">
            <PageBanner
              title="News & Updates"
              description="Stay updated with our latest industry reports, clinical discoveries, and supply announcements."
            />
            <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
              <News showHeader={false} />
            </div>
          </div>
        } />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
