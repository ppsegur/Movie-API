import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenresListResponse } from '../models/genres.interface';
import { Observable } from 'rxjs';

const API_BASE_URL = 'https://api.themoviedb.org/3';


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) {}

  getGenres(): Observable<GenresListResponse> {
    return this.http.get<GenresListResponse>(`${API_BASE_URL}/genre/movie/list` ,{
      headers: {
        Authorization: `Bearer localStorage.getItem('token')`
      }
    });
  }

}
