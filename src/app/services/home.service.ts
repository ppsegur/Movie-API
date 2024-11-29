import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environmentsKeys } from '../../environments/environments-keys';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getMoviesNews(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${environmentsKeys.API_KEY}`
    );
  }

  getSeriesNews(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${environmentsKeys.API_KEY}`
    );
  }

  searchMoviesAndSeries(query: string): Observable<any> {
    const moviesSearch = this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${environmentsKeys.API_KEY}&query=${query}`
    );
    const seriesSearch = this.http.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${environmentsKeys.API_KEY}&query=${query}`
    );

    return forkJoin([moviesSearch, seriesSearch]); 
  }
}
