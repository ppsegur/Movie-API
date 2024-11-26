import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Films } from '../../models/films.interface';
import { WatchlistService } from '../../services/watch-list.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {
  filmList: Films[] = [];

  constructor(
    private filmService: FilmsService,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    this.loadPopularFilms();
  }

  loadPopularFilms(): void {
    this.filmService.getPopular().subscribe((resp) => {
      this.filmList = resp.results;
    });
  }

  addToWatchlist(film: Films): void {
    this.watchlistService.addToWatchlistTMDB(film);
    console.log(`Película "${film.title}" añadida a la watchlist.`);
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }

  getStrokeDashoffset(voteAverage: number): number {
    const maxDashArray = 440;
    const normalizedVote = Math.min(Math.max(voteAverage, 0), 10);
    return maxDashArray - (normalizedVote / 10) * maxDashArray;
  }

  getCircleColor(voteAverage: number): string {
    if (voteAverage > 8) {
      return 'green';
    } else if (voteAverage >= 5 && voteAverage < 7) {
      return 'orange';
    } else if (voteAverage >= 7 && voteAverage < 8) {
      return 'yellow';
    } else {
      return 'red';
    }
  }
}
