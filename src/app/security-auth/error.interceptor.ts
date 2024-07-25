import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {LoginService} from '../services/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private login: LoginService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(catchError((err) => {
            if (err.status === 401 && !request.url.endsWith('login') && !request.url.endsWith('signin')) {
                console.log(' interceptor 401');
                this.login.logout();
                const error = err.error.message || err.statusText;
                return throwError(() => err);
            }
            if (err.status === 403 && !request.url.endsWith('login') && !request.url.endsWith('signin')) {
                console.log(' interceptor 403');
                this.login.logout();
                const error = err.error.message || err.statusText;
                return throwError(() => err);
            }
            return throwError(() => err);
        }));
    }
}
