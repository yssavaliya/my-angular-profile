import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseAuthService } from '../../../services/firebase-auth.service';
import { db } from '../../../services/firebase.config';
import { AdminMenu } from '../admin-menu/admin-menu';

@Component({
  selector: 'app-jsoneditor',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminMenu],
  templateUrl: './jsoneditor.html',
  styleUrls: ['./jsoneditor.css']
})
export class Jsoneditor implements OnInit {
  jsonString = '';
  loading = true;
  error = '';
  isDarkMode = document.documentElement.classList.contains('dark');

  constructor(public auth: FirebaseAuthService) {}

  async ngOnInit() {
    try {
      const docRef = doc(db, 'data', 'main');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const jsonData = docSnap.data()['json'];
        console.log('Firestore JSON data:', jsonData);
        this.jsonString = JSON.stringify(jsonData, null, 2);
      } else {
        this.jsonString = '{}';
      }
    } catch (err) {
      this.error = 'Failed to load JSON: ' + err;
      console.error(this.error);
    } finally {
      this.loading = false;
    }
  }

  async save() {
    try {
      const data = JSON.parse(this.jsonString);
      await setDoc(doc(db, 'data', 'main'), { json: data });
      alert('✅ JSON saved successfully!');
    } catch (err) {
      console.error('Failed to save JSON:', err);
      alert('❌ Invalid JSON or save failed: ' + err);
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
