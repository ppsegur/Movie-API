import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';

const API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
const API_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {}

  private favorites: Films[] = []; // Aquí almacenaremos las películas favoritas


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
    // Métodos para favoritos
    addToFavorites(film: Films): void {
      if (!this.isFavorite(film.id)) {
        this.favorites.push(film);
      }
    }
  
    removeFromFavorites(film: Films): void {
      this.favorites = this.favorites.filter(fav => fav.id !== film.id);
    }
  
    isFavorite(filmId: number): boolean {
      return this.favorites.some(fav => fav.id === filmId);
    }
  
    getFavorites(): Films[] {
      return this.favorites;
    }
}