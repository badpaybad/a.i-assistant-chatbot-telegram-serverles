import { Injectable, inject } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithCustomToken,
  onAuthStateChanged,
  User,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { getFirestore, Firestore, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { getMessaging, Messaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { BehaviorSubject } from 'rxjs';
import { FIREBASE_CONFIG } from '../tokens/firebase-config.token';

export const FIRESTORE_NOTIFY_PATH_PREFIX = 'commandresults';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app: FirebaseApp;
  private auth: Auth;
  private db: Firestore;
  private messaging?: Messaging;
  private config = inject(FIREBASE_CONFIG);

  private firebaseUserSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.firebaseUserSubject.asObservable();

  constructor() {
    this.app = initializeApp(this.config);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.initMessaging();

    onAuthStateChanged(this.auth, (user) => {
      this.firebaseUserSubject.next(user);
    });
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  private async initMessaging() {
    try {
      if (await isSupported()) {
        this.messaging = getMessaging(this.app);
      } else {
        console.warn('Firebase Messaging not supported in this browser/context');
      }
    } catch (e) {
      console.warn('Error checking for Firebase Messaging support', e);
    }
  }

  async loginWithGoogle() {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    if (this.isMobile()) {
      await signInWithRedirect(this.auth, provider);
      return null;
    } else {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    }
  }

  async loginWithFacebook() {
    const { FacebookAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new FacebookAuthProvider();
    if (this.isMobile()) {
      await signInWithRedirect(this.auth, provider);
      return null;
    } else {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    }
  }

  async loginWithMicrosoft() {
    const { OAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new OAuthProvider('microsoft.com');
    if (this.isMobile()) {
      await signInWithRedirect(this.auth, provider);
      return null;
    } else {
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    }
  }

  async loginWithCustomToken(token: string) {
    try {
      const userCredential = await signInWithCustomToken(this.auth, token);
      return userCredential.user;
    } catch (error) {
      console.error('Firebase custom token login failed', error);
      throw error;
    }
  }

  async handleRedirectResult() {
    try {
      const result = await getRedirectResult(this.auth);
      return result?.user;
    } catch (error) {
      console.error('Firebase redirect login failed', error);
      throw error;
    }
  }

  async logout() {
    await this.auth.signOut();
  }

  subscribeToRequestId(requestId: string, callback: (data: any) => void) {
    return this.subscribeOnce(requestId, callback);
  }

  subscribeOnce(requestId: string, callback: (data: any) => void) {
    const docRef = doc(this.db, FIRESTORE_NOTIFY_PATH_PREFIX, requestId);
    const unsubscribe = onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        try {
          // Thực hiện logic
          const data = snapshot.data();
          callback(data);

          // Stop listening immediately after receiving data
          unsubscribe();
        } catch (error) {
          console.error('Xử lý lỗi nếu có:', error);
        } finally {
          try {
            // Cleanup Firestore record
            await deleteDoc(docRef);
          } catch (e) {
            console.error('Failed to delete Firestore document after receipt', e);
          }
        }
      }
    });
    return unsubscribe;
  }

  async getFCMToken(): Promise<string | null> {
    if (!this.messaging) return null;
    try {
      if ('serviceWorker' in navigator) {
        const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
        const swPath = `${baseHref}firebase-messaging-sw.js`.replace('//', '/');

        const registration = await navigator.serviceWorker.register(swPath, {
          scope: baseHref,
        });

        if (!registration.active) {
          await new Promise<void>((resolve) => {
            const worker = registration.installing || registration.waiting;
            if (worker) {
              worker.addEventListener('statechange', (e: any) => {
                if (e.target.state === 'activated') {
                  resolve();
                }
              });
            } else {
              resolve();
            }
          });
        }

        const token = await getToken(this.messaging, {
          vapidKey: this.config.vapidKey,
          serviceWorkerRegistration: registration,
        });
        return token;
      }

      const token = await getToken(this.messaging, { vapidKey: this.config.vapidKey });
      return token;
    } catch (error) {
      console.error('Failed to get FCM token', error);
      return null;
    }
  }

  onMessageReceived(callback: (payload: any) => void) {
    if (!this.messaging) return;
    onMessage(this.messaging, (payload) => {
      callback(payload);
    });
  }
}
