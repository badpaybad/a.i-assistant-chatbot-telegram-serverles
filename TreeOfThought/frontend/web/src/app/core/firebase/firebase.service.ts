import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, signInWithCustomToken, onAuthStateChanged, User, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { getFirestore, Firestore, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { getMessaging, Messaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private auth: Auth;
  private db: Firestore;
  private messaging?: Messaging;
  
  private firebaseUserSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.firebaseUserSubject.asObservable();

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.initMessaging();
    
    onAuthStateChanged(this.auth, (user) => {
      this.firebaseUserSubject.next(user);
    });
  }

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private async initMessaging() {
    // Messaging only works in secure contexts (HTTPS) and supported browsers
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
    const docRef = doc(this.db, 'commandresults', requestId);
    return onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        callback(data);
        
        // Requirement: delete data after receive to avoid storage clutter
        try {
          await deleteDoc(docRef);
        } catch (e) {
          console.error('Failed to delete Firestore document after receipt', e);
        }
      }
    });
  }

  async getFCMToken(): Promise<string | null> {
    if (!this.messaging) return null;
    try {
      const token = await getToken(this.messaging, { vapidKey: environment.firebase.vapidKey });
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
