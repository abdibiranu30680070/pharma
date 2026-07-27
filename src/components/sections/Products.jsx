import { Pill, Package, Shield, Microscope, Monitor, X, Info, PhoneCall, Mail } from 'lucide-react';
import { siteData } from '../../data/siteData';
import { useMemo } from 'react';
import { itemDetails } from '../../data/itemDetails';
import { Link } from 'react-router-dom';

const iconMap = {
  Pill,
  Package,
  Shield,
  Microscope,
  Monitor,
};

export default function Products() {
  // Build a flat list of all products with details
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


  return (
    <section className="section-shell-tight section-tint relative bg-slate-50/50">
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center section-heading mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 mb-4">
            {siteData.products.title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Comprehensive range of pharmaceutical products and medical supplies
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((item) => (
            <Link to={`/products/${encodeURIComponent(item.name)}`} key={item.name} className="block">
              <div className="glass-card rounded-2xl flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:scale-105 hover:shadow-xl" >
                <div className="relative h-44 overflow-hidden bg-slate-50 border-b border-slate-100">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60'}
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
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 text-[10px]">SKU: {item.sku || 'GEN-000'}</span>
                    <span className="text-primary hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors">
                      Inspect Details <Info size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Detail Modal removed – navigation now goes to dedicated page */}
      </div>
    </section>
  );
}
