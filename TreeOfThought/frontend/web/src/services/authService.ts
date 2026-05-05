import httpClient from '../utils/httpClient';
import { API_CONFIG } from '../config/apiConfig';

export interface AuthResponse {
  token: string;
  firebaseToken: string;
  claims: string[];
  username?: string;
  email?: string;
}

export const authService = {
  async login(credentials: any): Promise<AuthResponse> {
    const response = await httpClient.post(`/auth/login`, credentials);
    const data = response.data;
    // Fallback to credentials if backend doesn't return username/email
    if (!data.username) data.username = credentials.username;
    this.saveAuthData(data);
    return data;
  },

  async loginWithSSO(provider: string, idToken: string, extraInfo?: any): Promise<AuthResponse> {
    const response = await httpClient.post(`/auth/sso`, { provider, idToken });
    const data = response.data;
    // Fallback to extra info if backend doesn't return username/email
    if (!data.username && extraInfo?.username) data.username = extraInfo.username;
    if (!data.email && extraInfo?.email) data.email = extraInfo.email;
    this.saveAuthData(data);
    return data;
  },

  async signup(data: any) {
    const response = await httpClient.post(`/auth/signup`, data);
    return response.data;
  },

  async syncPermissions(permissions: string[]) {
    await httpClient.post(`/auth/sync-permissions`, { permissions });
  },

  saveAuthData(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('firebaseToken', data.firebaseToken);
    localStorage.setItem('claims', JSON.stringify(data.claims));
    if (data.username) localStorage.setItem('username', data.username);
    if (data.email) localStorage.setItem('email', data.email);
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

  getUserInfo() {
    return {
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    };
  },

  hasPermission(permission: string) {
    const claims = this.getClaims();
    return claims.includes(permission);
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('claims');
    localStorage.removeItem('firebaseToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }
};
