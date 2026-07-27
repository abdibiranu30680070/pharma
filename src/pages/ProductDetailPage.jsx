import { useParams, Link } from 'react-router-dom';
import { X, PhoneCall, Mail, Info } from 'lucide-react';
import { itemDetails } from '../data/itemDetails';
import { siteData } from '../data/siteData';
import PageBanner from '../components/layout/PageBanner';


export default function ProductDetailPage() {
  const { id } = useParams(); // id is product name (URL‑encoded)
  const productName = decodeURIComponent(id);
  const product = itemDetails[productName] || {};

  if (!product || Object.keys(product).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <PageBanner
        title={productName}
        description={product.description}
      />
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <section className="section-shell-tight section-tint relative bg-slate-50/50">
          <div className="max-w-4xl mx-auto">
            <Link to="/products" className="text-primary hover:text-blue-700 inline-flex items-center gap-1 mb-6">
              ← Back to Catalog
            </Link>
            <div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-150 flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    {product.category || 'Category'}
                  </span>
                  <h3 className="text-2xl font-bold font-heading mt-1">{productName}</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="relative h-64 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800&auto=format&fit=crop&q=60'}
                    alt={productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                {product.usages && product.usages.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold">Usages</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.usages.map((u, i) => (
                        <span
                          key={i}
                          className="text-xs bg-slate-50 border border-slate-200 text-primary px-2.5 py-1 rounded-lg"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-xs uppercase text-slate-500 font-bold">Specifications</span>
                    <p className="text-gray-600 mt-1">{product.specs}</p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <span className="text-xs uppercase text-red-600 font-bold">Precautions</span>
                    <p className="text-red-700 mt-1">{product.precautions}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600 border-t pt-4">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <PhoneCall size={14} className="text-primary" /> {siteData.contact.info.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={14} className="text-primary" /> {siteData.contact.info.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
