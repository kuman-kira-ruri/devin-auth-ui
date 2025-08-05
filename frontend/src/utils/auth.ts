const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
  id: number;
  email: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface DashboardResponse {
  message: string;
  user: {
    userId: number;
    email: string;
  };
}

export const authAPI = {
  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    return data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    return data;
  },

  async getDashboard(): Promise<DashboardResponse> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await fetch(`${API_URL}/api/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch dashboard');
    }
    
    return data;
  },
};

export const getToken = (): string | null => localStorage.getItem('token');
export const setToken = (token: string): void => localStorage.setItem('token', token);
export const removeToken = (): void => localStorage.removeItem('token');
export const isAuthenticated = (): boolean => !!getToken();
