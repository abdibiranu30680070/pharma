import React, { useState, useEffect } from 'react';
import { X, Pill, Package, Shield, Microscope, Monitor, Home, Upload, Image, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const CATEGORIES = [
  { name: 'Prescription Medicines', icon: 'Pill' },
  { name: 'Over-the-Counter Medicines', icon: 'Package' },
  { name: 'Medical Supplies', icon: 'Shield' },
  { name: 'Laboratory Supplies', icon: 'Microscope' },
  { name: 'Hospital Equipment', icon: 'Monitor' },
];

export default function ProductFormModal({ product, onClose, onSave, onError }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Prescription Medicines',
    icon: 'Pill',
    description: '',
    usages: '',
    specs: '',
    precautions: '',
    sku: '',
    image: '/products/prod1.jpg',
    showOnHome: false,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Prescription Medicines',
        icon: product.icon || 'Pill',
        description: product.description || '',
        usages: Array.isArray(product.usages) ? product.usages.join(', ') : (product.usages || ''),
        specs: product.specs || '',
        precautions: product.precautions || '',
        sku: product.sku || '',
        image: product.image || '/products/prod1.jpg',
        showOnHome: Boolean(product.showOnHome),
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const catName = e.target.value;
    const matched = CATEGORIES.find((c) => c.name === catName);
    setFormData((prev) => ({
      ...prev,
      category: catName,
      icon: matched ? matched.icon : 'Pill',
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg('');
    try {
      const result = await api.uploadImage(file);
      if (result.success && result.imageUrl) {
        setFormData((prev) => ({ ...prev, image: result.imageUrl }));
      }
    } catch (err) {
      setErrorMsg('Failed to upload image: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      const msg = err.message || 'Error saving product';
      setErrorMsg(msg);
      if (onError) onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full text-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
              {product ? 'Edit Product' : 'Create New Product'}
            </span>
            <h2 className="text-xl font-bold font-heading text-white">
              {product ? product.name : 'Add Product to Catalog'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-red-400 text-xs">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Featured on Home Selection Checkbox Toggle */}
          <div className="bg-blue-600/10 border border-blue-500/40 p-4 rounded-2xl flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
                <Home size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  Show on Home Page Selection
                </h4>
                <p className="text-xs text-slate-300">Check this box to feature this product on the home page (Max 6 featured items displayed)</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                name="showOnHome"
                checked={formData.showOnHome}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Amoxicillin 500mg"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Image File Upload */}
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Product Image Upload
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview Thumbnail */}
              <div className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-700/80 overflow-hidden shrink-0 flex items-center justify-center">
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Image className="text-slate-600" size={28} />
                )}
              </div>

              {/* Upload Input */}
              <div className="flex-1 w-full space-y-2">
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold transition-colors cursor-pointer w-full sm:w-auto justify-center">
                  <Upload size={14} /> {uploadingImage ? 'Uploading Image...' : 'Choose Image File to Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
                <p className="text-[11px] text-slate-400">
                  Or image path/URL:
                </p>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/products/prod1.jpg or http://..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                SKU / Batch Code
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. RX-ANT-882"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Usages (comma separated)
              </label>
              <input
                type="text"
                name="usages"
                value={formData.usages}
                onChange={handleChange}
                placeholder="Bacterial infection, Infection control"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed product overview..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Specifications
              </label>
              <textarea
                name="specs"
                rows={2}
                value={formData.specs}
                onChange={handleChange}
                placeholder="WHO-GMP certified, 500mg capsules..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Precautions
              </label>
              <textarea
                name="precautions"
                rows={2}
                value={formData.precautions}
                onChange={handleChange}
                placeholder="Requires doctor prescription..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : (product ? 'Update Product' : 'Post Product')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
