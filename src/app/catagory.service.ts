import { AngularFireDatabase ,AngularFireList, } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private db:AngularFireDatabase) { }

  getAll(): AngularFireList<any>{
   return this.db.list('/catagories', (ref) => ref.orderByChild('name'));
  }
}
