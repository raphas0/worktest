import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { People } from '../../models/interfaces';
import { PeopleService } from '../../services/people.service';
import {MatSort} from '@angular/material/sort';
import { AddPersonService } from '../../services/add-person.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['name', 'email', 'age', 'phone', 'gender', 'documents'];
  public dataPeople : People[]= [];
  public data: MatTableDataSource<People>;;
  public _subscription:Subscription;
  public _subscriptionPerson:Subscription;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private _peopleSvc:PeopleService,
    private _addperson:AddPersonService
  ) { }

  ngOnInit(): void {
    this._subscription= this._peopleSvc.getPeople().subscribe(response => { 
     if(response){
      this.dataPeople = response.map(element => {
        return element;
      });
      this.getStore();
    }else{
      this.getStore();
     }
    });

    this._subscriptionPerson = this._addperson.getPerson().subscribe(dataPerson => {
        this.dataPeople.push(dataPerson);
        this.data = new MatTableDataSource(this.dataPeople);
        console.log(this.dataPeople);
        
    });
  }

  ngOnDestroy(): void {
   this._subscription.unsubscribe();    
   this._subscriptionPerson.unsubscribe();
  }

  getStore(){
    this._peopleSvc.getStore().then( dataresponse => {
      if(dataresponse !== null){
        let newPeople: People[] = dataresponse.map(element => {
          return element;
        });
        this.dataPeople = this.dataPeople.concat(newPeople);
        this.data = new MatTableDataSource(this.dataPeople);
      }else{
        this.data = new MatTableDataSource(this.dataPeople);
      }
    }).catch(error =>{

    });
  }

  
}
