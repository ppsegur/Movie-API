import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LanguageSelectedResponse } from '../models/languages.interface';
import { environmentsKeys } from '../environments/environments-keys';

@Injectable({
  providedIn: 'root'
})
export class LenguageService {
  
  private selectedLanguageSubject = new BehaviorSubject<string>('en-US');
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();
  constructor(private http: HttpClient) { }

  getLanguages(): Observable<LanguageSelectedResponse> {
    return this.http.get<LanguageSelectedResponse>(`${environmentsKeys.API_URL}/configuration/languages?api_key=${environmentsKeys.API_KEY}`).pipe(
      map(languages => languages.filter(language => language.iso_639_1 === 'en' || language.iso_639_1 === 'es'))
    );;
  
  }
  
  setSelectedLanguage(language: string): void {
    localStorage.setItem('selectedLanguage', language);

    this.selectedLanguageSubject.next(language);
  }

  getSelectedLanguage(): string {
    return this.selectedLanguageSubject.value;
  }
}


