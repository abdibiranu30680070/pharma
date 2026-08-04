import { newsModel } from '../models/newsModel.js';

export const newsService = {
  async getAllNews() {
    return await newsModel.getAll();
  },

  async getNewsById(id) {
    const article = await newsModel.findById(id);
    if (!article) {
      const error = new Error('News article not found');
      error.statusCode = 404;
      throw error;
    }
    return article;
  },

  async createNews(data) {
    if (!data.title || !data.description) {
      const error = new Error('Title and description are required');
      error.statusCode = 400;
      throw error;
    }
    const newArticle = {
      title: data.title,
      category: data.category || 'Company News',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: data.readTime || '3 min read',
      author: data.author || 'Pharmakon Team',
      description: data.description,
      image: data.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      content: Array.isArray(data.content) ? data.content : (data.content ? [data.content] : [data.description]),
    };
    return await newsModel.create(newArticle);
  },

  async updateNews(id, data) {
    const article = await newsModel.update(id, data);
    if (!article) {
      const error = new Error('News article not found');
      error.statusCode = 404;
      throw error;
    }
    return article;
  },

  async deleteNews(id) {
    const success = await newsModel.delete(id);
    if (!success) {
      const error = new Error('News article not found');
      error.statusCode = 404;
      throw error;
    }
    return true;
  }
};
