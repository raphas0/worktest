import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public set(key: string, value: any) {
    // With base64
    let keyEncode = this.encrypt(key);
    let valueEncode = this.encrypt(value);
    
    localStorage.setItem(keyEncode, valueEncode);
  }
  // Get the json value from local 
  public get(key: string) {
    let keyDecode = this.encrypt(key);
    let storevalue = localStorage.getItem(keyDecode);
    if(storevalue !== null){
      return this.decrypt(storevalue);
    } else {
      return null;
    }
  }// Clear the local 

  public exist(key: string): boolean {
    let local = this.get(key);
    // console.log('aim local', local);
    if(local){
      return true
    } else{
      return false;
    }
  }

  public clearAllItem() {
    return localStorage.clear();
    // return this._storageService.secureStorage.clear();
  }

  public remove = (key: string)=> {
    let keyDecode = this.encrypt(key);
    localStorage.removeItem(keyDecode);
  }

  //create string base64
  private encrypt = (object: any): string => {
    let valueJson = JSON.stringify(object);
    return btoa(valueJson);
  }

  //decrypt base64 to string 
  private decrypt = (encode: string) => {
    try{
      if(encode !== null ){
        let decode = atob(encode);
        return JSON.parse(decode);
      }
    }catch(err){
      console.log('error decryt');
    }
    return null;
  }
}
