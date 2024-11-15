import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmsListResponse } from '../models/films.interface';

const API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {}

  getPopular(): Observable<FilmsListResponse> {
    return this.http.get<FilmsListResponse>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
  }
}
