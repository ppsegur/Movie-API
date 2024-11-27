import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Film, TvShow, ListUserResponse } from '../models/lists.interface';


const API_KEY = '81819d9750b41c41923effa77112f27a';
const API_BASE_URL = 'https://api.themoviedb.org/4';
const session_id = 'b65a3cfcfa444c674e7b0a6bd82d54197a435693';
const account_id = '21623249';
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgxOWQ5NzUwYjQxYzQxOTIzZWZmYTc3MTEyZjI3YSIsIm5iZiI6MTczMjY0NDUxMC44MDIxODQzLCJzdWIiOiI2NzMxYmU2YmYwY2QxYTZiZmMwZWQ5NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0UC69vDK1KRuCHV8YVM125maA78G-qNRL9821uz09KQ';
const account_object_id = '6731be6bf0cd1a6bfc0ed946';



@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

   // Obtener todas las listas del usuario
   getUserLists(accountId: number, sessionId: string): Observable<ListUserResponse> {
    const   account_object_id = '6731be6bf0cd1a6bfc0ed946';
    return this.http.get<ListUserResponse>(
      `${API_BASE_URL}/account/${account_object_id}/lists?api_key=${API_KEY}&session_id=${sessionId}`
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


  // Método para agregar un elemento a la lista
  addItemToList(item: Film | TvShow, listId: number): Observable<any> {
    const body = {
      media_id: item.id,
      media_type: item.media_type, // 'movie' o 'tv'
    };


    const headers = {
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };


    return this.http.post(
      `${API_BASE_URL}/list/${listId}/items`,
      body,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error al agregar el item a la lista:', error);
        return throwError(() => new Error('No se pudo agregar el item. Intenta más tarde.'));
      })
    );
  }


  // Método para obtener los elementos de la lista
  getItemsFromList(listId: number): Observable<ListUserResponse> {
    const headers = {
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
    };


    return this.http.get<ListUserResponse>(
      `${API_BASE_URL}/list/${listId}`,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error al obtener los elementos de la lista:', error);
        return throwError(() => new Error('No se pudieron cargar los elementos. Intenta más tarde.'));
      })
    );
  }
}
