import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Films } from '../../models/films.interface';
import { WatchlistService } from '../../services/watch-list.service';
import { Genre } from '../../models/genres.interface';
import { GenresService } from '../../services/genres.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css'],
})
export class FilmsListComponent implements OnInit {
  filmList: Films[] = [];
  filteredFilmList: Films[] = [];

  selectedGenres: number[] = [];
  minRating: number = 0;
  maxRating: number = 10;
  releaseDate: string = '';

  generos: Genre[] = [];

  constructor(
    private filmService: FilmsService,
    private watchlistService: WatchlistService,
    private genresService: GenresService
  ) {}

  ngOnInit(): void {
    this.loadPopularFilms();
    this.cargarGeneros();
  }

  cargarGeneros() {
      this.genresService.getGenres().subscribe(response => {
        this.generos = response.genres;
      });
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

  isLoggedIn(): boolean {
    return localStorage.getItem('logged_in') === 'true';
  }

  toggleGenre(genreId: number | ''): void {
    if (genreId === '') {
      this.selectedGenres = [];
    } else {
      const index = this.selectedGenres.indexOf(genreId);
      if (index === -1) {
        this.selectedGenres.push(genreId);
      } else {
        this.selectedGenres.splice(index, 1);
      }
    }

    this.filterFilms();
  }

  isSelectedGenre(genreId: number | ''): boolean {
    if (genreId === '') {
      return this.selectedGenres.length === 0;
    }
    return this.selectedGenres.includes(genreId);
  }

  filterFilms(): void {
    this.filteredFilmList = this.filmList.filter((film) => {
      const matchesGenres =
        this.selectedGenres.length === 0 ||
        this.selectedGenres.some((genreId) =>
          film.genre_ids.includes(genreId)
        );
      const matchesRating =
        film.vote_average >= this.minRating && film.vote_average <= this.maxRating;
      const matchesReleaseDate =
        this.releaseDate === '' || film.release_date === this.releaseDate;

      return matchesGenres && matchesRating && matchesReleaseDate;
    });
  }
}
