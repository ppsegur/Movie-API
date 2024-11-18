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

  constructor(private http: HttpClient) { }

  getSeries(): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(`${this.API_URL}?api_key=${this.API_KEY}`);
  }

}
