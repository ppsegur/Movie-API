import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';
import { environmentsKeys } from '../../environments/environments-keys';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getPopular(): Observable<FilmsListResponse> {
    return this.http.get<FilmsListResponse>(`${environmentsKeys.API_URL}/movie/popular?api_key=${environmentsKeys.API_KEY}`);
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(`${environmentsKeys.API_URL}/movie/${id}?api_key=${environmentsKeys.API_KEY}`);
  }

  getFilmVideos(id: number): Observable<any> {
    return this.http.get<any>(`${environmentsKeys.API_URL}/movie/${id}/videos?api_key=${environmentsKeys.API_KEY}`);
  }

  getFilmCredits(id: number): Observable<any> {
    return this.http.get<any>(`${environmentsKeys.API_URL}/movie/${id}/credits?api_key=${environmentsKeys.API_KEY}`);
  }
}
