import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AppUser } from './models/app-user';
import { switchMap ,map} from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/of'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User>;

  constructor(private afAuth:AngularFireAuth, private route: ActivatedRoute, private userService: UserService) { 
    this.user$ =afAuth.authState;
  }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
    console.log('Logout')
  }
  
  get appUser$(): Observable<AppUser>{
    return this.user$
    .pipe(switchMap(user => 
      {
        if(user)
          return this.userService.get(user.uid).valueChanges();

          return Observable.of(null);  
  }))
  }
}
