import { productService } from '../services/productService.js';

export const productController = {
  async getAll(req, res, next) {
    try {
      const result = await productService.getAllProducts(req.query);
      res.status(200).json({
        success: true,
        count: result.products.length,
        pagination: result.pagination,
        data: result.products,
      });
    } catch (error) {
      next(error);
    }
  },

  async getFeatured(req, res, next) {
    try {
      const products = await productService.getFeaturedProducts();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },

  async uploadImage(req, res) {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    // Return relative path to be loaded directly by the frontend from its public folder
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl,
    });
  },

  async create(req, res, next) {
    try {
      const newProduct = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
};
