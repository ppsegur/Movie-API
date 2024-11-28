import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilmsService } from './films.service';
import { Observable } from 'rxjs';
import { Series } from '../../models/series.model';
import { SeriesListComponent } from '../components/series-list/series-list.component';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  API_KEY = '05e17ea68b0a29c92de23f76cc1cff22';
  API_URL = 'https://api.themoviedb.org/3';

  listadoSeriesValoradas: any[] = [];

  constructor(private http: HttpClient, private seriesList: SeriesListComponent) { }

    rateSeries(id:number, rating: number): Observable<any> {
      const url = `${this.API_URL}/movie/${id}/rating?api_key=${this.API_KEY}&session_id=${localStorage.getItem('session_id')}`;
      return this.http.post(url, {value: rating});

      //Guardar la serie que se ha valorado en listadoSeriesValoradas
      this.guardarSeriesValoradas(id);
    }

    /*guardarSeriesValoradas(series: Series) {
      this.listadoSeriesValoradas.push(series);
    }*/

    //Guardar la serie que se ha valorado en listadoSeriesValoradas
    guardarSeriesValoradas(id: number) {
      for(let i = 0; i < this.seriesList.listadoSeries.length; i++) {
        if(this.seriesList.listadoSeries[i].id == id) {
          this.listadoSeriesValoradas.push(this.seriesList.listadoSeries[i]);
        }
      }

      //this.listadoSeriesValoradas.push(ratedObject);
    }
}
