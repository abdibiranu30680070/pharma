import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Inquiry } from './schemas/InquirySchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inquiriesFilePath = path.join(__dirname, '../data/inquiries.json');

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const inquiryModel = {
  async getAll() {
    if (isMongoConnected()) {
      const items = await Inquiry.find().sort({ createdAt: -1 }).lean();
      return items.map((i) => ({ ...i, id: i._id.toString() }));
    }
    try {
      const data = await fs.readFile(inquiriesFilePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  async create(inquiryData) {
    if (isMongoConnected()) {
      const created = await Inquiry.create(inquiryData);
      const obj = created.toObject();
      return { ...obj, id: obj._id.toString() };
    }
    const inquiries = await this.getAll();
    const newInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      ...inquiryData,
    };
    inquiries.unshift(newInquiry);
    await fs.writeFile(inquiriesFilePath, JSON.stringify(inquiries, null, 2));
    return newInquiry;
  },

  async updateStatus(id, status) {
    if (isMongoConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
        if (updated) return { ...updated, id: updated._id.toString() };
      }
      return null;
    }
    const inquiries = await this.getAll();
    const item = inquiries.find((i) => i.id === id);
    if (item) {
      item.status = status;
      await fs.writeFile(inquiriesFilePath, JSON.stringify(inquiries, null, 2));
      return item;
    }
    return null;
  },

  async delete(id) {
    if (isMongoConnected()) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const res = await Inquiry.findByIdAndDelete(id);
        return Boolean(res);
      }
      return false;
    }
    const inquiries = await this.getAll();
    const filtered = inquiries.filter((i) => i.id !== id);
    if (filtered.length === inquiries.length) return false;
    await fs.writeFile(inquiriesFilePath, JSON.stringify(filtered, null, 2));
    return true;
  }
};
