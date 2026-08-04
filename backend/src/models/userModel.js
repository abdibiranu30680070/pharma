import mongoose from 'mongoose';
import fs from 'fs/promises';
import { User } from './schemas/UserSchema.js';
import { config } from '../config/config.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const userModel = {
  async getAll() {
    if (isMongoConnected()) {
      return await User.find().lean();
    }
    const data = await fs.readFile(config.usersFilePath, 'utf-8');
    return JSON.parse(data);
  },

  async findByEmail(email) {
    if (isMongoConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() }).lean();
      if (user) user.id = user._id.toString();
      return user;
    }
    const users = await this.getAll();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  async findById(id) {
    if (isMongoConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) return null;
      const user = await User.findById(id).lean();
      if (user) user.id = user._id.toString();
      return user;
    }
    const users = await this.getAll();
    return users.find((u) => u.id === id);
  },

  async saveRefreshToken(userId, token) {
    if (isMongoConnected()) {
      await User.findByIdAndUpdate(userId, { $push: { refreshTokens: token } });
      return;
    }
    const users = await this.getAll();
    const user = users.find((u) => u.id === userId);
    if (user) {
      if (!user.refreshTokens) user.refreshTokens = [];
      user.refreshTokens.push(token);
      await fs.writeFile(config.usersFilePath, JSON.stringify(users, null, 2));
    }
  },

  async removeRefreshToken(userId, token) {
    if (isMongoConnected()) {
      await User.findByIdAndUpdate(userId, { $pull: { refreshTokens: token } });
      return;
    }
    const users = await this.getAll();
    const user = users.find((u) => u.id === userId);
    if (user && user.refreshTokens) {
      user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
      await fs.writeFile(config.usersFilePath, JSON.stringify(users, null, 2));
    }
  },

  async verifyRefreshToken(userId, token) {
    const user = await this.findById(userId);
    return user && user.refreshTokens && user.refreshTokens.includes(token);
  }
};
