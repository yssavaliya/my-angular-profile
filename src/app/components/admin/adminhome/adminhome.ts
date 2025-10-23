import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../../../services/firebase-auth.service';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminhome.html',
  styleUrls: ['./adminhome.css']
})
export class Adminhome {
  constructor(public auth: FirebaseAuthService) {}

  logout() {
    this.auth.logout();
  }
}
