import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseAuthService } from '../../../services/firebase-auth.service';
import { db } from '../../../services/firebase.config';
import { AdminMenu } from '../admin-menu/admin-menu';

@Component({
  selector: 'app-jsoneditor',
  standalone: true,
  imports: [CommonModule, AdminMenu],
  templateUrl: './jsoneditor.html',
  styleUrls: ['./jsoneditor.css']
})
export class Jsoneditor implements AfterViewInit {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  editor!: any;
  loading = true;
  error = '';
  isDarkMode = document.documentElement.classList.contains('dark');

  constructor(public auth: FirebaseAuthService) {}

  async ngAfterViewInit() {
    // Initialize editor
    this.editor = new JSONEditor(this.editorContainer.nativeElement, {
      mode: 'code',
      onError: (err: any) => alert(err.toString()),
      mainMenuBar: true,
      navigationBar: true,
      history: true,
      theme: this.getThemeColors()
    });

    try {
      const docRef = doc(db, 'data', 'main'); // collection: data, document: main
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const jsonData = docSnap.data()['json'];
        console.log('Firestore JSON data:', jsonData);
        this.editor.set(jsonData); // directly set as object
      } else {
        this.editor.set({});
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
      const data = this.editor.get();
      console.log('Saving JSON data to Firestore:', data);

      // Save as JSON object (not string)
      await setDoc(doc(db, 'data', 'main'), { json: data });
      alert('✅ JSON saved successfully!');
    } catch (err) {
      console.error('Failed to save JSON:', err);
      alert('❌ Failed to save JSON: ' + err);
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    this.editor.updateOptions({ theme: this.getThemeColors() });
  }

  private getThemeColors() {
    if (this.isDarkMode) {
      return {
        base: '#1e1e2f',
        background: '#1e1e2f',
        string: '#98c379',
        number: '#d19a66',
        boolean: '#56b6c2',
        null: '#c678dd',
        key: '#61afef',
        error: '#ff6f61'
      };
    } else {
      return null; // default light theme
    }
  }
}
