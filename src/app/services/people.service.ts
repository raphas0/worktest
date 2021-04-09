import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { People, Response } from '../models/interfaces';
import { catchError, map  } from 'rxjs/operators'
import { UrlService } from './url.service';
import { Observable, of } from 'rxjs';
import { StoreService } from './store.service';
import { AddPersonService } from './add-person.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private _http:HttpClient,
    private _url:UrlService,
    private _store: StoreService,
    private _addperson:AddPersonService
  ) { }

  getPeople(): Observable<People[]> {
    let url= this._url.getUrlPeople();
    console.log(url);
    return this._http.get<Response>(url).pipe(
      map(response=>{
        if (response.results.length>0) {
          return response.results;
        } else {
          return [];
        }
      }),
      catchError(error => of([]))
    )
  }

  async addPeople(people: People){
    console.log(people);  
    let data = this._store.get('data');  
    if(data !== null){
      let newPeople: People[] = data.map(element => {
        return element;
      });
      newPeople.push(people);
      await this._store.set('data', newPeople);
      this._addperson.setPeople(people);
    }else{
      await this._store.set('data', [people]);
    }
    
  }

  async getStore() {
    return await this._store.get('data');
  }

  getId(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
