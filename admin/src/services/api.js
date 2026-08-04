const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  getAccessToken() {
    return localStorage.getItem('pharmakon_access_token');
  },

  getRefreshToken() {
    return localStorage.getItem('pharmakon_refresh_token');
  },

  setTokens(accessToken, refreshToken) {
    if (accessToken) localStorage.setItem('pharmakon_access_token', accessToken);
    if (refreshToken) localStorage.setItem('pharmakon_refresh_token', refreshToken);
  },

  clearTokens() {
    localStorage.removeItem('pharmakon_access_token');
    localStorage.removeItem('pharmakon_refresh_token');
    localStorage.removeItem('pharmakon_admin_user');
  },

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = options.isFormData ? { ...options.headers } : {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401 && this.getRefreshToken()) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: this.getRefreshToken() }),
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          this.setTokens(refreshData.data.accessToken);

          headers['Authorization'] = `Bearer ${refreshData.data.accessToken}`;
          response = await fetch(url, { ...options, headers });
        } else {
          this.clearTokens();
          window.location.href = '/login';
          throw new Error('Session expired. Please log in again.');
        }
      } catch (err) {
        this.clearTokens();
        throw err;
      }
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'An API error occurred');
    }
    return data;
  },

  // Auth API
  login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout() {
    const refreshToken = this.getRefreshToken();
    this.request('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {});
    this.clearTokens();
  },

  // Products API
  getProducts(query = '') {
    return this.request(`/products${query ? '?' + query : ''}`);
  },

  getFeaturedProducts() {
    return this.request('/products/featured');
  },

  getProductById(id) {
    return this.request(`/products/${id}`);
  },

  uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    return this.request('/products/upload', {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  },

  createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  },

  // News API
  getNews() {
    return this.request('/news');
  },

  createNews(newsData) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  },

  updateNews(id, newsData) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  },

  deleteNews(id) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  },

  // Inquiries API
  getInquiries() {
    return this.request('/inquiries');
  },

  submitInquiry(inquiryData) {
    return this.request('/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  updateInquiryStatus(id, status) {
    return this.request(`/inquiries/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  deleteInquiry(id) {
    return this.request(`/inquiries/${id}`, {
      method: 'DELETE',
    });
  }
};
