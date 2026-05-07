import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithCustomToken, 
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  User, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirestore, doc, onSnapshot, deleteDoc, Unsubscribe } from 'firebase/firestore';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { BehaviorSubject } from 'rxjs';
import { firebaseConfig } from './firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private db = getFirestore(this.app);
  private messaging?: Messaging;
  private platformId = inject(PLATFORM_ID);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });

    if (isPlatformBrowser(this.platformId)) {
      try {
        this.messaging = getMessaging(this.app);
      } catch (e) {
        console.warn('Messaging not supported in this browser', e);
      }
    }
  }

  async loginWithCustomToken(token: string): Promise<User> {
    const userCredential = await signInWithCustomToken(this.auth, token);
    return userCredential.user;
  }

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  async loginWithFacebook(): Promise<User> {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  async loginWithMicrosoft(): Promise<User> {
    const provider = new OAuthProvider('microsoft.com');
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  subscribeToRequestId(requestId: string, callback: (data: any) => void): Unsubscribe {
    const docRef = doc(this.db, 'commandresults', requestId);
    return onSnapshot(docRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        callback(data);
        
        // Delete document after processing to avoid storage bloat as requested in yeucau.md
        try {
          await deleteDoc(docRef);
        } catch (e) {
          console.warn('Failed to delete command result document', e);
        }
      }
    });
  }

  async requestFcmToken(): Promise<string | null> {
    if (!this.messaging) return null;
    try {
      const token = await getToken(this.messaging, {
        vapidKey: firebaseConfig.vapidKey
      });
      return token;
    } catch (e) {
      console.error('Error getting FCM token', e);
      return null;
    }
  }

  onNotification(callback: (payload: any) => void) {
    if (!this.messaging) return;
    onMessage(this.messaging, (payload) => {
      callback(payload);
    });
  }
}
