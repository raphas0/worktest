import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people/people.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
/*material*/
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FilePipe } from '../pipes/file.pipe';

@NgModule({
  declarations: [
    PeopleComponent, 
    MainComponent,
    FilePipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports:[
    PeopleComponent,
    MainComponent
  ]
})
export class ComponentsModule { }
