import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { LoginService } from 'app/services/login.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        public authService: AuthenticationService,
        public login: LoginService,
        public router: Router
      ){ }

      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            console.log('isLoggedIn:: ',this.login.isLoggedIn());
        if(this.login.isLoggedIn() !== true) {
          this.router.navigate(['/login/sign-in']);
        }
        return true;
      }
}
