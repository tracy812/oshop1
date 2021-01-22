import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router'
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
   
  constructor(private auth:AuthService, private router:Router)  { }

  canActivate(route, state:RouterStateSnapshot){
    return this.auth.user$.map(user=> {
      if(user) {
        console.log('true guard');
        return true;
      }else{
      this.router.navigate(['/login'],{queryParams:{ returnUrl:state.url}});
      console.log('fail guard');
      return false;
      }
    })
  }
}
