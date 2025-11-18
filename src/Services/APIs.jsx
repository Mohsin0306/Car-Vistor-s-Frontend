const API_BASE_URL = 'https://car-vistor-s-backend-production.up.railway.app/api';

// Auth APIs
export const authAPI = {
  // Register User
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login User
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

// VIN Decode API
export const vinAPI = {
  decode: async (vin) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vin/decode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vin }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'VIN decode failed');
      }
      
      return data;
    } catch (error) {
      console.error('VIN decode error:', error);
      throw error;
    }
  }
};

// VIN Request APIs
export const requestAPI = {
  create: async ({ vin, userEmail }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vin, userEmail }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to create VIN request');
      }

      return data;
    } catch (error) {
      console.error('Create VIN request error:', error);
      throw error;
    }
  },

  getByUser: async ({ email, page = 1, limit = 10 }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests/all/${encodeURIComponent(email)}?page=${page}&limit=${limit}`);
      
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, return empty data instead of throwing error
        return { success: true, data: { requests: [] } };
      }
      
      const data = await response.json();
      if (!response.ok || data.success === false) {
        // Return empty array instead of throwing error
        return { success: true, data: { requests: [] } };
      }
      return data;
    } catch (error) {
      console.error('Fetch user requests error:', error);
      // Return empty data instead of throwing error
      return { success: true, data: { requests: [] } };
    }
  },

  // Admin APIs
  getAll: async ({ page = 1, limit = 10, status, search }) => {
    try {
      const token = localStorage.getItem('token');
      let url = `${API_BASE_URL}/requests/all?page=${page}&limit=${limit}`;
      
      if (status && status !== 'all') {
        url += `&status=${status}`;
      }
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch requests');
      }
      return data;
    } catch (error) {
      console.error('Fetch all requests error:', error);
      throw error;
    }
  },

  updateStatus: async ({ requestId, status }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/requests/${requestId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to update request status');
      }
      return data;
    } catch (error) {
      console.error('Update request status error:', error);
      throw error;
    }
  },

  getById: async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch request details');
      }
      return data;
    } catch (error) {
      console.error('Get request by ID error:', error);
      throw error;
    }
  }
};

// Notification APIs
export const notificationAPI = {
  getByUser: async ({ userId, email, type = 'user' }) => {
    try {
      let url = `${API_BASE_URL}/notifications/user`;
      
      // For admin type, always use email query parameter, not userId in path
      if (type === 'admin') {
        if (!email) {
          throw new Error('Email is required for admin notifications');
        }
        url += `?email=${encodeURIComponent(email)}&type=admin`;
      } else {
        // For user type, use userId in path if available, otherwise email in query
        if (userId) {
          url += `/${userId}`;
        } else if (email) {
          url += `?email=${encodeURIComponent(email)}`;
        }
      }

      const response = await fetch(url);
      
      // Handle 502 Bad Gateway and other server errors
      if (response.status === 502 || response.status === 503 || response.status === 504) {
        console.error('Server error:', response.status);
        return { success: false, notifications: [] };
      }
      
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { success: false, notifications: [] };
      }
      
      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch notifications');
      }
      return data;
    } catch (error) {
      console.error('Fetch notifications error:', error);
      return { success: false, notifications: [] };
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to update notification');
      }
      return data;
    } catch (error) {
      console.error('Mark notification read error:', error);
      throw error;
    }
  },

  markAllAsRead: async ({ userId, email, type = 'user' }) => {
    try {
      let url = `${API_BASE_URL}/notifications/user`;
      
      // For admin type, always use email query parameter
      if (type === 'admin') {
        if (!email) {
          throw new Error('Email is required for admin notifications');
        }
        url += `/read-all?email=${encodeURIComponent(email)}&type=admin`;
      } else {
        // For user type, use userId in path if available, otherwise email in query
        if (userId) {
          url += `/${userId}/read-all`;
        } else {
          url += `/read-all`;
          if (email) {
            url += `?email=${encodeURIComponent(email)}`;
          }
        }
      }

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { success: true, message: 'Marked all as read' };
      }

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to update notifications');
      }
      return data;
    } catch (error) {
      console.error('Mark all notifications read error:', error);
      return { success: true, message: 'Marked all as read' };
    }
  },

  create: async ({ userId, email, title, message, type, link, metadata, recipientType = 'user' }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, email, title, message, type, link, metadata, recipientType }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to create notification');
      }
      return data;
    } catch (error) {
      console.error('Create notification error:', error);
      throw error;
    }
  },
};

// User APIs (Admin only)
export const userAPI = {
  getAll: async ({ page = 1, limit = 100, search }) => {
    try {
      const token = localStorage.getItem('token');
      let url = `${API_BASE_URL}/users/all?page=${page}&limit=${limit}`;
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch users');
      }
      return data;
    } catch (error) {
      console.error('Fetch users error:', error);
      throw error;
    }
  },

  getById: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch user details');
      }
      return data;
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }
};

// Report APIs (Admin only)
export const reportAPI = {
  decode: async (vin, decodedBy) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/reports/decode`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vin, decodedBy }),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to decode VIN');
      }
      return data;
    } catch (error) {
      console.error('VIN decode error:', error);
      throw error;
    }
  },

  getAll: async ({ page = 1, limit = 100, search }) => {
    try {
      const token = localStorage.getItem('token');
      let url = `${API_BASE_URL}/reports/all?page=${page}&limit=${limit}`;
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch reports');
      }
      return data;
    } catch (error) {
      console.error('Fetch reports error:', error);
      throw error;
    }
  },

  getById: async (reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/reports/${reportId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch report details');
      }
      return data;
    } catch (error) {
      console.error('Get report by ID error:', error);
      throw error;
    }
  },

  getByVin: async (vin) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/reports/vin/${vin}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to fetch report');
      }
      return data;
    } catch (error) {
      console.error('Get report by VIN error:', error);
      throw error;
    }
  }
};
