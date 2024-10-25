import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private AuthService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.AuthService.authSubject.pipe(
      switchMap((accessdata) => {
        if (!accessdata) {
          return next.handle(request);
        }
        const newRequest = request.clone({
          headers: request.headers.append(
            'Authorization',
            `Bearer ${accessdata.accessToken}`
          ),
        });
        return next.handle(newRequest);
      })
    );
  }
}
