import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  async login(credentials: any) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    const { token, firebaseToken, claims } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('claims', JSON.stringify(claims));
    
    return { token, firebaseToken, claims };
  },

  async signup(data: any) {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getClaims() {
    const claims = localStorage.getItem('claims');
    return claims ? JSON.parse(claims) : [];
  },

  hasPermission(permission: string) {
    const claims = this.getClaims();
    return claims.includes(permission);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('claims');
    localStorage.removeItem('firebaseToken');
  }
};
