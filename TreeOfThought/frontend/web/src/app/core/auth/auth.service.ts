import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ALL_CLAIMS, CLAIMS_VERSION, ADMIN_CLAIM } from './claims.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClientService);
  private firebase = inject(FirebaseService);
  private router = inject(Router);

  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  user$ = this.firebase.user$;

  constructor() {
    if (this.hasToken()) {
      this.syncClaims();
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  async login(credentials: any) {
    const response = await this.http.post('/api/auth/login', credentials);
    const { token, firebaseToken } = response;
    this.saveSession(token, firebaseToken);
    return response;
  }

  async signup(data: any) {
    const response = await this.http.post('/api/auth/signup', data);
    return response;
  }

  async ssoLogin(provider: string) {
    let user;
    switch (provider) {
      case 'google': user = await this.firebase.loginWithGoogle(); break;
      case 'facebook': user = await this.firebase.loginWithFacebook(); break;
      case 'ms': user = await this.firebase.loginWithMicrosoft(); break;
      default: throw new Error('Unsupported provider');
    }

    const idToken = await user.getIdToken();
    const response = await this.http.post('/api/auth/sso', {
      provider,
      idToken,
      ssoId: user.uid,
      email: user.email,
      displayName: user.displayName
    });

    const { token, firebaseToken } = response;
    this.saveSession(token, firebaseToken);
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
    this.authStatusSubject.next(false);
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
      const claims = response.claims || response.Claims || [];
      localStorage.setItem('claims', JSON.stringify(claims));
    } catch (e: any) {
      console.error('Failed to sync claims', e);
      // If we get a 404 or 401, it means our session/user is invalid
      if (e.status === 404 || e.status === 401) {
        await this.logout();
      }
    }
  }

  hasClaim(claim: string): boolean {
    const rawClaims = localStorage.getItem('claims');
    if (!rawClaims || rawClaims === 'undefined') return false;
    
    try {
      const claims = JSON.parse(rawClaims);
      if (!Array.isArray(claims)) return false;
      return claims.includes(claim) || claims.includes(ADMIN_CLAIM);
    } catch (e) {
      console.error('Error parsing claims from localStorage', e);
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
