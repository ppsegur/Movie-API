import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieNew, Serietvnew } from '../models/home.model';
import { WatchListMoviesListResponse } from '../models/watchList.interface';

const API_KEY = '433d2c486572afb242c6fe7c1ddc6771';
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private http: HttpClient) {}

  addToWatchlist(item: MovieNew | Serietvnew): void {
    this.watchlist.results.push(item);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  getWatchlist(): WatchListMoviesListResponse {
    const storedWatchlist = localStorage.getItem('watchlist');
    return storedWatchlist ? JSON.parse(storedWatchlist) : this.watchlist;
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }

  searchSeries(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`);
  }
}