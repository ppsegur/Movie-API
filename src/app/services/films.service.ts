import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Films, FilmsListResponse } from '../models/films.interface';
import { LenguageService } from './lenguage.service';
import { environmentsKeys } from '../../environments/environments-keys';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(private http: HttpClient, private idiomaService: LenguageService) {}

  private favorites: Films[] = []; // Aquí almacenaremos las películas favoritas


  getPopular(): Observable<FilmsListResponse> {
    const idioma = this.idiomaService.getSelectedLanguage();
    return this.http.get<FilmsListResponse>(`${API_URL}/movie/popular?api_key=${API_KEY}&language=${idioma}`);

    return this.http.get<FilmsListResponse>(`${environmentsKeys.API_URL}/movie/popular?api_key=${environmentsKeys.API_KEY}`);
  }

  getFilmById(id: number): Observable<Films> {
    return this.http.get<Films>(`${environmentsKeys.API_URL}/movie/${id}?api_key=${environmentsKeys.API_KEY}`);
  }

  getFilmVideos(id: number): Observable<any> {
    return this.http.get<any>(`${environmentsKeys.API_URL}/movie/${id}/videos?api_key=${environmentsKeys.API_KEY}`);
  }

  getFilmCredits(id: number): Observable<any> {
    return this.http.get<any>(`${environmentsKeys.API_URL}/movie/${id}/credits?api_key=${environmentsKeys.API_KEY}`);
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

