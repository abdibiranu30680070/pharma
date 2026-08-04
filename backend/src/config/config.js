import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pharmakon',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'pharmakon_super_secret_access_key_2026',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'pharmakon_super_secret_refresh_key_2026',
  jwtAccessExpiration: '15m',
  jwtRefreshExpiration: '7d',
  productsFilePath: path.join(__dirname, '../data/products.json'),
  usersFilePath: path.join(__dirname, '../data/users.json'),
};
