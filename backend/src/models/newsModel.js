import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { News } from './schemas/NewsSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const newsFilePath = path.join(__dirname, '../data/news.json');

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const newsModel = {
  async getAll() {
    if (isMongoConnected()) {
      const items = await News.find().sort({ createdAt: -1 }).lean();
      return items.map((n) => ({ ...n, id: n._id.toString() }));
    }
    const data = await fs.readFile(newsFilePath, 'utf-8');
    return JSON.parse(data);
  },

  async findById(id) {
    if (isMongoConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const item = await News.findById(id).lean();
        if (item) return { ...item, id: item._id.toString() };
      }
      const itemByTitle = await News.findOne({ title: new RegExp(`^${id}$`, 'i') }).lean();
      if (itemByTitle) return { ...itemByTitle, id: itemByTitle._id.toString() };
      return null;
    }
    const news = await this.getAll();
    return news.find((n) => n.id === id || n.title.toLowerCase() === id.toLowerCase());
  },

  async create(newsData) {
    if (isMongoConnected()) {
      const created = await News.create(newsData);
      const obj = created.toObject();
      return { ...obj, id: obj._id.toString() };
    }
    const news = await this.getAll();
    const newArticle = {
      id: `news-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...newsData,
    };
    news.unshift(newArticle);
    await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
    return newArticle;
  },

  async update(id, updateData) {
    if (isMongoConnected()) {
      let doc = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        doc = await News.findByIdAndUpdate(id, updateData, { new: true }).lean();
      }
      if (!doc) return null;
      return { ...doc, id: doc._id.toString() };
    }
    const news = await this.getAll();
    const index = news.findIndex((n) => n.id === id);
    if (index === -1) return null;
    news[index] = { ...news[index], ...updateData };
    await fs.writeFile(newsFilePath, JSON.stringify(news, null, 2));
    return news[index];
  },

  async delete(id) {
    if (isMongoConnected()) {
      let res = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        res = await News.findByIdAndDelete(id);
      }
      return Boolean(res);
    }
    const news = await this.getAll();
    const filtered = news.filter((n) => n.id !== id);
    if (filtered.length === news.length) return false;
    await fs.writeFile(newsFilePath, JSON.stringify(filtered, null, 2));
    return true;
  }
};
