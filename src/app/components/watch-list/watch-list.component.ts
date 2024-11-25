import { Component, OnInit } from '@angular/core';
import { MovieNew, Serietvnew } from '../../models/home.model';
import { WatchlistService } from '../../services/watch-list.service';
import { WatchListMoviesListResponse } from '../../models/watchList.interface';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent implements OnInit {
  watchlist: WatchListMoviesListResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  removeFromWatchlist(item: MovieNew | Serietvnew): void {
    this.watchlist.results = this.watchlist.results.filter(watchlistItem => watchlistItem.id !== item.id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

}
