import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Series, SeriesResponse } from '../../models/series.model';
import { WatchlistService } from './watch-list.service';
import { environmentsKeys } from '../../environments/environments-keys';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient, private watchlistService: WatchlistService) { }

  getSeries(): Observable<SeriesResponse> {
    return this.http.get<SeriesResponse>(`${environmentsKeys.API_URL}/tv/popular?api_key=${environmentsKeys.API_KEY}`);
  }

  getSeriesById(id: number): Observable<Series> {
    return this.http.get<Series>(`${environmentsKeys.API_URL}/tv/${id}?api_key=${environmentsKeys.API_KEY}`);
    
  }
  

  

}
