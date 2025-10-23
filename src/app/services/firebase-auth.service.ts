import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCJwG5QAOavjwZR6uhbxXhDSkB0FeV6SDM",
    authDomain: "yash-savaliya-portfolio.firebaseapp.com",
    projectId: "yash-savaliya-portfolio",
    storageBucket: "yash-savaliya-portfolio.firebasestorage.app",
    messagingSenderId: "44820236873",
    appId: "1:44820236873:web:5d705e30905c5f7c6d8d98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// List of allowed emails
const ALLOWED_USERS = ['ysavaliya215@rku.ac.in'];


@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
user$ = new BehaviorSubject<User | null | undefined>(undefined);

    constructor(private router: Router) {
        // Track user state
       onAuthStateChanged(auth, user => {
          console.log('🔥 Auth state changed:', user?.email || 'No user');
  setTimeout(() => this.user$.next(user), 0);
});

    }

    async googleSignIn() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Ensure user.email is not null
            if (user.email && ALLOWED_USERS.includes(user.email)) {
                  console.log('✅ Logged in user:', user.email);
                this.user$.next(user);
                this.router.navigate(['/admin/home']);
            } else {
                await signOut(auth);
                alert('You are not authorized to access this app.');
            }
        } catch (err) {
            console.error('Login failed', err);
        }
    }


    async logout() {
        await signOut(auth);
        this.router.navigate(['/login']);
    }
}
