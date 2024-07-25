import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
//import {Login} from '../models/login';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
//import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private currentUserSubject: BehaviorSubject<any>;
    private currentEmployeeSubject: BehaviorSubject<any>;
    private currentUser: Observable<any>;
    private currentEmployee: Observable<any>;

    constructor(private router: Router, private session: SessionService) {
        this.currentUserSubject = new BehaviorSubject<any>(session.get());
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentEmployeeSubject = new BehaviorSubject<any>(session.getEmployee());
        this.currentEmployee = this.currentEmployeeSubject.asObservable();
    }

    get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    get currentEmployeeValue(): any {
        return this.currentEmployeeSubject.value;
    }

    loginSuccess(login?: any): void {
        this.session.create(login);
        this.currentUserSubject.next(login);
       this.currentEmpAuthenticated();
    }

    currentUserAuthenticated(user: any): void {
        const value = this.currentUserValue;
        value.user = user;
        this.loginSuccess(value);
    }


    currentEmpAuthenticated(): void{
        const value = this.currentUserValue.user.username;
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
