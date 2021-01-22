import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {Observable} from 'rxjs';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser:AppUser;
  user$: Observable<firebase.default.User>;
  constructor(private auth:AuthService) { 
    auth.appUser$.subscribe(appUser=>this.appUser = appUser);
  }

logout(){
  this.auth.logout();
}

}
