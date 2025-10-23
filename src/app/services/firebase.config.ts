import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJwG5QAOavjwZR6uhbxXhDSkB0FeV6SDM",
  authDomain: "yash-savaliya-portfolio.firebaseapp.com",
  projectId: "yash-savaliya-portfolio",
  storageBucket: "yash-savaliya-portfolio.firebasestorage.app",
  messagingSenderId: "44820236873",
  appId: "1:44820236873:web:5d705e30905c5f7c6d8d98"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
