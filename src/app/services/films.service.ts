import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';

const API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
const API_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {}

  getPopular(): Observable<FilmsListResponse> {
    return this.http.get<FilmsListResponse>(
      `${API_URL}/movie/popular?api_key=${API_KEY}`
    );
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(
      `${API_URL}/movie/${id}?api_key=${API_KEY}`
    );
  }

  getFilmVideos(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  }
}