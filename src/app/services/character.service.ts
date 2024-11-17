import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor, ActorResponse } from '../models/actor.models';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://api.themoviedb.org/3/person/popular';
  private apiKey = '05e17ea68b0a29c92de23f76cc1cff22'; 

  constructor(private http: HttpClient) { }

  getActors(): Observable<ActorResponse> {
    return this.http.get<ActorResponse>(`${this.apiUrl}?api_key=${this.apiKey}`);
  }
  // Para el detalle del actor
  getOneActor(id: number): Observable<Actor> {
    return this.http.get<Actor>(`https://api.themoviedb.org/3/person/${id}´?api_key=${this.apiKey}`);
  }

}
