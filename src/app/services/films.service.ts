import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';
import { MovieNew, Serietvnew } from '../models/home.model';
import { WatchListMoviesListResponse } from '../models/watchList.interface';

const API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
const API_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private watchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

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

  getFilmCredits(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  }

  addToWatchlist(item: MovieNew | Serietvnew): void {
    this.watchlist.results.push(item);
    this.watchlist.total_results = this.watchlist.results.length;
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  getWatchlist(): WatchListMoviesListResponse {
    const storedWatchlist = localStorage.getItem('watchlist');
    return storedWatchlist ? JSON.parse(storedWatchlist) : this.watchlist;
  }
}