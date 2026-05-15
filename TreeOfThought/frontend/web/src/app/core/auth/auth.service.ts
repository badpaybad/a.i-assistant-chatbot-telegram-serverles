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
        
        // Clear the pending provider
        localStorage.removeItem('sso_provider');
        
        // Notify any listeners or components if needed
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
    const response = await this.http.post('/api/auth/login', credentials);
    const { token, firebaseToken } = response;
    await this.saveSession(token, firebaseToken);
    return response;
  }

  async signup(data: any) {
    const response = await this.http.post('/api/auth/signup', data);
    return response;
  }

  async ssoLogin(provider: string): Promise<boolean> {
    // Store provider to know how to process when returning from redirect
    localStorage.setItem('sso_provider', provider);
    
    let user;
    switch (provider) {
      case 'google': user = await this.firebase.loginWithGoogle(); break;
      case 'facebook': user = await this.firebase.loginWithFacebook(); break;
      case 'ms': user = await this.firebase.loginWithMicrosoft(); break;
      default: throw new Error('Unsupported provider');
    }
    
    if (user) {
      // If we got a user back immediately (Popup mode on Desktop)
      await this.processSsoUser(provider, user);
      localStorage.removeItem('sso_provider');
      return true;
    }
    return false;
    // If user is null, it means we are in redirect mode (Mobile) and execution stops here
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
      // If we got a custom token from backend, login with it to sync
      await this.firebase.loginWithCustomToken(firebaseToken);
    }
    
    // Sync claims immediately after login
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
      // Check if we need to sync local claims to BE
      const localVersion = localStorage.getItem('claims_version');
      if (localVersion !== CLAIMS_VERSION) {
        await this.http.post('/api/auth/claims/sync', { 
          version: CLAIMS_VERSION,
          claims: ALL_CLAIMS 
        });
        localStorage.setItem('claims_version', CLAIMS_VERSION);
      }

      const response = await this.http.get('/api/auth/me');
      // Support both camelCase and PascalCase from backend
      const claims = response.claims || response.permissions || response.Claims || response.Permissions || [];
      const roles = response.roles || response.Roles || [];
      localStorage.setItem('claims', JSON.stringify(claims));
      localStorage.setItem('roles', JSON.stringify(roles));
      localStorage.setItem('user_profile', JSON.stringify(response));
      
      this.currentUserSubject.next(response);
      this.claimsUpdatedSubject.next();

    } catch (e: any) {
      console.error('Failed to sync claims', e);
      // If we get a 404 or 401, it means our session/user is invalid
      if (e.status === 404 || e.status === 401) {
        await this.logout();
      }
    }
  }

  hasClaim(claimOrClaims: string | string[], mode: 'OR' | 'AND' = 'OR'): boolean {
    const rawClaims = localStorage.getItem('claims');
    const rawRoles = localStorage.getItem('roles');
    
    // Even if claims are missing, we should still allow role check if roles are present
    // if (!rawClaims || rawClaims === 'undefined') return false;
    
    try {
      const userClaims: string[] = rawClaims && rawClaims !== 'undefined' ? JSON.parse(rawClaims) : [];
      const userRoles: string[] = rawRoles && rawRoles !== 'undefined' ? JSON.parse(rawRoles) : [];
      
      if (!Array.isArray(userClaims) && !Array.isArray(userRoles)) return false;

      // Admin bypass (Check both Role and Claim for consistency with BE)
      // Use case-insensitive check for Admin role/claim
      const isAdmin = userRoles.some(r => r.toLowerCase() === ADMIN_ROLE.toLowerCase()) || 
                      userClaims.some(c => c.toLowerCase() === ADMIN_CLAIM.toLowerCase());
      
      if (isAdmin) return true;

      // Handle empty check (logged in only)
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
