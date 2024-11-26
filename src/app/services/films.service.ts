import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';

const API_KEY = '81819d9750b41c41923effa77112f27a';
const API_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getPopular(): Observable<FilmsListResponse> {
    return this.http.get<FilmsListResponse>(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  getFilmVideos(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  }

  getFilmCredits(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  }
}
