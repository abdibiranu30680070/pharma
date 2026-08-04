import bcryptModule from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from '../models/userModel.js';
import { config } from '../config/config.js';

const bcrypt = bcryptModule.default || bcryptModule;

export const authService = {
  generateTokens(user) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtAccessSecret,
      { expiresIn: config.jwtAccessExpiration }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwtRefreshSecret,
      { expiresIn: config.jwtRefreshExpiration }
    );

    return { accessToken, refreshToken };
  },

  async login(email, password) {
    const user = await userModel.findByEmail(email);
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const tokens = this.generateTokens(user);
    await userModel.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      ...tokens,
    };
  },

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      const error = new Error('Refresh token is required');
      error.statusCode = 400;
      throw error;
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, config.jwtRefreshSecret);
    } catch {
      const error = new Error('Invalid or expired refresh token');
      error.statusCode = 403;
      throw error;
    }

    const isStored = await userModel.verifyRefreshToken(decoded.id, refreshToken);
    if (!isStored) {
      const error = new Error('Refresh token revoked or invalid');
      error.statusCode = 403;
      throw error;
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtAccessSecret,
      { expiresIn: config.jwtAccessExpiration }
    );

    return { accessToken: newAccessToken };
  },

  async logout(userId, refreshToken) {
    if (userId && refreshToken) {
      await userModel.removeRefreshToken(userId, refreshToken);
    }
    return true;
  }
};
