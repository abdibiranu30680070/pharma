import React, { useState, useEffect, useMemo } from 'react';
import {
  Pill, Package, Shield, Microscope, Monitor,
  CheckCircle, Info, PhoneCall, Mail, X
} from 'lucide-react';
import Distribution from '../components/sections/Distribution';
import PageBanner from '../components/layout/PageBanner';

const iconMap = { Pill, Package, Shield, Microscope, Monitor };

const CATEGORIES_LIST = [
  'All',
  'Prescription Medicines',
  'Over-the-Counter Medicines',
  'Medical Supplies',
  'Laboratory Supplies',
  'Hospital Equipment'
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [submittedInquiry, setSubmittedInquiry] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    setLoading(true);
    
    // Construct query parameters
    const params = new URLSearchParams();
    params.append('page', currentPage);
    params.append('limit', 6);
    if (selectedCategory !== 'All') {
      params.append('category', selectedCategory);
    }
    if (debouncedSearch) {
      params.append('search', debouncedSearch);
    }

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          // Backend returns { success, data: productsArray, pagination: { totalProducts, ... } }
          setProducts(resData.data || []);
          if (resData.pagination) {
            setTotalPages(resData.pagination.totalPages || 1);
            setTotalProducts(resData.pagination.totalProducts || 0);
          }
        }
      })
      .catch((err) => console.error('Failed to load products:', err))
      .finally(() => setLoading(false));
  }, [currentPage, selectedCategory, debouncedSearch]);

  const handleOpenDetails = (item) => {
    setActiveModalItem(item);
    setSubmittedInquiry(false);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSubmittedInquiry(true);
  };

  return (
    <div className="pt-16 min-h-screen">
      <PageBanner
        title="Medical & Pharmaceutical Catalog"
        description="Explore our complete directory of certified pharmaceuticals, hospital equipment, laboratory reagents, and clinical supplies."
        showSearch={true}
        searchPlaceholder="Search paracetamol, gloves, ECG, prescription..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Catalog Explorer Section */}
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-12 2xl:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filter Side-panel */}
          <div className="lg:w-1/4 shrink-0 space-y-6">
            <div className="glass-card p-6 rounded-2xl sticky top-24 bg-white border border-slate-100 shadow-sm">
              <h3 className="font-bold font-heading text-slate-900 text-sm md:text-base mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Info size={16} className="text-primary" /> Filter Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {CATEGORIES_LIST.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-[10px] md:text-xs font-semibold tracking-wide transition-all cursor-pointer w-full flex justify-between items-center ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <CheckCircle size={12} />}
                  </button>
                ))}
              </div>

              <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2 text-xs leading-relaxed text-slate-700">
                <p className="font-bold flex items-center gap-1 text-slate-900">
                  <Pill size={13} className="text-primary" /> Bulk Wholesales
                </p>
                <p className="text-slate-600">
                  Registered clinical institutions qualify for tiered B2B wholesale rates. Contact us to establish a credit line.
                </p>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading text-slate-900">
                {selectedCategory} Products
                <span className="text-sm font-normal text-slate-500 ml-2">
                  ({totalProducts} items found)
                </span>
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center text-slate-500">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-sm font-semibold">Loading Catalog Products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center max-w-lg mx-auto bg-white border border-slate-100 shadow-sm">
                <Package className="mx-auto text-slate-400 mb-4 animate-bounce" size={48} />
                <h4 className="font-bold font-heading text-slate-900 text-lg mb-2">No matching products</h4>
                <p className="text-slate-600 text-sm mb-4">
                  We couldn't find anything matching your search term. Select a different category filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="bg-primary text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all cursor-pointer"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((item) => {
                  const IconComponent = iconMap[item.icon] || Pill;
                  return (
                    <div
                      key={item.id || item.name}
                      onClick={() => handleOpenDetails(item)}
                      className="glass-card rounded-2xl flex flex-col justify-between cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 hover:scale-[1.02]"
                    >
                      <div className="relative h-44 overflow-hidden bg-slate-50 border-b border-slate-100">
                        <img
                          src={item.image || '/products/prod1.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/50 flex items-center gap-1.5 shadow-sm">
                          <IconComponent className="text-primary" size={13} />
                          <span className="text-[10px] font-bold text-slate-700">
                            {item.category}
                          </span>
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
                          <span className="font-mono text-slate-500 text-[10px]">SKU: {item.sku || 'GEN-000'}</span>
                          <span className="text-primary hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors">
                            Inspect Details <Info size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-600 font-medium px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <Distribution />

      {/* Product Details Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-4">
          <div className="relative rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden bg-white border border-slate-200">
            <div className="p-6 bg-slate-50 border-b border-slate-150 text-slate-900 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                  {activeModalItem.category}
                </span>
                <h3 className="text-xl font-bold font-heading mt-0.5 text-slate-900">
                  {activeModalItem.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="relative h-56 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                <img
                  src={activeModalItem.image || '/products/prod3.jpg'}
                  alt={activeModalItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Description</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{activeModalItem.description}</p>
              </div>

              {activeModalItem.usages && activeModalItem.usages.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Clinical Applications / Usages</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalItem.usages.map((u, i) => (
                      <span key={i} className="text-xs bg-slate-50 border border-slate-200 text-primary px-2.5 py-1 rounded-lg">
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold">Product Specifications</span>
                  <p className="text-xs text-slate-600 leading-normal">{activeModalItem.specs || 'N/A'}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] uppercase text-red-600 font-bold">Clinical Precautions</span>
                  <p className="text-xs text-red-700 leading-normal">{activeModalItem.precautions || 'Consult doctor.'}</p>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="border-t border-slate-200 pt-4">
                {submittedInquiry ? (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center space-y-1">
                    <CheckCircle className="mx-auto text-green-600" size={24} />
                    <p className="text-xs font-bold text-green-800">Inquiry Sent Successfully!</p>
                    <p className="text-[11px] text-green-700">Our procurement office will contact you within 2 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                    <h4 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Quick Wholesale Request</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="email"
                        placeholder="Clinical Email Address"
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-primary"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Estimated Quantity Needed"
                        className="w-full border border-slate-200 rounded-lg p-2.5 text-xs outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-blue-600 text-white rounded-lg py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      Submit Catalog Request for {activeModalItem.name}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveModalItem(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
