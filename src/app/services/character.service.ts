import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorResponse, KnownFor } from '../models/actor.models';
import { LenguageService } from './lenguage.service';
import { environmentsKeys } from '../../environments/environments-keys';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {



  constructor(private http: HttpClient, private idiomaService: LenguageService) { }

  getActors(): Observable<ActorResponse> {
    const idioma = this.idiomaService.getSelectedLanguage();
    return this.http.get<ActorResponse>(`${environmentsKeys.API_URL}/person/popular?api_key=${environmentsKeys.API_KEY}&languaje=${idioma}`);
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
