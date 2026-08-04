import { productModel } from '../models/productModel.js';

export const productService = {
  async getAllProducts(query = {}) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 9;
    const search = query.search || '';
    const category = query.category || '';

    const allProducts = await productModel.getAll();

    // Filter by category & search if provided
    let filtered = allProducts;
    if (category && category !== 'All') {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    const totalProducts = filtered.length;
    const totalPages = Math.ceil(totalProducts / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      products: paginatedData,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  },

  async getFeaturedProducts() {
    return await productModel.getFeatured(6);
  },

  async getProductById(id) {
    const product = await productModel.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  },

  async createProduct(data) {
    if (!data.name || !data.category) {
      const error = new Error('Product name and category are required');
      error.statusCode = 400;
      throw error;
    }

    const newProduct = {
      name: data.name,
      category: data.category,
      icon: data.icon || 'Pill',
      description: data.description || '',
      usages: Array.isArray(data.usages) ? data.usages : (data.usages ? data.usages.split(',').map(s => s.trim()) : []),
      specs: data.specs || '',
      precautions: data.precautions || '',
      sku: data.sku || `PHM-${Math.floor(100 + Math.random() * 900)}`,
      image: data.image || '/products/prod1.jpg',
      showOnHome: Boolean(data.showOnHome),
    };

    // Validate max 6 featured products
    if (Boolean(data.showOnHome)) {
      const featured = await productModel.getFeatured(100);
      if (featured.length >= 6) {
        const error = new Error('Maximum 6 featured products allowed on the home page. Please remove one before adding another.');
        error.statusCode = 400;
        throw error;
      }
    }

    return await productModel.create(newProduct);
  },

  async updateProduct(id, data) {
    const existing = await productModel.findById(id);
    if (!existing) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    const updatedData = {
      ...data,
      showOnHome: data.showOnHome !== undefined ? Boolean(data.showOnHome) : existing.showOnHome,
      usages: Array.isArray(data.usages) ? data.usages : (typeof data.usages === 'string' ? data.usages.split(',').map(s => s.trim()) : existing.usages),
    };

    // Validate max 6 featured products
    if (data.showOnHome !== undefined && Boolean(data.showOnHome) && !existing.showOnHome) {
      const featured = await productModel.getFeatured(100);
      if (featured.length >= 6) {
        const error = new Error('Maximum 6 featured products allowed on the home page. Please remove one before adding another.');
        error.statusCode = 400;
        throw error;
      }
    }

    return await productModel.update(id, updatedData);
  },

  async deleteProduct(id) {
    const success = await productModel.delete(id);
    if (!success) {
      const error = new Error('Product not found or could not be deleted');
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
};
