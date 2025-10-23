import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { map, take, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: FirebaseAuthService, private router: Router) {}

  canActivate() {
    return this.auth.user$.pipe(
      // ✅ Wait until we actually get a user value (not null from initialization)
      filter(user => user !== undefined), // ensures we wait for Firebase to emit
      take(1),
      map(user => {
        console.log('🛡️ AuthGuard check (fixed):', user?.email || 'No user');
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
