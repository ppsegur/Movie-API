import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { WatchListMoviesListResponse } from '../models/watchList.interface';
import { Films } from '../models/films.interface';
import { Series } from '../../models/series.model';
import { LanguageService } from 'typescript';

const API_KEY = '81819d9750b41c41923effa77112f27a';
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

  getLocalMovieWatchlist(): Observable<WatchListMoviesListResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const url = `${API_BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`;

    return this.http.get<WatchListMoviesListResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener la Watchlist de películas:', error);
        return throwError(() => new Error('No se pudo cargar la Watchlist de películas. Intenta más tarde.'));
      })
    );
  }

  getLocalSeriesWatchlist(): Observable<WatchListMoviesListResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const url = `${API_BASE_URL}/account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`;

    return this.http.get<WatchListMoviesListResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener la Watchlist de series:', error);
        return throwError(() => new Error('No se pudo cargar la Watchlist de series. Intenta más tarde.'));
      })
    );
  }

  addToWatchlistTMDB(film: Films): void {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }
  
    const body = {
      media_id: film.id,
      media_type: 'movie',
      watchlist: true
    };
  
    this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    ).subscribe(
      (response) => {
        console.log('Película añadida con éxito:', response);
      },
      (error) => {
        console.error('Error al añadir la película:', error);
      }
    );
  }
  
  addSeriesToWatchlistTMDB(series: Series): void {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }
  
    const body = {
      media_id: series.id,
      media_type: 'tv',
      watchlist: true
    };
  
    this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    ).subscribe(
      (response) => {
        console.log('Serie añadida con éxito:', response);
      },
      (error) => {
        console.error('Error al añadir la serie:', error);
      }
    );
  }
  
  getLocalWatchlist(): Observable<WatchListMoviesListResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    const url = `${API_BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`;
  
    return this.http.get<WatchListMoviesListResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener la Watchlist:', error);
        return throwError(() => new Error('No se pudo cargar la Watchlist. Intenta más tarde.'));
      })
    );
  }

  removeFromLocalMovieWatchlist(filmId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }

    const body = {
      media_id: filmId,
      media_type: 'movie',
      watchlist: false
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    ).pipe(
      tap((response) => {
        console.log('Película eliminada con éxito:', response);
      }),
      catchError((error) => {
        console.error('Error al eliminar la película:', error);
        return throwError(() => new Error('No se pudo eliminar la película. Intenta más tarde.'));
      })
    );
  }

  removeFromLocalSeriesWatchlist(seriesId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }

    const body = {
      media_id: seriesId,
      media_type: 'tv',
      watchlist: false
    };

    return this.http.post<any>(
      `${API_BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
      body
    ).pipe(
      tap((response) => {
        console.log('Serie eliminada con éxito:', response);
      }),
      catchError((error) => {
        console.error('Error al eliminar la serie:', error);
        return throwError(() => new Error('No se pudo eliminar la serie. Intenta más tarde.'));
      })
    );
  }
  
}
