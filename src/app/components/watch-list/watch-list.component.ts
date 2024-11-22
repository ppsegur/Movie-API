import { Component, OnInit } from '@angular/core';
import { MovieNew, Serietvnew } from '../../models/home.model';
import { WatchlistService } from '../../services/watch-list.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.css'
})
export class WatchListComponent implements OnInit {
  watchlist: (MovieNew | Serietvnew)[] = []; 

  constructor(private watchlistService: WatchlistService) {}


  ngOnInit(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  loadWatchlist(): void {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  removeFromWatchlist(item: MovieNew | Serietvnew): void {
    this.watchlist = this.watchlist.filter(watchlistItem => watchlistItem.id !== item.id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

}
