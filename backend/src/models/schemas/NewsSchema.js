import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    category: {
      type: String,
      default: 'Company News',
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    },
    readTime: {
      type: String,
      default: '3 min read',
    },
    author: {
      type: String,
      default: 'Pharmakon Team',
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '/products/prod1.jpg',
    },
    content: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

export const News = mongoose.models.News || mongoose.model('News', newsSchema);
