import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorResponse, KnownFor } from '../models/actor.models';
import { LenguageService } from './lenguage.service';
import { Actor, ActorResponse } from '../models/actor.models';
import { environmentsKeys } from '../../environments/environments-keys';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://api.themoviedb.org/3/person/popular';
  private apiKey = '05e17ea68b0a29c92de23f76cc1cff22'; 



  constructor(private http: HttpClient, private idiomaService: LenguageService) { }

  getActors(): Observable<ActorResponse> {
    const idioma = this.idiomaService.getSelectedLanguage();
    return this.http.get<ActorResponse>(`${this.apiUrl}?api_key=${this.apiKey}&language=${idioma}`);
    return this.http.get<ActorResponse>(`${environmentsKeys.API_URL}/person/popular?api_key=${environmentsKeys.API_KEY}`);
  }
  // Para el detalle del actor
  getOneActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`https://api.themoviedb.org/3/person/${id}´?api_key=${environmentsKeys.API_KEY}`);
  }
  //Para saber las peliculas o series donde el actor participo
  getActorMovies(id: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${environmentsKeys.API_KEY}`);
  }


}
