
// lib/api.js
const API_BASE_URL = 'https://kuraagalaan-charity-backend.onrender.com/api';
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

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Payment methods
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
                
