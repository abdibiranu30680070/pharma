import React, { useState, useEffect, useMemo } from 'react';
import {
  Pill, Plus, Search, LogOut, CheckCircle2, XCircle,
  Edit2, Trash2, Home, Star, Shield, Microscope, Monitor, Package,
  Newspaper, Mail, MessageSquare, Clock
} from 'lucide-react';
import { api } from '../services/api';
import { formatImageUrl } from '../utils/image';
import ProductFormModal from '../components/ProductFormModal';
import NewsFormModal from '../components/NewsFormModal';
import ConfirmModal from '../components/ConfirmModal';
import ToastNotification from '../components/ToastNotification';

const iconMap = { Pill, Package, Shield, Microscope, Monitor };

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'news' | 'inquiries'

  // Pagination Constants
  const PRODUCTS_PER_PAGE = 8;
  const NEWS_PER_PAGE = 6;
  const INQUIRIES_PER_PAGE = 8;

  // Pagination State
  const [productPage, setProductPage] = useState(1);
  const [newsPage, setNewsPage] = useState(1);
  const [inquiryPage, setInquiryPage] = useState(1);

  // Products State
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [homeFilter, setHomeFilter] = useState('All');
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // News State
  const [newsList, setNewsList] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Confirmation & Toast States
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'product'|'news'|'inquiry', id, name }
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await api.getProducts('limit=100');
      setProducts(response.data || []);
    } catch (err) {
      showToast('error', 'Failed to load products: ' + err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const response = await api.getNews();
      setNewsList(response.data || []);
    } catch (err) {
      showToast('error', 'Failed to load news: ' + err.message);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const response = await api.getInquiries();
      setInquiries(response.data || []);
    } catch (err) {
      showToast('error', 'Failed to load inquiries: ' + err.message);
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchNews();
    fetchInquiries();
  }, []);

  // Reset product page when filters change
  useEffect(() => {
    setProductPage(1);
  }, [search, categoryFilter, homeFilter]);

  // Pagination Helper Component
  const PaginationControl = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-between px-5 py-4 border-t border-slate-800/60 bg-slate-900/40 mt-4 rounded-b-2xl">
      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Page {currentPage} of {totalPages}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-black uppercase tracking-wider hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-black uppercase tracking-wider hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Handlers for Products
  const handleSaveProduct = async (formData) => {
    if (editingProduct) {
      await api.updateProduct(editingProduct.id, formData);
      showToast('success', `Product "${formData.name}" updated successfully.`);
    } else {
      await api.createProduct(formData);
      showToast('success', `New product "${formData.name}" posted successfully.`);
    }
    fetchProducts();
  };

  const handleToggleHome = async (product) => {
    try {
      const updatedStatus = !product.showOnHome;
      await api.updateProduct(product.id, { showOnHome: updatedStatus });
      showToast('success', `Updated "${product.name}" home status.`);
      fetchProducts();
    } catch (err) {
      showToast('error', 'Failed to update home status: ' + err.message);
    }
  };

  // Handlers for News
  const handleSaveNews = async (newsData) => {
    if (editingNews) {
      await api.updateNews(editingNews.id, newsData);
      showToast('success', `Article "${newsData.title}" updated.`);
    } else {
      await api.createNews(newsData);
      showToast('success', `New article "${newsData.title}" published.`);
    }
    fetchNews();
  };

  // Handlers for Inquiries
  const handleUpdateInquiryStatus = async (id, status) => {
    try {
      await api.updateInquiryStatus(id, status);
      showToast('success', `Inquiry status updated to ${status}.`);
      fetchInquiries();
    } catch (err) {
      showToast('error', 'Failed to update status: ' + err.message);
    }
  };

  // General Deletion Handler
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.type === 'product') {
        await api.deleteProduct(deleteTarget.id);
        showToast('success', `Product "${deleteTarget.name}" deleted.`);
        fetchProducts();
      } else if (deleteTarget.type === 'news') {
        await api.deleteNews(deleteTarget.id);
        showToast('success', `News article "${deleteTarget.name}" deleted.`);
        fetchNews();
      } else if (deleteTarget.type === 'inquiry') {
        await api.deleteInquiry(deleteTarget.id);
        showToast('success', 'Inquiry record deleted.');
        fetchInquiries();
      }
      setDeleteTarget(null);
    } catch (err) {
      showToast('error', 'Failed to delete: ' + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesHome =
      homeFilter === 'All' ||
      (homeFilter === 'Featured' && p.showOnHome) ||
      (homeFilter === 'Not Featured' && !p.showOnHome);

    return matchesSearch && matchesCategory && matchesHome;
  });

  const featuredCount = products.filter((p) => p.showOnHome).length;

  const totalProductPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice((productPage - 1) * PRODUCTS_PER_PAGE, productPage * PRODUCTS_PER_PAGE);

  const totalNewsPages = Math.max(1, Math.ceil(newsList.length / NEWS_PER_PAGE));
  const paginatedNews = newsList.slice((newsPage - 1) * NEWS_PER_PAGE, newsPage * NEWS_PER_PAGE);

  const totalInquiryPages = Math.max(1, Math.ceil(inquiries.length / INQUIRIES_PER_PAGE));
  const paginatedInquiries = inquiries.slice((inquiryPage - 1) * INQUIRIES_PER_PAGE, inquiryPage * INQUIRIES_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#060a14] text-slate-100 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[300px] bg-blue-600/10 blur-[150px] pointer-events-none mix-blend-screen rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-emerald-600/5 blur-[150px] pointer-events-none mix-blend-screen rounded-full"></div>

      {/* Header */}
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Pill size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold font-heading text-white">Pharmakon Admin Portal</h1>
              <p className="text-xs text-slate-400">Products, Home Selection, News & Client Inquiries</p>
            </div>
          </div>

          {/* Tab Navigation Controls */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Package size={15} /> Products Catalog ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'news' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Newspaper size={15} /> News & Articles ({newsList.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'inquiries' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={15} /> Wholesale Inquiries ({inquiries.length})
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <span className="block text-xs font-bold text-white">{user?.name || 'Administrator'}</span>
              <span className="block text-[10px] text-slate-400">{user?.email}</span>
            </div>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700/60"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Total Products</span>
              <h3 className="text-3xl font-black font-heading text-white mt-1">{products.length}</h3>
            </div>
            <div className="p-3 bg-slate-800 text-slate-300 rounded-2xl">
              <Package size={28} />
            </div>
          </div>

          <div className="bg-blue-950/40 border border-blue-800/40 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase text-blue-400 tracking-wider">Featured on Home</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">Max 6</span>
              </div>
              <h3 className="text-3xl font-black font-heading text-blue-400 mt-1">{featuredCount} / 6</h3>
            </div>
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30">
              <Home size={28} />
            </div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-800/40 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">Client Inquiries</span>
              <h3 className="text-3xl font-black font-heading text-emerald-300 mt-1">{inquiries.length}</h3>
            </div>
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <MessageSquare size={28} />
            </div>
          </div>
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Search products by name, category or SKU..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer shrink-0"
                >
                  <Plus size={16} /> Post New Product
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-slate-400 font-semibold uppercase text-[10px] mr-1">Category:</span>
                  {['All', 'Prescription Medicines', 'Over-the-Counter Medicines', 'Medical Supplies', 'Laboratory Supplies', 'Hospital Equipment'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Featured:</span>
                  {['All', 'Featured', 'Not Featured'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setHomeFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        homeFilter === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {productsLoading ? (
                <div className="p-12 text-center text-slate-400 space-y-3">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs">Fetching products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <Package className="mx-auto text-slate-600" size={40} />
                  <p className="text-sm font-bold text-white">No products found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="py-4 px-4 font-bold">Product</th>
                        <th className="py-4 px-4 font-bold">Category</th>
                        <th className="py-4 px-4 font-bold">SKU</th>
                        <th className="py-4 px-4 font-bold text-center">Show on Home</th>
                        <th className="py-4 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {paginatedProducts.map((product) => {
                        const IconComp = iconMap[product.icon] || Pill;
                        return (
                          <tr key={product.id} className="hover:bg-slate-800/40 transition-colors group">
                            <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60">
                                <img src={formatImageUrl(product.image) || '/products/prod1.jpg'} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <span className="font-bold text-sm block">{product.name}</span>
                                <span className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{product.description}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/60 text-slate-300 text-[11px]">
                                <IconComp size={12} className="text-blue-400" />
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{product.sku || 'N/A'}</td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleToggleHome(product)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer border ${
                                  product.showOnHome
                                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 hover:bg-blue-600/30'
                                    : 'bg-slate-800 text-slate-500 border-slate-700/50 hover:bg-slate-750'
                                }`}
                              >
                                {product.showOnHome ? <><CheckCircle2 size={13} /> Featured on Home</> : <><XCircle size={13} /> Off Home</>}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => { setEditingProduct(product); setIsProductModalOpen(true); }}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600/20 text-slate-300 transition-colors cursor-pointer border border-slate-700/60"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget({ type: 'product', id: product.id, name: product.name })}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-red-600/20 text-slate-300 transition-colors cursor-pointer border border-slate-700/60"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <PaginationControl currentPage={productPage} totalPages={totalProductPages} onPageChange={setProductPage} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: NEWS & ARTICLES */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white">News & Clinical Updates</h3>
                <p className="text-xs text-slate-400">Manage public press releases and announcements</p>
              </div>
              <button
                onClick={() => { setEditingNews(null); setIsNewsModalOpen(true); }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
              >
                <Plus size={16} /> Publish News Article
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedNews.map((article) => (
                <div key={article.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 hover:border-blue-500/30 transition-all duration-300">
                  <div className="relative h-44 bg-slate-950 overflow-hidden">
                    <img src={formatImageUrl(article.image)} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white font-heading">{article.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{article.description}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
                      <span>{article.date || 'Recent'}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => { setEditingNews(article); setIsNewsModalOpen(true); }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-semibold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ type: 'news', id: article.id, name: article.title })}
                          className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {newsList.length > 0 && (
              <PaginationControl currentPage={newsPage} totalPages={totalNewsPages} onPageChange={setNewsPage} />
            )}
          </div>
        )}

        {/* TAB 3: WHOLESALE & CLIENT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-base font-bold text-white">Client & Wholesale Procurement Inquiries</h3>
              <p className="text-xs text-slate-400">Manage quote requests sent from website visitors & hospitals</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {inquiriesLoading ? (
                <div className="p-12 text-center text-slate-400">Loading inquiries...</div>
              ) : inquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400">No inquiries received yet.</div>
              ) : (
                <div className="divide-y divide-slate-800/60">
                  {paginatedInquiries.map((inq) => (
                    <div key={inq.id} className="p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-slate-800/40 transition-colors group">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{inq.name || 'Client Inquiry'}</span>
                          <span className="text-xs text-slate-400 font-mono">({inq.email})</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            inq.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        {inq.productName && (
                          <p className="text-xs text-blue-300 font-semibold">
                            Requesting Product: {inq.productName} {inq.quantity ? `(Qty: ${inq.quantity})` : ''}
                          </p>
                        )}
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                          {inq.message || 'No additional message provided.'}
                        </p>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock size={11} /> {new Date(inq.createdAt || Date.now()).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex md:flex-col justify-end gap-2 shrink-0">
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'Resolved')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ type: 'inquiry', id: inq.id, name: 'Inquiry from ' + inq.email })}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-600/20 hover:text-red-400 text-slate-400 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  <PaginationControl currentPage={inquiryPage} totalPages={totalInquiryPages} onPageChange={setInquiryPage} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      {isProductModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setIsProductModalOpen(false)}
          onSave={handleSaveProduct}
          onError={(msg) => showToast('error', msg)}
        />
      )}

      {/* News Form Modal */}
      {isNewsModalOpen && (
        <NewsFormModal
          article={editingNews}
          onClose={() => setIsNewsModalOpen(false)}
          onSave={handleSaveNews}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete ${deleteTarget?.type}`}
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        loading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
