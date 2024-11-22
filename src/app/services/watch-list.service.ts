import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieNew, Serietvnew } from '../models/home.model';

const API_KEY = '433d2c486572afb242c6fe7c1ddc6771';
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: (MovieNew | Serietvnew)[] = [];

  constructor(private http: HttpClient) {}

  addToWatchlist(item: MovieNew | Serietvnew): void {
    this.watchlist.push(item);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  getWatchlist(): (MovieNew | Serietvnew)[] {
    const storedWatchlist = localStorage.getItem('watchlist');
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }

  searchSeries(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`);
  }
}