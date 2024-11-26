import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.model';
import { WatchlistService } from '../../services/watch-list.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  listadoSeries: Series[] = [];

  constructor(private seriesService: SeriesService,
    private watchlistService: WatchlistService

  ) { }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe((data: any) => {
      this.listadoSeries = data;
    });
    this.loadPopularSeries();
  }

  loadPopularSeries(): void {
    this.seriesService.getSeries().subscribe((resp) => {
      this.listadoSeries = resp.results;
    });
  }

  addSeriesToWatchlist(series: Series): void {
    this.watchlistService.addSeriesToWatchlistTMDB(series);
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }
  
}