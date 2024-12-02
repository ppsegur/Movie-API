import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateRequestTokenResponse } from '../models/create-request-token.interface';
import { CreateSessionResponse } from '../models/create-session.interface';
import { environmentsKeys } from '../../environments/environments-keys';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // STEP 1
  createRequestToken(): Observable<CreateRequestTokenResponse> {
    return this.http.get<CreateRequestTokenResponse>(
      `${environmentsKeys.API_URL}/authentication/token/new?api_key=${environmentsKeys.API_KEY}`
    );
  }

  // STEP 3
  createSession(): Observable<CreateSessionResponse> {
    return this.http.post<CreateSessionResponse>(
      `${environmentsKeys.API_URL}/authentication/session/new?api_key=${environmentsKeys.API_KEY}`,
      {
        request_token: localStorage.getItem('token'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }},
    );
  }
}