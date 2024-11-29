import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetailsResponse } from '../models/account-details.interface';
import { environmentsKeys } from '../../environments/environments-keys';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<AccountDetailsResponse> {
    let sessionId = localStorage.getItem('session_id');
    return this.http.get<AccountDetailsResponse>(
      `${environmentsKeys.API_URL}/account?api_key=${environmentsKeys.API_KEY}&session_id=${sessionId}`
    );
  }
}