import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Pill, Package, Shield, Microscope, Monitor, Info } from 'lucide-react';
import { siteData } from '../../data/siteData';
import { itemDetails } from '../../data/itemDetails';

const iconMap = { Pill, Package, Shield, Microscope, Monitor };

export default function ProductsSummary() {
  // Build flat list of all products with details
  const allProducts = useMemo(() => {
    const list = [];
    siteData.products.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        const IconComponent = iconMap[cat.icon] || Pill;
        const info = itemDetails[item] || {};
        list.push({
          name: item,
          categoryName: cat.name,
          icon: IconComponent,
          ...info,
        });
      });
    });
    return list;
  }, []);

  const displayed = allProducts.slice(0, 12);

  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center section-heading mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            {siteData.products.title}
          </h2>
          <p className="text-slate-900 font-bold max-w-2xl mx-auto text-lg leading-relaxed">
            {siteData.products.description || 'Explore a selection of our top products.'}
          </p>
        </div>
        {/* Product Grid (12 items) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {displayed.map((item, idx) => (
            <Link
              to={`/products/${encodeURIComponent(item.name)}`}
              key={item.name}
              className="block group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div
                className="glass-card rounded-2xl flex flex-col bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:-translate-y-3 group-hover:scale-105"
              >
                <div className="relative h-44 overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={item.image || '/products/prod1.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/5 flex items-center gap-1.5 shadow-sm">
                    <item.icon className="text-primary" size={13} />
                    <span className="text-[10px] font-bold text-slate-700">{item.categoryName}</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold font-heading text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
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
          ))}
        </div>
        {/* Button to full catalog */}
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
