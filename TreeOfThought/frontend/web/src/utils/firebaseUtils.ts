import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithCustomToken, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import type { User } from "firebase/auth";
import { getFirestore, doc, onSnapshot, deleteDoc } from "firebase/firestore";
import type { Unsubscribe } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import type { Messaging } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let messaging: Messaging | null = null;
try {
  messaging = getMessaging(app);
} catch (error) {
  console.warn("Firebase Messaging not supported in this environment (likely non-HTTPS or missing service worker)", error);
}

export const loginWithCustomToken = async (token: string) => {
  try {
    const userCredential = await signInWithCustomToken(auth, token);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with custom token:", error);
    throw error;
  }
};

export const subscribeToRequest = (requestId: string, callback: (data: any) => void): Unsubscribe => {
  const docRef = doc(db, "requests", requestId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
};

export const setupFCM = async () => {
  if (!messaging) {
    console.warn("Messaging is not initialized. FCM setup skipped.");
    return null;
  }
  
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log("Notification permission granted. Registering Service Worker...");
      
      // Explicitly register the service worker to handle SSL issues and custom scopes better
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/'
      });
      
      console.log("Service Worker registered with scope:", registration.scope);

      const token = await getToken(messaging, { 
        vapidKey: firebaseConfig.vapidKey,
        serviceWorkerRegistration: registration
      });
      
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied");
    }
  } catch (error) {
    console.error("Error setting up FCM:", error);
    if (error instanceof Error && error.message.includes("ServiceWorker")) {
      console.error("Service Worker registration failed. Please ensure you are accessing the app via http://localhost:4200 and that the service worker file exists.");
    }
  }
  return null;
};

export const onMessageReceived = (callback: (payload: any) => void) => {
  if (!messaging) return;
  return onMessage(messaging, (payload) => {
    console.log("Foreground Message received:", payload);
    callback(payload);
  });
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  return signInWithPopup(auth, provider);
};

export const signInWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  provider.addScope('email');
  provider.addScope('public_profile');
  return signInWithPopup(auth, provider);
};

export const signInWithMicrosoft = () => {
  const provider = new OAuthProvider('microsoft.com');
  provider.addScope('openid');
  provider.addScope('email');
  provider.addScope('profile');
  return signInWithPopup(auth, provider);
};

export const signOutFirebase = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during sign-out", error);
    throw error;
  }
};

export const CqrsOnCommandResult = (requestId: string, callback: (message: any) => void, waitTimeInMilis: number = 0) => {
  const docRef = doc(db, "commandresults", requestId);
  
  return onSnapshot(docRef, (snapshot) => {
    if (!snapshot.exists()) return;
    const payload = snapshot.data();
    
    setTimeout(async () => {
      console.log('firestore_listen Message received. ', payload);
      callback(payload);
      try {
        await deleteDoc(docRef);
      } catch (error) {
        console.error("Error deleting command result doc:", error);
      }
    }, waitTimeInMilis);
  });
};

export { auth, db, messaging };
