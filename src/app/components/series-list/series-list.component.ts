import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.interface';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent implements OnInit {

  constructor(private seriesService: SeriesService) { }
  listadoSeries: Series[] = [];

  ngOnInit(): void {
    this.loadSeriesList();
  }

  loadSeriesList() {
    this.seriesService.getSeries().subscribe(respuesta => {
      this.listadoSeries = respuesta.results;
    });
  }



}
