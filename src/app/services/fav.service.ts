import { Injectable } from '@angular/core';
import { favoritosResponse } from '../models/fav.interface';
import { HttpClient } from '@angular/common/http';
import { MovieNew, Serietvnew } from '../models/home.model';
import { Observable } from 'rxjs';

  /* Definición de la clave de la API y la URL base de la API */ 
const API_KEY = '433d2c486572afb242c6fe7c1ddc6771';
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  /* Definición de la lista de favoritos */
  private favoritos: favoritosResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private http: HttpClient) {}

  /* Método para añadir una pélicula o serie a la lista de favoritos  */
  addToWatchlist(item: MovieNew | Serietvnew): void {
    this.favoritos.results.push(item);
    localStorage.setItem('watchlist', JSON.stringify(this.favoritos));
  }
  
  /*Método para obtener la lista de favoritos */
  getWatchlist(): favoritosResponse {
    const storedWatchlist = localStorage.getItem('watchlist');
    return storedWatchlist ? JSON.parse(storedWatchlist) : this.favoritos;
  }

  /*Métodos para buscar*/ 
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  }

  searchSeries(query: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`);
  }
}

