import { inquiryService } from '../services/inquiryService.js';

export const inquiryController = {
  async getAll(req, res, next) {
    try {
      const items = await inquiryService.getAllInquiries();
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const item = await inquiryService.createInquiry(req.body);
      res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: item });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const item = await inquiryService.updateStatus(req.params.id, req.body.status);
      res.status(200).json({ success: true, message: 'Inquiry status updated', data: item });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await inquiryService.deleteInquiry(req.params.id);
      res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};
