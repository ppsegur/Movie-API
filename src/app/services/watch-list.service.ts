import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WatchListMoviesListResponse } from '../models/watchList.interface';
import { Films } from '../models/films.interface';
import { Series } from '../../models/series.model';

const API_KEY = '433d2c486572afb242c6fe7c1ddc6771';
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private localWatchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private http: HttpClient) {}

  /** Añadir a la watchlist en TMDB */
  addToWatchlistTMDB(itemId: number, mediaType: 'movie' | 'tv', sessionId: string): Observable<any> {
    const url = `${API_BASE_URL}/account/{account_id}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`;
    const body = {
      media_type: mediaType,
      media_id: itemId,
      watchlist: true
    };
    return this.http.post(url, body);
  }

  /** Obtener la watchlist desde TMDB */
  getWatchlistTMDB(mediaType: 'movie' | 'tv', accountId: number, sessionId: string): Observable<WatchListMoviesListResponse> {
    const url = `${API_BASE_URL}/account/${accountId}/watchlist/${mediaType}?api_key=${API_KEY}&session_id=${sessionId}`;
    return this.http.get<WatchListMoviesListResponse>(url);
  }

  /** Respaldo en localStorage */
  addToLocalWatchlist(item: Films | Series): void {
    this.localWatchlist.results.push(item);
    localStorage.setItem('watchlist', JSON.stringify(this.localWatchlist));
  }

  getLocalWatchlist(): WatchListMoviesListResponse {
    const storedData = localStorage.getItem('watchlist');
    return storedData ? JSON.parse(storedData) : this.localWatchlist;
  }

  removeFromLocalWatchlist(itemId: number): void {
    this.localWatchlist.results = this.localWatchlist.results.filter(item => item.id !== itemId);
    localStorage.setItem('watchlist', JSON.stringify(this.localWatchlist));
  }
}
