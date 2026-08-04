export const formatImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('/uploads')) {
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    return `${baseUrl}${imagePath}`;
  }
  return imagePath;
};
