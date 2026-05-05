import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000/api';

export interface AuthResponse {
  token: string;
  firebaseToken: string;
  claims: string[];
}

export const authService = {
  async login(credentials: any): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    const data = response.data;
    this.saveAuthData(data);
    return data;
  },

  async loginWithSSO(provider: string, idToken: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/sso`, { provider, idToken });
    const data = response.data;
    this.saveAuthData(data);
    return data;
  },

  async signup(data: any) {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  },

  async syncPermissions(permissions: string[]) {
    const token = this.getToken();
    if (!token) return;
    
    await axios.post(`${API_BASE_URL}/auth/sync-permissions`, { permissions }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  saveAuthData(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('firebaseToken', data.firebaseToken);
    localStorage.setItem('claims', JSON.stringify(data.claims));
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getFirebaseToken() {
    return localStorage.getItem('firebaseToken');
  },

  getClaims(): string[] {
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
