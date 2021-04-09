import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { error } from 'node:console';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { errorFormAdd, People } from '../../models/interfaces';
import { ErrorformService } from '../../services/errorform.service';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public errorForm: errorFormAdd;
  public peopleFormGroup : FormGroup;
  public load:boolean = false;
  public _subscription:Subscription;
  private file: string | ArrayBuffer;
  private datafile = new FormData();

  constructor(
    private _formBuilder: FormBuilder,
    private _peopleService: PeopleService,
    private _error: ErrorformService
  ) {
    this.errorForm = this._error.getListErrorSignUp();
   }

  ngOnInit(): void {
    this.peopleFormGroup = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(18),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      phone: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      documents: new FormControl('', Validators.required)
    });

    //this.setData();
  }

  async addUser(formDirective: FormGroupDirective){
    if(this.peopleFormGroup.valid){
      this.load = true;
      const people = this.generatePeople();      
      this._peopleService.addPeople(people).then(()=> {
            setTimeout(() => {
              formDirective.reset();
              formDirective.resetForm();
            }, 0);
            this.peopleFormGroup.reset();
      }).catch(error => {
        console.log(error);
      }).finally(( ) => {
        this.load = false;
      });
    } else{//shoew all errors
      this.validateAllFormFields(this.peopleFormGroup);
      return; 
    }
  }

  clearFields = (namefield) => {
    this.peopleFormGroup.get(namefield).setValue('');
  }

  onFileSelect(event) {
    const fileRead = new FileReader();
    fileRead.addEventListener('load', () => {
      //console.log(fileRead.result);  
      this.file = fileRead.result;
    });
    fileRead.readAsDataURL(event.target.files[0]);
  }

  generatePeople(): People {
    const people:People ={
      age: this.peopleFormGroup.get('age').value,
      email: this.peopleFormGroup.get('email').value,
      gender:this.peopleFormGroup.get('gender').value,
      phone:this.peopleFormGroup.get('phone').value,
      name:this.peopleFormGroup.get('name').value,
      documents: this.file,
      picture :environment.picture,
      userid: this._peopleService.getId()
    }    
    return people;
  }

  setData(){
    this.peopleFormGroup.get('age').setValue(23);
    this.peopleFormGroup.get('email').setValue('rafas@gmail.com');
    this.peopleFormGroup.get('gender').setValue('Hombre');
    this.peopleFormGroup.get('phone').setValue('712-827-1238');
    this.peopleFormGroup.get('name').setValue('Rafael Samano');
  }

  validateAllFormFields(formGroup: FormGroup) {        
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);            
      if (control instanceof FormControl) {            
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {       
        this.validateAllFormFields(control);
      }
    });
  }

}
