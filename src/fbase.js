import { initializeApp } from "firebase/app";
import * as auth from "firebase/auth";
import * as database from "firebase/firestore";
import {getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const dbService = database;
export const storage = getStorage(firebaseApp);
export const storageService = {ref, uploadString, getDownloadURL};
export const authService = auth;
