import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ALL_CLAIMS, CLAIMS_VERSION, ADMIN_CLAIM, ADMIN_ROLE } from './claims.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClientService);
  private firebase = inject(FirebaseService);
  private router = inject(Router);

  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  private claimsUpdatedSubject = new BehaviorSubject<void>(undefined);
  claimsUpdated$ = this.claimsUpdatedSubject.asObservable();

  private ssoCompleteSubject = new BehaviorSubject<boolean>(false);
  ssoComplete$ = this.ssoCompleteSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  user$ = this.firebase.user$;

  constructor() {
    const savedUser = this.getCurrentUser();
    if (savedUser) {
      this.currentUserSubject.next(savedUser);
    }

    if (this.hasToken()) {
      this.syncClaims();
    }
    this.handleRedirectCallback();
  }

  private async handleRedirectCallback() {
    try {
      const user = await this.firebase.handleRedirectResult();
      if (user) {
        console.log('[Auth] Redirect result found, completing SSO login...');
        const provider = localStorage.getItem('sso_provider') || 'unknown';
        await this.processSsoUser(provider, user);
        
        localStorage.removeItem('sso_provider');
        this.ssoCompleteSubject.next(true);
      }
    } catch (e) {
      console.error('[Auth] Error handling redirect callback', e);
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  async login(credentials: any) {
    let fcmToken: string | null = null;
    try {
      fcmToken = await this.firebase.getFCMToken();
    } catch (e) {
      console.warn('[Auth] Failed to get FCM token during login:', e);
    }

    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = 'web_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('device_id', deviceId);
    }

    let appType = 'admin';
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl');
      if (returnUrl) {
        let fullUrl = returnUrl;
        if (!returnUrl.startsWith('http')) {
          fullUrl = window.location.origin + (returnUrl.startsWith('/') ? '' : '/') + returnUrl;
        }
        const innerUrl = new URL(fullUrl);
        const innerParams = new URLSearchParams(innerUrl.search);
        const clientId = innerParams.get('client_id');
        if (clientId === 'my_pc_assistant') {
          appType = 'mobi android';
        }
      }
    } catch (e) {
      console.warn('[Auth] Failed to parse returnUrl for appType:', e);
    }

    const payload = {
      ...credentials,
      fcmToken: fcmToken || null,
      deviceId: deviceId,
      appType: appType
    };

    const response = await this.http.post('/api/auth/login', payload);
    const { token, firebaseToken } = response;
    await this.saveSession(token, firebaseToken);
    return response;
  }

  async signup(data: any) {
    const response = await this.http.post('/api/auth/signup', data);
    return response;
  }

  async ssoLogin(provider: string): Promise<boolean> {
    localStorage.setItem('sso_provider', provider);
    
    let user;
    switch (provider) {
      case 'google': user = await this.firebase.loginWithGoogle(); break;
      case 'facebook': user = await this.firebase.loginWithFacebook(); break;
      case 'ms': user = await this.firebase.loginWithMicrosoft(); break;
      default: throw new Error('Unsupported provider');
    }
    
    if (user) {
      await this.processSsoUser(provider, user);
      localStorage.removeItem('sso_provider');
      return true;
    }
    return false;
  }

  private async processSsoUser(provider: string, user: any) {
    const idToken = await user.getIdToken();
    const response = await this.http.post('/api/auth/sso', {
      provider,
      idToken,
      ssoId: user.uid,
      email: user.email,
      displayName: user.displayName
    });

    const { token, firebaseToken } = response;
    await this.saveSession(token, firebaseToken);
    return response;
  }

  private async saveSession(token: string, firebaseToken: string) {
    localStorage.setItem('jwt_token', token);
    this.authStatusSubject.next(true);

    if (firebaseToken) {
      await this.firebase.loginWithCustomToken(firebaseToken);
    }
    
    await this.syncClaims();
  }

  async logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('claims');
    localStorage.removeItem('roles');
    localStorage.removeItem('user_profile');
    this.authStatusSubject.next(false);
    this.currentUserSubject.next(null);
    this.claimsUpdatedSubject.next();
    await this.firebase.logout();
    this.router.navigate(['/auth/login']);
  }

  async syncClaims() {
    try {
      const localVersion = localStorage.getItem('claims_version');
      if (localVersion !== CLAIMS_VERSION) {
        await this.http.post('/api/auth/claims/sync', { 
          version: CLAIMS_VERSION,
          claims: ALL_CLAIMS 
        });
        localStorage.setItem('claims_version', CLAIMS_VERSION);
      }

      const response = await this.http.get('/api/auth/me');
      const claims = response.claims || response.permissions || response.Claims || response.Permissions || [];
      const roles = response.roles || response.Roles || [];
      localStorage.setItem('claims', JSON.stringify(claims));
      localStorage.setItem('roles', JSON.stringify(roles));
      localStorage.setItem('user_profile', JSON.stringify(response));
      
      this.currentUserSubject.next(response);
      this.claimsUpdatedSubject.next();

    } catch (e: any) {
      console.error('Failed to sync claims', e);
      if (e.status === 404 || e.status === 401) {
        await this.logout();
      }
    }
  }

  hasClaim(claimOrClaims: string | string[], mode: 'OR' | 'AND' = 'OR'): boolean {
    const rawClaims = localStorage.getItem('claims');
    const rawRoles = localStorage.getItem('roles');
    
    try {
      const userClaims: string[] = rawClaims && rawClaims !== 'undefined' ? JSON.parse(rawClaims) : [];
      const userRoles: string[] = rawRoles && rawRoles !== 'undefined' ? JSON.parse(rawRoles) : [];
      
      if (!Array.isArray(userClaims) && !Array.isArray(userRoles)) return false;

      const isAdmin = userRoles.some(r => r.toLowerCase() === ADMIN_ROLE.toLowerCase()) || 
                      userClaims.some(c => c.toLowerCase() === ADMIN_CLAIM.toLowerCase());
      
      if (isAdmin) return true;

      const claimsToCheck = Array.isArray(claimOrClaims) 
        ? claimOrClaims.filter(c => !!c) 
        : (claimOrClaims ? [claimOrClaims] : []);

      if (claimsToCheck.length === 0) {
        return this.isLoggedIn();
      }
      
      if (mode === 'OR') {
        return claimsToCheck.some(c => userClaims.includes(c));
      } else {
        return claimsToCheck.every(c => userClaims.includes(c));
      }
    } catch (e) {
      console.error('Error parsing claims/roles from localStorage', e);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user_profile');
    return user ? JSON.parse(user) : null;
  }
}
