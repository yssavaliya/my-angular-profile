import { Injectable } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase.config';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  getData(): Observable<any> {
    const docRef = doc(db, 'data', 'main');

    return from(getDoc(docRef)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          // No need to parse, it's already an object
          return docSnap.data()['json'] || {};
        } else {
          console.warn('No document found in Firestore at data/main');
          return {};
        }
      })
    );
  }
}
