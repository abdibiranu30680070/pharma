import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PhoneCall, Mail, Send, CheckCircle, Package, AlertCircle } from 'lucide-react';
import { siteData } from '../data/siteData';
import PageBanner from '../components/layout/PageBanner';
import { formatImageUrl } from '../utils/image';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquiryChange = (e) => {
    setInquiryForm({ ...inquiryForm, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryStatus(null);
    try {
      const payload = {
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        productName: product.name,
        quantity: inquiryForm.quantity ? Number(inquiryForm.quantity) : null,
        subject: `Product Inquiry: ${product.name}`,
        message: inquiryForm.message || `Interested in purchasing ${product.name}.`,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setInquiryStatus('success');
        setInquiryForm({ name: '', email: '', phone: '', quantity: '', message: '' });
      } else {
        setInquiryStatus('error');
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      setInquiryStatus('error');
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-24 min-h-screen text-center px-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested product could not be located in our inventory.</p>
        <Link to="/products" className="bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-lg">
          Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <PageBanner
        title={product.name}
        description={product.description}
      />
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <section className="section-shell-tight section-tint relative bg-slate-50/50">
          <div className="max-w-5xl mx-auto">
            <Link to="/products" className="text-primary hover:text-blue-700 font-semibold inline-flex items-center gap-1 mb-6 text-sm">
              ← Back to Catalog
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left — Product Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                  <div className="p-6 bg-slate-50 border-b border-slate-150 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                        {product.category || 'Category'}
                      </span>
                      <h3 className="text-2xl font-bold font-heading mt-1">{product.name}</h3>
                    </div>
                    <span className="font-mono text-xs text-slate-500">SKU: {product.sku || 'GEN-000'}</span>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="relative h-64 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                      <img
                        src={formatImageUrl(product.image) || '/products/prod1.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Description</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>
                    </div>
                    {product.usages && product.usages.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Usages</h4>
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
                        <p className="text-gray-600 mt-1 text-xs">{product.specs || 'N/A'}</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <span className="text-xs uppercase text-red-600 font-bold">Precautions</span>
                        <p className="text-red-700 mt-1 text-xs">{product.precautions || 'Consult healthcare professional.'}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600 border-t pt-4">
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

              {/* Right — Product Inquiry Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 sticky top-24 overflow-hidden">
                  {/* Header */}
                  <div className="bg-primary p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Package size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Request a Quote</h4>
                        <p className="text-[10px] text-white/70">For: {product.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-5">
                    {inquiryStatus === 'success' ? (
                      <div className="text-center py-6 space-y-3 animate-fade-in-up">
                        <div className="w-14 h-14 bg-green-100 border border-green-200 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="text-green-600" size={28} />
                        </div>
                        <h4 className="text-base font-bold text-slate-900">Inquiry Sent!</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Our procurement team will contact you within 2 business hours regarding <strong>{product.name}</strong>.
                        </p>
                        <button
                          onClick={() => setInquiryStatus(null)}
                          className="text-primary text-xs font-bold hover:underline cursor-pointer"
                        >
                          Send another inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-4">
                        {inquiryStatus === 'error' && (
                          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium p-3 rounded-xl">
                            <AlertCircle size={14} />
                            Failed to send. Please try again.
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={inquiryForm.name}
                            onChange={handleInquiryChange}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                            placeholder="e.g. Jane Doe"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={inquiryForm.email}
                            onChange={handleInquiryChange}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                            placeholder="e.g. jane.doe@pharmacy.com"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={inquiryForm.phone}
                            onChange={handleInquiryChange}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                            placeholder="+251 9XX XXX XXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                            Quantity Needed
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            value={inquiryForm.quantity}
                            onChange={handleInquiryChange}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
                            placeholder="e.g. 500"
                            min="1"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1.5">
                            Message
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={inquiryForm.message}
                            onChange={handleInquiryChange}
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
                            placeholder="e.g. We need this for our hospital's monthly supply..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={inquiryLoading}
                          className="w-full bg-primary hover:bg-blue-600 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {inquiryLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <><Send size={14} /> Submit Inquiry</>
                          )}
                        </button>

                        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                          By submitting, our team will respond with pricing and availability within 2 business hours.
                        </p>
                      </form>
                    )}
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
