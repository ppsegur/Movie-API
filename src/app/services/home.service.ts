import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

const ACCESS_TOKEN = '05e17ea68b0a29c92de23f76cc1cff22';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getMoviesNews(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${ACCESS_TOKEN}`
    );
  }

  getSeriesNews(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${ACCESS_TOKEN}`
    );
  }

  searchMoviesAndSeries(query: string): Observable<any> {
    const moviesSearch = this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${ACCESS_TOKEN}&query=${query}`
    );
    const seriesSearch = this.http.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${ACCESS_TOKEN}&query=${query}`
    );

    return forkJoin([moviesSearch, seriesSearch]); // Combina ambas búsquedas
  }
}
