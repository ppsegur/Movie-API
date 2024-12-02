import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmsService } from './films.service';
import { Observable } from 'rxjs';
import { Series } from '../../models/series.model';
import { SeriesListComponent } from '../components/series-list/series-list.component';
import { Films, FilmsListResponse } from '../models/films.interface';
import { environmentsKeys } from '../environments/environments-keys';
import { AddRatingResponse } from '../models/add-rating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
  API_URL = 'https://api.themoviedb.org/3';

  listadoValorados: Observable<Films>[] = [];
  listadoValoradosV2: Films[] = [];
  accountId = localStorage.getItem('account_id');

  constructor(private http: HttpClient, private filmsService: FilmsService) { }

    rateSeries(id:number, rating: number): Observable<AddRatingResponse> {
      const url = `${this.API_URL}/movie/${id}/rating?session_id=${localStorage.getItem('session_id')}`;

      //this.guardarValorados(id);
      return this.http.post<AddRatingResponse>(url, {value: rating}, {headers: {
        'Content-Type': 'application/json',
        'Authorization': ` Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmJhMjZjNGU5N2NiYTAyODVjMjQ3OWFmNDU3ZGM3NiIsIm5iZiI6MTczMTMxMzYyMS4zMzQsInN1YiI6IjY3MzFiZmQ1NzY1ZDZkYjE3OGFiMTM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjtH7hyqfZF2M-Yp3H4oSv-5xdiZ5eHFBa8QFDvIv88`}});
    }

    //Guardar la serie que se ha valorado en listadoSeriesValoradas
    /*guardarValorados(id: number) {
      this.listadoValorados.push(this.filmsService.getFilmById(id));
      console.log(this.listadoValorados);

    }*/

    /*getValorados(): Films[] {
      let listadoValoradosV2: Films[] = [];

      for(let i = 0; i < this.listadoValorados.length; i++) {
        this.listadoValorados[i].subscribe((data) => {
          this.listadoValoradosV2.push(data);
        });
      }

      return listadoValoradosV2;
    }*/

    getValoradosV2(): Observable<FilmsListResponse> {
      console.log(this.accountId);
      return this.http.get<FilmsListResponse>(`${environmentsKeys.API_URL}/account/${this.accountId}/rated/movies?api_key=${environmentsKeys.API_KEY}&session_id=${localStorage.getItem('session_id')}`);
    }
}
