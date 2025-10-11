// lib/api.js
const API_BASE_URL = 'https://kuraagalaan-charity-backend.onrender.com/api';

class ApiService {
  // Generic request handler with HTML-safe JSON parsing
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const res = await fetch(url, config);
      const text = await res.text();

      // Detect HTML response
      if (text.trim().startsWith('<')) {
        console.error('🚨 Received HTML instead of JSON:', text);
        return { success: false, message: 'Unexpected HTML response from server' };
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        console.error('❌ API Error:', data.message || res.statusText);
        return { success: false, message: data.message || 'Request failed' };
      }

      return data;
    } catch (error) {
      console.error('🚨 API Request failed:', error);
      return { success: false, message: 'Network or server error' };
    }
  }

  // ===== DONATION METHODS =====
  async createDonation(donationData) {
    return this.request('/donation/create', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  async getDonationHistory(userId) {
    return this.request(`/donation/history${userId ? `?userId=${userId}` : ''}`);
  }

  async getDonationStats() {
    return this.request('/donation/stats');
  }

  async verifyPayment(paymentData) {
    return this.request('/donation/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // ===== CONTACT METHODS =====
  async sendContactMessage(messageData) {
    return this.request('/contact/send', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async getContactMessages(token) {
    return this.request('/contact/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // ===== USER METHODS =====
  async getUsers(token) {
    return this.request('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getUser(userId, token) {
    return this.request(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateUser(userId, userData, token) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // ===== AUTHENTICATION METHODS =====
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // ===== ADMIN METHODS =====
  async getAdminDashboard(token) {
    return this.request('/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getAdminUsers(token) {
    return this.request('/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getAdminProducts(token) {
    return this.request('/admin/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // ===== LEGACY PAYMENT METHODS =====
  async createPaymentIntent(amount, orderId) {
    return this.request('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount, orderId }),
    });
  }

  async processOrder(orderData) {
    return this.request('/process-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // ===== ANALYTICS =====
  async getAnalytics(token) {
    return this.request('/analytics', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new ApiService();
