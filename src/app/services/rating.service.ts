import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmsService } from './films.service';
import { Observable } from 'rxjs';
import { Series } from '../../models/series.model';
import { SeriesListComponent } from '../components/series-list/series-list.component';
import { Films } from '../models/films.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
  API_URL = 'https://api.themoviedb.org/3';

  listadoValorados: Observable<Films>[] = [];

  constructor(private http: HttpClient, private filmsService: FilmsService) { }

    rateSeries(id:number, rating: number): Observable<any> {
      const url = `${this.API_URL}/movie/${id}/rating?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`;

      //Guardar la serie que se ha valorado en listadoSeriesValoradas
      this.guardarValorados(id);

      return this.http.post(url, {value: rating});

    }

    //Guardar la serie que se ha valorado en listadoSeriesValoradas
    guardarValorados(id: number) {
      this.listadoValorados.push(this.filmsService.getFilmById(id));
      for(let i = 0; i < this.listadoValorados.length; i++) {
        console.log(this.listadoValorados[i]);
      }

    }
}
