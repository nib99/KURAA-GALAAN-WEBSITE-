// lib/api.js
const API_BASE_URL = 'https://kuraagalaan-charity-backend.onrender.com';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // ===== DONATION METHODS =====
  async createDonation(donationData) {
    return this.request('/api/donation/create', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  async getDonationHistory(userId) {
    return this.request(`/api/donation/history${userId ? `?userId=${userId}` : ''}`);
  }

  async getDonationStats() {
    return this.request('/donation/stats');
  }

  async verifyPayment(paymentData) {
    return this.request('/api/donation/verify', {
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
        'Authorization': `Bearer ${token}`,
      },
    });
  }
    // ===== USER METHODS =====
  async getUsers(token) {
    return this.request('/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getUser(userId, token) {
    return this.request(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateUser(userId, userData, token) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getAdminUsers(token) {
    return this.request('/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getAdminProducts(token) {
    return this.request('/admin/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  // ===== LEGACY PAYMENT METHODS (keeping for compatibility) =====
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

  // Analytics (admin only)
  async getAnalytics(token) {
    return this.request('/analytics', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export default new ApiService();
