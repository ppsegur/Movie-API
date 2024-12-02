import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';
import { LenguageService } from './lenguage.service';

const API_KEY = '81819d9750b41c41923effa77112f27a';
const API_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private http: HttpClient, private idiomaService: LenguageService) {}

  private favorites: Films[] = []; // Aquí almacenaremos las películas favoritas


  getPopular(): Observable<FilmsListResponse> {
    const idioma = this.idiomaService.getSelectedLanguage();
    return this.http.get<FilmsListResponse>(`${API_URL}/movie/popular?api_key=${API_KEY}&language=${idioma}`);
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  getFilmVideos(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  }

  getFilmCredits(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  }

  // Métodos para favoritos
  addToFavorites(film: Films): void {
   this.favorites.push(film);
  }
  
  removeFromFavorites(film: Films): void {
    this.favorites = this.favorites.filter(fav => fav.id !== film.id);
  }

  
  getFavorites(): Films[] {
    return this.favorites;
  }
  //Métodos para el idioma 
  obtenerPeliculas() {
    const idioma = this.idiomaService.getSelectedLanguage();
    return this.http.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}&language=${idioma}`);
  }

}

