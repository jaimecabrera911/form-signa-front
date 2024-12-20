import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private tokenJWT: string | null = null;
    private tokenDecodeJWT: any | null = '';


    constructor() {
    }

    create(token: any): void {
        this.tokenJWT = token;
        this.tokenDecodeJWT = this.decodeToken(token);
        localStorage.setItem(environment.cookieName, JSON.stringify(this.tokenDecodeJWT));
        if (this.tokenJWT) {
            localStorage.setItem('token', this.tokenJWT);
        }
    }


    decodeToken(token: string): any {
        try {
          const decoded = jwtDecode(token); // Add type annotation for jwt_decode
          return decoded;
        } catch (error) {
          console.error('Error al decodificar el token', error);
          return null;
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


    getToken(): string {
        if (!this.tokenJWT) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                this.tokenJWT = storedToken;
            } else {
                this.tokenJWT = ''; // Proveer un valor por defecto o manejar el caso de token no disponible
            }
        }
        return this.tokenJWT;
    }

    validLoggedIn(): boolean {
        const token = this.getToken();
        return (token.length > 0) ? true : false;
    }



    logout(): void {
        this.tokenJWT = null;
        localStorage.removeItem('token');
        localStorage.removeItem(environment.cookieName);
    }
}
