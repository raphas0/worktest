import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { People } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {
  private _subject = new Subject<People>()
  constructor() { }

  setPeople(person: People){
    this._subject.next(person);
  }

  getPerson(): Observable<People> {
    return this._subject.asObservable();
  }
}
