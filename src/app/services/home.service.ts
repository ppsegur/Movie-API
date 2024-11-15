import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesNewsListResponse, SeriestvnewsListResponse } from '../models/home.model';

const ACCESS_TOKEN = '05e17ea68b0a29c92de23f76cc1cff22';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getMoviesNews(): Observable<MoviesNewsListResponse> {
    return this.http.get<MoviesNewsListResponse>(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${ACCESS_TOKEN}`
    );
  }


  getSeriesNews(): Observable<SeriestvnewsListResponse> {
    return this.http.get<SeriestvnewsListResponse>(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${ACCESS_TOKEN}`
    );
  }


 
}

