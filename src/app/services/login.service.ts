import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private currentUserSubject: BehaviorSubject<any>;
    private currentUser: Observable<any>;

    constructor(private router: Router, private session: SessionService) {
        this.currentUserSubject = new BehaviorSubject<any>(session.get());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    get currentUserValue(): any {
        return this.currentUserSubject.value;
    }


    loginSuccess(login?: any): void {
        this.session.create(login);
        this.currentUserSubject.next(jwtDecode(login));
    }

    currentUserAuthenticated(user: any): void {
        const value = this.currentUserValue;
        value.user = user;
        this.loginSuccess(value);
    }


    isLoggedIn(): boolean {
        return this.session.validLoggedIn();
    }

    logout(): void {
        this.closeSession();
    }

    closeSession(): void {
        this.session.logout();
        this.currentUserSubject.next(null);
    }
}
