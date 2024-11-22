import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRequestTokenResponse } from '../models/create-request-token.interface';
import { CreateSessionResponse } from '../models/create-session.interface';

// Screamming snake case
const API_KEY = '81819d9750b41c41923effa77112f27a';
const API_BASE_URL = 'https://api.themoviedb.org/3';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // STEP 1
  createRequestToken(): Observable<CreateRequestTokenResponse> {
    return this.http.get<CreateRequestTokenResponse>(
      `${API_BASE_URL}/authentication/token/new?api_key=${API_KEY}`
    );
  }

  // STEP 3
  createSession(): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${API_BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      {
        request_token: localStorage.getItem('token'),
      }
    );
  }
}