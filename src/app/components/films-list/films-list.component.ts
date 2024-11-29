import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Films } from '../../models/films.interface';
import { FavService } from '../../services/fav.service';
import { NumberFormatPipePipe } from "../../pipes/number-format-pipe.pipe";
import { WatchlistService } from '../../services/watch-list.service';
import { GenresService } from '../../services/genres.service';
import { Options } from '@angular-slider/ngx-slider';
import { Genre } from '../../models/genres.interface';


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

  ratingOptions: Options = {
    floor: 0,
    ceil: 10,
    step: 0.1
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private filmService: FilmsService,
    private watchlistService: WatchlistService,
    private genresService: GenresService,
    private favService: FavService
  ) {}

  ngOnInit(): void {
    this.loadPopularFilms();
    this.cargarGeneros();
    this.loadWatchlist();
  }
  
  loadWatchlist(): void {
    this.watchlistService.getLocalMovieWatchlist().subscribe();
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

  applyFilters(): void {
    this.filteredFilmList = this.filmList.filter(film => {
      const matchesGenres = this.selectedGenres.length ? this.selectedGenres.some(genre => film.genre_ids.includes(genre)) : true;
      const matchesReleaseDate = this.releaseDate ? film.release_date === this.releaseDate : true;
      const matchesRating = film.vote_average >= this.minRating && film.vote_average <= this.maxRating;
      return matchesGenres && matchesReleaseDate && matchesRating;
    });
  }

  toggleGenre(genreId: number): void {
    const index = this.selectedGenres.indexOf(genreId);
    if (index === -1) {
      this.selectedGenres.push(genreId);
    } else {
      this.selectedGenres.splice(index, 1);
    }
    this.applyFilters();
  }

  isSelectedGenre(genreId: number): boolean {
    return this.selectedGenres.includes(genreId);
  }

  setReleaseDate(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.value) {
      this.releaseDate = inputElement.value;
      this.applyFilters();
    }
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('logged_in') === 'true';
  }

  addToWatchlist(film: Films): void {
    if (this.watchlistService.isFilmInWatchlist(film.id)) {
      this.showErrorMessage(`La película "${film.title}" ya está en la watchlist.`);
      console.log(`La película "${film.title}" ya está en la watchlist.`);
      return;
    }
  
    this.watchlistService.addToWatchlistTMDB(film);
    this.showSuccessMessage(`Película "${film.title}" añadida a la watchlist.`);
  }  
   
  addToFavorites(film: Films): void {
    this.favService.addToFav(film);
    console.log(`Película "${film.title}" añadida a la watchlist.`);
  }
  
  showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 2000);
  }
  
  
  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
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