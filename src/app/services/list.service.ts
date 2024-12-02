import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {List, ListResponse } from '../models/lists.interface';
import { LanguageService } from 'typescript';
import { LenguageService } from './lenguage.service';

const API_KEY = '81819d9750b41c41923effa77112f27a';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const session_id= 'b65a3cfcfa444c674e7b0a6bd82d54197a435693';
const account_id = '21623249';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient, private idiomaService: LenguageService) {}

  // Obtener todas las listas del usuario
  getUserLists(accountId: number, sessionId: string): Observable<ListResponse> {
    const idioma = this.idiomaService.getSelectedLanguage();

    return this.http.get<ListResponse>(
      `${API_BASE_URL}/account/${accountId}/lists?api_key=${API_KEY}&session_id=${sessionId}&language=${idioma}`
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
        `${API_BASE_URL}/list?api_key=${API_KEY}&session_id=${sessionId}`,
        body
      );
  }

  // Eliminar una lista
  deleteList(listId: number, sessionId: string): Observable<any> {
    return this.http.delete(
      `${API_BASE_URL}/list/${listId}?api_key=${API_KEY}&session_id=${sessionId}`
    );
  }

  // Añadir una película a una lista
  addMovieToList(listId: number, sessionId: string, movieId: number): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}/list/${listId}/add_item?api_key=${API_KEY}&session_id=${sessionId}`,
      { media_id: movieId }
    );
  }

  // Eliminar una película de una lista
  removeMovieFromList(listId: number, sessionId: string, movieId: number): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}/list/${listId}/remove_item?api_key=${API_KEY}&session_id=${sessionId}`,
      { media_id: movieId }
    );
  }

  // Obtener películas de una lista específica
  getMoviesFromList(listId: number, sessionId: string): Observable<any> {
    const idioma = this.idiomaService.getSelectedLanguage();

    return this.http.get(
      `${API_BASE_URL}/list/${listId}?api_key=${API_KEY}&session_id=${sessionId}&language=${idioma}`
    );
  }

}