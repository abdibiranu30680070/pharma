import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Prescription Medicines',
        'Over-the-Counter Medicines',
        'Medical Supplies',
        'Laboratory Supplies',
        'Hospital Equipment',
      ],
    },
    icon: {
      type: String,
      default: 'Pill',
    },
    description: {
      type: String,
      default: '',
    },
    usages: [{
      type: String,
    }],
    specs: {
      type: String,
      default: '',
    },
    precautions: {
      type: String,
      default: '',
    },
    sku: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: '/products/prod1.jpg',
    },
    showOnHome: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
