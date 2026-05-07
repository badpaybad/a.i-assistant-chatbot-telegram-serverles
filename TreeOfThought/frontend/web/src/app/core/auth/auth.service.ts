import { Injectable, inject } from '@angular/core';
import { HttpClientService } from '../http/http-client.service';
import { FirebaseService } from '../firebase/firebase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ALL_PERMISSIONS, PERMISSIONS_VERSION } from './permissions.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClientService);
  private firebase = inject(FirebaseService);
  private router = inject(Router);

  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$ = this.authStatusSubject.asObservable();

  currentUser$ = this.firebase.user$;

  constructor() {
    if (this.hasToken()) {
      this.syncPermissions();
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
    
    // Sync permissions immediately after login
    await this.syncPermissions();
  }

  async logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('permissions');
    this.authStatusSubject.next(false);
    await this.firebase.logout();
    this.router.navigate(['/auth/login']);
  }

  async syncPermissions() {
    try {
      // Check if we need to sync local permissions to BE
      const localVersion = localStorage.getItem('permissions_version');
      if (localVersion !== PERMISSIONS_VERSION) {
        await this.http.post('/api/auth/permissions/sync', { 
          version: PERMISSIONS_VERSION,
          permissions: ALL_PERMISSIONS 
        });
        localStorage.setItem('permissions_version', PERMISSIONS_VERSION);
      }

      const response = await this.http.get('/api/auth/me');
      const { claims } = response;
      localStorage.setItem('permissions', JSON.stringify(claims));
    } catch (e) {
      console.error('Failed to sync permissions', e);
    }
  }

  hasPermission(permission: string): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.includes(permission) || permissions.includes('admin');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
