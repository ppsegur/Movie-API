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
  watchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {
    this.loadLocalWatchlist();
  }

  loadLocalWatchlist(): void {
    this.watchlist = this.watchlistService.getLocalWatchlist();
  }

  removeFromWatchlist(item: Films | Series): void {
    this.watchlistService.removeFromLocalWatchlist(item.id);
    this.loadLocalWatchlist();
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }
    
}
