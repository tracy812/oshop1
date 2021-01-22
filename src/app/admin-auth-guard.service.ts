import { UserService } from './user.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { switchMap ,map} from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth:AuthService, private route:Router, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .pipe(map(appUser => appUser.isAdmin));
   }

}
