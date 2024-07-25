import { Injectable } from '@angular/core';
//import {Login} from 'app/models/login';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private token: string | null = null;

    constructor(private api: ApiService) {
    }

    create(login: any): void {
        localStorage.setItem(environment.cookieName, JSON.stringify(login));
        this.token = login.jwt;
        if (this.token) {
            localStorage.setItem('token', this.token);
            localStorage.setItem('username', login.user.username);
        }
    }


    get(): any | null {
        const session = localStorage.getItem(environment.cookieName);
        if (session) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return <any>JSON.parse(session);
        }
        return null;
    }

    getEmployee(): any | null {
        const session = localStorage.getItem(environment.cookieNameEmp);
        if (session) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return <any>JSON.parse(session);
        }
        return null;
    }

    getToken(): string {
        if (!this.token) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                this.token = storedToken;
            } else {
                this.token = ''; // Proveer un valor por defecto o manejar el caso de token no disponible
            }
        }
        return this.token;
    }

    validLoggedIn(): boolean {
        const user = this.getToken();
        this.createEmployee();
        return (user.length > 0) ? true : false;
    }

    createEmployee(): void {
        const username: any = localStorage.getItem('username');
        this.api.employeUsernameService(username).subscribe({
            next: (response: any) => {
                localStorage.setItem(environment.cookieNameEmp, JSON.stringify(response.data));
            }, error: (e: any) => console.log(e)
        });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem(environment.cookieName);
    }
}
