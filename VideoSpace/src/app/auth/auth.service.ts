import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iUser } from '../Models/i-user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iAuthData } from '../Models/i-auth-data';
import { iAuthResponse } from '../Models/i-auth-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<null | iAuthResponse>(null);

  syncIsLoggedIn: boolean = false;

  user$ = this.authSubject.asObservable();

  isLoggedIn$ = this.user$.pipe(tap((user) => (this.syncIsLoggedIn = !!user)));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  loginUrl: string = environment.loginUrl;
  registerUrl: string = environment.usersUrl;

  register(newUser: Partial<iUser>): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.registerUrl, newUser);
  }

  login(authData: iAuthData): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, authData).pipe(
      tap((data) => {
        this.authSubject.next(data);
        localStorage.setItem('accessData', JSON.stringify(data));
        this.autoLogout();
      })
    );
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/login']);
  }

  autoLogout(): void {
    const accessData = this.getAccessData();

    if (!accessData) return;

    const expDate = this.jwtHelper.getTokenExpirationDate(
      accessData.accessToken
    ) as Date;
    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(this.logout, expMs);
  }

  getAccessData(): iAuthResponse | null {
    const accessDataJson = localStorage.getItem('accessData');
    if (!accessDataJson) return null;
    const accessData: iAuthResponse = JSON.parse(accessDataJson);
    return accessData;
  }

  restoreUser(): void {
    const accessData = this.getAccessData();

    if (!accessData) return;

    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.authSubject.next(accessData);
    this.autoLogout();
  }

  getCurrentUser(): iUser | undefined {
    const accessData = this.getAccessData();

    if (!accessData) {
      return undefined;
    }

    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) {
      return undefined;
    }

    return accessData.user;
  }
}
