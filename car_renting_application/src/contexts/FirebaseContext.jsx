/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const FirebaseContext = createContext();

function useFirebase() {
  return useContext(FirebaseContext);
}

function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider
      value={{
        db,
        storage,
        ref,
        uploadBytes,
        getDownloadURL,
        setDoc,
        doc,
        getDoc,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        sendEmailVerification,
        auth,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export { useFirebase, FirebaseProvider };
