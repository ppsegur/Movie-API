import { Injectable } from '@angular/core';
import { favoritosResponse } from '../models/fav.interface';
import { HttpClient } from '@angular/common/http';
import { MovieNew, Serietvnew } from '../models/home.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Films } from '../models/films.interface';
import { Series } from '../../models/series.model';
import { environmentsKeys } from '../environments/environments-keys';

  /* Definición de la clave de la API y la URL base de la API */ 
const API_KEY = '81819d9750b41c41923effa77112f27a';
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FavService {
 
  private localfav: favoritosResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private http: HttpClient) {}

  getLocalMovieFav(): Observable<favoritosResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const url = `${environmentsKeys.API_URL}/account/${accountId}/favorite/movies?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`;

    return this.http.get<favoritosResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener la lista de películas favoritas:', error);
        return throwError(() => new Error('No se pudo cargar la lista de películas favoritas . Intenta más tarde.'));
      })
    );
  }

  getLocalSerieFav(): Observable<favoritosResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    const url = `${environmentsKeys.API_URL}/account/${accountId}/favorite/tv?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`;

    return this.http.get<favoritosResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener la Fav de series:', error);
        return throwError(() => new Error('No se pudo cargar la Watchlist de series. Intenta más tarde.'));
      })
    );
  }

  addToFav(film: Films): void {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }
  
    const body = {
      media_id: film.id,
      media_type: 'movie',
      favorite: true
    };
  
    this.http.post<any>(
      `${environmentsKeys.API_URL}/account/${accountId}/favorite?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
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
  
  addSeriesToFavorite(series: Series): void {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }
  
    const body = {
      media_id: series.id,
      media_type: 'tv',
      favorite: true
    };
  
    this.http.post<any>(
      `${environmentsKeys.API_URL}/account/${accountId}/favorite?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
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
  
  getLocalFav(): Observable<favoritosResponse> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
  
    const url = `${environmentsKeys.API_URL}/account/${accountId}/favorite/movies?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`;
  
    return this.http.get<favoritosResponse>(url).pipe(
      catchError((error) => {
        console.error('Error al obtener la Listad de favoritos:', error);
        return throwError(() => new Error('No se pudo cargar la lista de favoritos . Intenta más tarde.'));
      })
    );
  }

  removeFromLocalMovieFav(filmId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }

    const body = {
      media_id: filmId,
      media_type: 'movie',
      favorite: false
    };

    return this.http.post<any>(
      `${environmentsKeys.API_URL}/account/${accountId}/favorite?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
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

  removeFromLocalSeriesFavorite(seriesId: number): Observable<any> {
    const sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');

    if (!sessionId || !accountId) {
      throw new Error('No hay sesión activa. Por favor, inicia sesión.');
    }

    const body = {
      media_id: seriesId,
      media_type: 'tv',
      favorite: false
    };

    return this.http.post<any>(
      `${environmentsKeys.API_URL}/account/${accountId}/favorite?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
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

