import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iUser } from '../Models/i-user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = environment.usersUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.usersUrl);
  }
}
