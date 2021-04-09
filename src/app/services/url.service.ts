import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  getUrlPeople():string{
    return `${environment.api}&${environment.listref}&results=5`;
  }
}
