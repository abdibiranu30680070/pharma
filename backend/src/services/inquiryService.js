import { inquiryModel } from '../models/inquiryModel.js';

export const inquiryService = {
  async getAllInquiries() {
    return await inquiryModel.getAll();
  },

  async createInquiry(data) {
    if (!data.email || (!data.message && !data.productName)) {
      const error = new Error('Email and message or product name are required');
      error.statusCode = 400;
      throw error;
    }
    return await inquiryModel.create(data);
  },

  async updateStatus(id, status) {
    return await inquiryModel.updateStatus(id, status);
  },

  async deleteInquiry(id) {
    return await inquiryModel.delete(id);
  }
};
