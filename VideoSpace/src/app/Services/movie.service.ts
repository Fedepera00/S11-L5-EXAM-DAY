import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iMovie } from '../Models/i-movie';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private dbUrl: string = environment.moviesUrl;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<iMovie[]> {
    return this.http.get<iMovie[]>(this.dbUrl);
  }
}
