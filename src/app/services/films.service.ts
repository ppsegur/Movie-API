import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';

const API_KEY = '433d2c486572afb242c6fe7c1ddc6771';
const API_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  /** Obtener películas populares */
  getPopular(): Observable<FilmsListResponse> {
    return this.http.get<FilmsListResponse>(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  }

  /** Obtener detalles de una película por ID */
  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  /** Obtener videos de una película */
  getFilmVideos(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  }

  /** Obtener créditos de una película */
  getFilmCredits(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  }
}
