import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {List, ListResponse } from '../models/lists.interface';
import { environmentsKeys } from '../../environments/environments-keys';


@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  // Obtener todas las listas del usuario
  getUserLists(accountId: number, sessionId: string): Observable<ListResponse> {
    return this.http.get<ListResponse>(
      `${environmentsKeys.API_URL}/account/${accountId}/lists?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`
    );
  }
  

  // Crear una nueva lista
  createList(sessionId: string, name: string, description: string, isPublic: boolean = true): Observable<any> {
    const body = {
      name: name,
      description: description,
      public: isPublic, 
    };
    return this.http
      .post(
        `${environmentsKeys.API_URL}/list?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
        body
      );
  }

  // Eliminar una lista
  deleteList(listId: number, sessionId: string): Observable<any> {
    return this.http.delete(
      `${environmentsKeys.API_URL}/list/${listId}?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`
    );
  }

  // Añadir una película a una lista
  addMovieToList(listId: number, sessionId: string, movieId: number): Observable<any> {
    return this.http.post(
      `${environmentsKeys.API_URL}/list/${listId}/add_item?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
      { media_id: movieId }
    );
  }

  // Eliminar una película de una lista
  removeMovieFromList(listId: number, sessionId: string, movieId: number): Observable<any> {
    return this.http.post(
      `${environmentsKeys.API_URL}/list/${listId}/remove_item?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`,
      { media_id: movieId }
    );
  }

  // Obtener películas de una lista específica
  getMoviesFromList(listId: number, sessionId: string): Observable<any> {
    return this.http.get(
      `${environmentsKeys.API_URL}/list/${listId}?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`
    );
  }

}