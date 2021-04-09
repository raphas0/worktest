import { Injectable } from '@angular/core';
import { errorFormAdd } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ErrorformService {
  private addForm: errorFormAdd = {
    'name': [
      { type: 'required', message: 'Por favor, ingresar un nombre.' },
    ],
    'age':[
      { type: 'required', message: 'Por favor, ingresar edad.' },
      { type: 'min', message: 'La edad mínima es 18.' },
    ],
    'email': [
      { type: 'required', message: 'Por favor, ingresar email.' },
      { type: 'email', message: 'No es un email.' }
    ],
    'phone': [
      { type: 'required', message: 'Por favor, ingrese un número télefonico.' },
    ],
    'gender':[
      { type: 'required', message: 'Por favor, seleccionesu genero.' },
    ],
    'document':[
      { type: 'required', message: 'Por favor, ingrese un documento.' },
    ]
  };
  constructor() { }

  getListErrorSignUp = (): errorFormAdd => this.addForm;
}
