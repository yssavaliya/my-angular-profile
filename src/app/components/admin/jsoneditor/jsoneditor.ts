import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as monaco from 'monaco-editor';
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
  editor!: monaco.editor.IStandaloneCodeEditor;
  loading = true;
  error = '';
  isDarkMode = document.documentElement.classList.contains('dark');

  constructor(public auth: FirebaseAuthService) {}

  async ngAfterViewInit() {
    try {
      const docRef = doc(db, 'data', 'main');
      const docSnap = await getDoc(docRef);

      let initialJson = '{}';
      if (docSnap.exists()) {
        const jsonData = docSnap.data()['json'];
        console.log('Firestore JSON data:', jsonData);
        initialJson = JSON.stringify(jsonData, null, 2);
      }

      // Initialize Monaco Editor
      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: initialJson,
        language: 'json',
        theme: this.isDarkMode ? 'vs-dark' : 'vs',
        automaticLayout: true,
        minimap: { enabled: false }
      });
    } catch (err) {
      this.error = 'Failed to load JSON: ' + err;
      console.error(this.error);
    } finally {
      this.loading = false;
    }
  }

  async save() {
    try {
      const jsonText = this.editor.getValue();
      const data = JSON.parse(jsonText);
      console.log('Saving JSON data to Firestore:', data);
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
    monaco.editor.setTheme(this.isDarkMode ? 'vs-dark' : 'vs');
  }
}
