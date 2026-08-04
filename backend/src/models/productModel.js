import mongoose from 'mongoose';
import fs from 'fs/promises';
import { Product } from './schemas/ProductSchema.js';
import { config } from '../config/config.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const productModel = {
  async getAll() {
    if (isMongoConnected()) {
      const items = await Product.find().sort({ createdAt: -1 }).lean();
      return items.map((p) => ({ ...p, id: p._id.toString() }));
    }
    const data = await fs.readFile(config.productsFilePath, 'utf-8');
    return JSON.parse(data);
  },

  async findById(id) {
    if (isMongoConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const item = await Product.findById(id).lean();
        if (item) return { ...item, id: item._id.toString() };
      }
      const itemByName = await Product.findOne({ name: new RegExp(`^${id}$`, 'i') }).lean();
      if (itemByName) return { ...itemByName, id: itemByName._id.toString() };
      return null;
    }

    const products = await this.getAll();
    return products.find((p) => p.id === id || p.name.toLowerCase() === id.toLowerCase());
  },

  async getFeatured(limit = 6) {
    if (isMongoConnected()) {
      const items = await Product.find({ showOnHome: true }).limit(limit).lean();
      return items.map((p) => ({ ...p, id: p._id.toString() }));
    }
    const products = await this.getAll();
    const featured = products.filter((p) => p.showOnHome === true);
    return featured.slice(0, limit);
  },

  async create(productData) {
    if (isMongoConnected()) {
      const created = await Product.create(productData);
      const obj = created.toObject();
      return { ...obj, id: obj._id.toString() };
    }

    const products = await this.getAll();
    const newProduct = {
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...productData,
    };

    products.unshift(newProduct);
    await fs.writeFile(config.productsFilePath, JSON.stringify(products, null, 2));
    return newProduct;
  },

  async update(id, updateData) {
    if (isMongoConnected()) {
      let doc = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        doc = await Product.findByIdAndUpdate(id, updateData, { new: true }).lean();
      } else {
        doc = await Product.findOneAndUpdate({ name: new RegExp(`^${id}$`, 'i') }, updateData, { new: true }).lean();
      }
      if (!doc) return null;
      return { ...doc, id: doc._id.toString() };
    }

    const products = await this.getAll();
    const index = products.findIndex((p) => p.id === id || p.name.toLowerCase() === id.toLowerCase());
    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(config.productsFilePath, JSON.stringify(products, null, 2));
    return products[index];
  },

  async delete(id) {
    if (isMongoConnected()) {
      let res = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        res = await Product.findByIdAndDelete(id);
      } else {
        res = await Product.findOneAndDelete({ name: new RegExp(`^${id}$`, 'i') });
      }
      return Boolean(res);
    }

    const products = await this.getAll();
    const filtered = products.filter((p) => p.id !== id && p.name.toLowerCase() !== id.toLowerCase());
    if (filtered.length === products.length) return false;

    await fs.writeFile(config.productsFilePath, JSON.stringify(filtered, null, 2));
    return true;
  }
};
