
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAP3Sy1PB0m_EpKifOpUd7tc1_eAKF2alM",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "vimbalambi-news.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://vimbalambi-news-default-rtdb.firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "vimbalambi-news",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "vimbalambi-news.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "212254517932",
  appId: process.env.FIREBASE_APP_ID || "1:212254517932:web:d061c943f90b4c4e204d09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
