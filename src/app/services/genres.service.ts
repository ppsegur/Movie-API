import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenresListResponse } from '../models/genres.interface';
import { Observable } from 'rxjs';
import { environmentsKeys } from '../../environments/environments-keys';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) {}

  getGenres(): Observable<GenresListResponse> {
    return this.http.get<GenresListResponse>(`${environmentsKeys.API_URL}/genre/movie/list` ,{
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWUxN2VhNjhiMGEyOWM5MmRlMjNmNzZjYzFjZmYyMiIsIm5iZiI6MTczMjczMTYzNC43OTgyNDUyLCJzdWIiOiI2NzMxYmUxZjYxNjI2YWMxMDZiZTY4NDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7X32wd2qwJZP4yvXdn1lEXO_U1R-L7FuDMiqVWrdCSs`
      }
    });
  }

}
