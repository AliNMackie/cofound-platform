import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  User
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only in browser environment
let app: ReturnType<typeof getApp> | undefined;
let auth: ReturnType<typeof getAuth> | undefined;
let db: ReturnType<typeof getFirestore> | undefined;

if (typeof window !== 'undefined') {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db };

// Providers - only initialize in browser
const googleProvider = typeof window !== 'undefined' ? new GoogleAuthProvider() : null;

const microsoftProvider = typeof window !== 'undefined' ? new OAuthProvider("microsoft.com") : null;
if (microsoftProvider) {
  microsoftProvider.addScope("offline_access");
  microsoftProvider.setCustomParameters({
    // Force consent to ensure refresh token is returned if needed
    prompt: "consent",
  });
}

export const signInWithGoogle = async () => {
  if (!auth || !googleProvider) {
    throw new Error("Firebase auth not initialized");
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const signInWithMicrosoft = async () => {
  if (!auth || !microsoftProvider) {
    throw new Error("Firebase auth not initialized");
  }
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Microsoft", error);
    throw error;
  }
};

export type { User };
