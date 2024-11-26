import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series, SeriesResponse } from '../../models/series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
  API_URL = 'https://api.themoviedb.org/3/tv/popular'
  API_URL_ID = 'https://api.themoviedb.org/3/tv/'

  constructor(private http: HttpClient) { }

  getSeries(): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(`${this.API_URL}?api_key=${this.API_KEY}`);
  }

  getSeriesById(id: number): Observable<Series> {
    return this.http.get<Series>(`${this.API_URL_ID}${id}?api_key=${this.API_KEY}`);
    
  }

  

}
