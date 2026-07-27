import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import NewsDetailPage from './pages/NewsDetailPage';
import Distribution from './components/sections/Distribution';
import Partners from './components/sections/Partners';
import News from './components/sections/News';
import ProductDetailPage from './pages/ProductDetailPage'; // new import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} /> {/* new route */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/distribution" element={
          <div className="pt-16">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 overflow-hidden">
              <div className="bg-blob -top-20 -left-20 animate-float opacity-30"></div>
              <div className="bg-blob-secondary bottom-10 right-10 animate-float-delayed opacity-20"></div>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight animate-slide-in">
                  Distribution <span className="text-gradient-shine">Network</span>
                </h1>
                <p className="text-blue-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  Reliable climate-controlled delivery systems and nationwide logistics network.
                </p>
              </div>
            </div>
            <Distribution />
          </div>
        } />
        <Route path="/partners" element={
          <div className="pt-16">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 overflow-hidden">
              <div className="bg-blob -top-20 -left-20 animate-float opacity-30"></div>
              <div className="bg-blob-secondary bottom-10 right-10 animate-float-delayed opacity-20"></div>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight animate-slide-in">
                  Our <span className="text-gradient-shine">Partners</span>
                </h1>
                <p className="text-blue-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  Trusted healthcare networks, research clinics, and certified pharmaceutical manufacturers.
                </p>
              </div>
            </div>
            <Partners />
          </div>
        } />
        <Route path="/news" element={
          <div className="pt-16">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 overflow-hidden">
              <div className="bg-blob -top-20 -left-20 animate-float opacity-30"></div>
              <div className="bg-blob-secondary bottom-10 right-10 animate-float-delayed opacity-20"></div>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold font-heading tracking-tight animate-slide-in">
                  News &amp; <span className="text-gradient-shine">Updates</span>
                </h1>
                <p className="text-blue-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  Stay updated with our latest industry reports, clinical discoveries, and supply announcements.
                </p>
              </div>
            </div>
            <News />
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
