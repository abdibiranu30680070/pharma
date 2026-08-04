import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Anonymous Client',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      default: 'General Inquiry / Wholesale Request',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
    },
    quantity: {
      type: Number,
      default: null,
    },
    productName: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Resolved'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

export const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
