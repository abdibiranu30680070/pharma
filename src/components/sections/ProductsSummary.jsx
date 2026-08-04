import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pill, Package, Shield, Microscope, Monitor, Info, ArrowRight } from 'lucide-react';
import { siteData } from '../../data/siteData';

const iconMap = { Pill, Package, Shield, Microscope, Monitor };

export default function ProductsSummary() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products/featured`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setFeaturedProducts(resData.data.slice(0, 6));
        }
      })
      .catch((err) => {
        console.error('Failed to fetch featured products:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50 py-16">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Featured Products</p>
          <h2 className="text-4xl md:text-5xl font-black font-heading text-primary mb-5 drop-shadow-sm">
            {siteData.products.title}
          </h2>
          <p className="text-primary font-extrabold max-w-2xl mx-auto text-base md:text-lg leading-relaxed bg-primary/10 p-5 rounded-2xl border border-primary/20 shadow-inner">
            {siteData.products.description || 'Explore our top featured pharmaceuticals and medical supplies.'}
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm font-semibold">Loading featured products...</p>
          </div>
        ) : (
          /* Product Grid (Max 6 items) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in-up">
            {featuredProducts.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Pill;
              return (
                <Link
                  to={`/products/${encodeURIComponent(item.id || item.name)}`}
                  key={item.id || item.name}
                  className="block group animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="glass-card rounded-2xl flex flex-col bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-2 group-hover:scale-[1.02] h-full">
                    <div className="relative h-48 overflow-hidden bg-slate-50 border-b border-slate-100">
                      <img
                        src={item.image || '/products/prod1.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/50 flex items-center gap-1.5 shadow-sm">
                        <IconComponent className="text-primary" size={13} />
                        <span className="text-[10px] font-bold text-slate-700">{item.category}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-500 text-[10px]">
                          SKU: {item.sku || 'GEN-000'}
                        </span>
                        <span className="text-primary hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors">
                          Inspect Details <Info size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Button to full catalog */}
        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            View All Products Catalog <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
