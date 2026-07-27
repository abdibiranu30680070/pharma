import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false, // Don't automatically serve index.html for directory requests
  setHeaders: (res, filePath) => {
    // Cache control for static assets
    if (filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.svg')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// Handle all other routes by serving index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
