import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../../services/firebase-auth.service';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css'
})
export class AdminMenu {
  constructor(private auth: FirebaseAuthService) {}

  logout() {
    this.auth.logout();
  }
}
