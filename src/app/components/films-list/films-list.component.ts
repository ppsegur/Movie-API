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
  filteredFilmList: Films[] = [];
  
  selectedGenre: string = '';
  minRating: number = 0;
  maxRating: number = 10;
  releaseDate: string = '';

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
      this.filteredFilmList = [...this.filmList]; 
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

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  filterFilms(): void {
    this.filteredFilmList = this.filmList.filter((film) => {
      const matchesGenre = this.selectedGenre === '' || film.genre_ids.includes(parseInt(this.selectedGenre));
      const matchesRating = film.vote_average >= this.minRating && film.vote_average <= this.maxRating;
      const matchesReleaseDate = this.releaseDate === '' || film.release_date === this.releaseDate;

      return matchesGenre && matchesRating && matchesReleaseDate;
    });
  }
}
