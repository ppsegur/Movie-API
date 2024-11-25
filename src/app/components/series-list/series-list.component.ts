import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  listadoSeries: Series[] = [];

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.loadSeriesList();
  }

  loadSeriesList(): void {
    this.seriesService.getSeries().subscribe(respuesta => {
      this.listadoSeries = respuesta.results;
    });
  }

  addToWatchlist(item: Series): void {
    this.seriesService.addToWatchlist(item);
  }
}