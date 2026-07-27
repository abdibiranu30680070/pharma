import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { siteData } from '../../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg py-2'
          : 'bg-white py-4 shadow-sm'
      }`}
    >
      <div className="w-full max-w-none mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Slogan */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src="/logo.png"
                alt="Pharmakon Logo"
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="hidden md:flex flex-col justify-center border-l-2 border-primary/20 pl-4 py-1">
              <span className="text-primary font-black font-heading text-[17px] tracking-wide uppercase leading-none drop-shadow-sm">
                The One You Trust
              </span>
              <span className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mt-1">
                Pharmaceutical Partner
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {siteData.navigation.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-extrabold tracking-wide transition-all duration-300 group overflow-hidden ${
                    active
                      ? 'text-primary bg-primary/10 shadow-sm border border-primary/10'
                      : 'text-slate-600 hover:text-primary hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {!active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${siteData.contact.info.phone}`}
              className="text-sm font-extrabold text-slate-500 hover:text-primary transition-all flex items-center gap-2 group"
            >
              <div className="bg-slate-100 p-1.5 rounded-full group-hover:bg-primary/10 transition-colors">
                <Phone size={14} className="text-primary" />
              </div>
              Call Us
            </a>
            <Link
              to="/contact"
              className="bg-primary hover:bg-blue-700 text-white text-sm font-black tracking-wide px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-slate-600 hover:text-primary p-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl animate-slide-in">
          <div className="px-5 py-6 space-y-2 bg-gradient-to-b from-white to-slate-50/50">
            {/* Mobile Slogan */}
            <div className="md:hidden pb-4 mb-4 border-b border-slate-100 text-center">
              <span className="text-primary font-black font-heading text-lg tracking-wide uppercase drop-shadow-sm">
                The One You Trust
              </span>
            </div>

            {siteData.navigation.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-5 py-3.5 rounded-xl text-base font-extrabold transition-all duration-300 ${
                    active
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-slate-600 hover:text-primary hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="border-t border-slate-200 pt-6 mt-4 space-y-4">
              <a
                href={`tel:${siteData.contact.info.phone}`}
                className="flex items-center justify-center gap-2 text-base font-extrabold text-slate-700 hover:text-primary py-3.5 bg-white border border-slate-200 rounded-xl shadow-sm transition-all hover:border-primary/30"
              >
                <Phone size={18} className="text-primary" />
                {siteData.contact.info.phone}
              </a>
              <Link
                to="/contact"
                className="block bg-primary text-white text-center px-5 py-4 rounded-xl text-base font-black hover:bg-blue-700 transition-all shadow-xl shadow-primary/30"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
