import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../../services/watch-list.service';
import { WatchListMoviesListResponse } from '../../models/watchList.interface';
import { Films } from '../../models/films.interface';
import { Series } from '../../../models/series.model';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  movieWatchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  seriesWatchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.loadWatchlists();
  }

  loadWatchlists(): void {
    this.watchlistService.getLocalMovieWatchlist().subscribe((data: WatchListMoviesListResponse) => {
      this.movieWatchlist = data;
    });
    this.watchlistService.getLocalSeriesWatchlist().subscribe((data: WatchListMoviesListResponse) => {
      this.seriesWatchlist = data;
    });
  }

  removeFromMovieWatchlist(item: Films): void {
    this.watchlistService.removeFromLocalMovieWatchlist(item.id).subscribe(() => {
      this.loadWatchlists();
    });
  }

  removeFromSeriesWatchlist(item: Series): void {
    this.watchlistService.removeFromLocalSeriesWatchlist(item.id).subscribe(() => {
      this.loadWatchlists();
    });
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }
}