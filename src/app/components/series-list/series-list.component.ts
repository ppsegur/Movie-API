import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.model';
import { FavService } from '../../services/fav.service';
import { WatchlistService } from '../../services/watch-list.service';


@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  listadoSeries: Series[] = [];

  constructor(private seriesService: SeriesService,
    private watchlistService: WatchlistService,
        private favService: FavService

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
  addToFavorites(series: Series): void {
    this.favService.addSeriesToFavorite(series);
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }
  addSeriesToWatchlist(series: Series): void {
    this.watchlistService.addSeriesToWatchlistTMDB(series);

  }

  getStrokeDashoffset(voteAverage: number): number {
    const maxDashArray = 440; 
    const normalizedVote = Math.min(Math.max(voteAverage, 0), 10); 
    return maxDashArray - (normalizedVote / 10) * maxDashArray;
  }


  getCircleColor(voteAverage: number): string {
    console.log('Vote Average:', voteAverage); 
    if (voteAverage >= 8.0) {
        return 'green';
    } else if (voteAverage >= 5.0 && voteAverage < 7.0) {
        return 'orange'; 
    } else if (voteAverage >= 7.0 && voteAverage < 8.0) {
        return 'yellow'; 
    } else {
        return 'red';
    }
  }



  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }
  
}
