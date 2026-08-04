import { newsService } from '../services/newsService.js';

export const newsController = {
  async getAll(req, res, next) {
    try {
      const articles = await newsService.getAllNews();
      res.status(200).json({ success: true, count: articles.length, data: articles });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const article = await newsService.getNewsById(req.params.id);
      res.status(200).json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const article = await newsService.createNews(req.body);
      res.status(201).json({ success: true, message: 'News article created', data: article });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const article = await newsService.updateNews(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'News article updated', data: article });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await newsService.deleteNews(req.params.id);
      res.status(200).json({ success: true, message: 'News article deleted' });
    } catch (error) {
      next(error);
    }
  }
};
