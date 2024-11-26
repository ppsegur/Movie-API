import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.model';
import { FavService } from '../../services/fav.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent implements OnInit {

  constructor(private seriesService: SeriesService,
    private favService: FavService
  ) { }
  listadoSeries: Series[] = [];

  ngOnInit(): void {
    this.loadSeriesList();
  }

  loadSeriesList() {
    this.seriesService.getSeries().subscribe(respuesta => {
      this.listadoSeries = respuesta.results;
    });
  }
  addToFavorites(series: Series): void {
    this.favService.addToFavorites(series);
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }


}
