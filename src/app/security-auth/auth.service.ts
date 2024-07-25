import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null;
    private currentUser: any | null = null;
    private currentUserName: string | null = null;
    private currentUserSubject: BehaviorSubject<any>;


    constructor(private http: HttpClient, private router: Router) {
    }


    login(identifier: string, password: string): any {
        const url = `${environment.apiUrl}auth/local`;
        return this.http.post<any>(url, { identifier, password })
            .subscribe({
                next: (response: any) => {
                    this.token = response.jwt;
                    this.currentUser = response.user;
                    if (this.token) {
                        localStorage.setItem('token', this.token);
                        localStorage.setItem('currentUser', this.currentUser);
                        localStorage.setItem('username', response.user.username);
                    }
                    this.router.navigate(['/home']);
                }, error: (e: any) => console.log(e)
            });
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

    getUserCurrent(): any {
        if (!this.currentUser) {
            const storedCurrentUser = localStorage.getItem('currentUser');
            if (storedCurrentUser) {
                this.currentUser = storedCurrentUser;
            } else {
                this.currentUser = ''; // Proveer un valor por defecto o manejar el caso de token no disponible
            }
        }
        return this.currentUser;
    }

    isLoggedIn(): boolean {
        const user = this.getToken();
        return (user.length > 0) ? true : false;
    }


    logout(): void {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }
}
