import { Component, OnInit } from '@angular/core';
import { Films } from '../../models/films.interface';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { ListService } from '../../services/list.service';
import { Location } from '@angular/common';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
})
export class FilmDetailComponent implements OnInit {

  film!: Films;
  videoUrl: string | null = null;
  cast: any[] = [];
  showAllCast: boolean = false;
  userLists: any[] = [];
  selectedListId!: number;
  accountId: number | null = null;
  sessionId: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private listService: ListService,
    private location: Location,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    this.accountId = accountId ? +accountId : null;

    if (!this.sessionId || !this.accountId) {
      this.errorMessage =
        'No se pudo obtener la sesión o el ID de la cuenta. Por favor, inicia sesión nuevamente.';
      return;
    }

    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.loadFilmDetails(+filmId);
    } else {
      this.errorMessage = 'No se encontró el ID de la película.';
    }

    this.loadUserLists();
  }

  loadFilmDetails(filmId: number): void {
    this.filmsService.getFilmById(filmId).subscribe({
      next: (data: Films) => {
        this.film = data;
        this.getFilmVideo(filmId);
        this.getFilmCredits(filmId);
        this.successMessage = 'Detalles de la película cargados correctamente.';
      },
      error: (err) => {
        this.errorMessage = 'Error cargando los detalles de la película.';
        console.error(err);
      },
    });
  }

  loadUserLists(): void {
    if (this.sessionId && this.accountId) {
      this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
        next: (response) => {
          this.userLists = response.results;
          this.successMessage = 'Listas de usuario cargadas correctamente.';
        },
        error: (err) => {
          this.errorMessage = 'Error obteniendo listas de usuario.';
          console.error(err);
        },
      });
    }
  }

  getFilmVideo(filmId: number): void {
    this.filmsService.getFilmVideos(filmId).subscribe({
      next: (data) => {
        const trailer = data.results.find(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        this.videoUrl = trailer
          ? `https://www.youtube.com/embed/${trailer.key}`
          : null;
      },
      error: (err) => {
        this.errorMessage = 'Error obteniendo el video de la película.';
        console.error(err);
      },
    });
  }

  getFilmCredits(filmId: number): void {
    this.filmsService.getFilmCredits(filmId).subscribe({
      next: (data) => {
        this.cast = this.showAllCast ? data.cast : data.cast.slice(0, 8);
      },
      error: (err) => {
        this.errorMessage = 'Error obteniendo los créditos de la película.';
        console.error(err);
      },
    });
  }

  toggleShowAllCast(): void {
    this.showAllCast = !this.showAllCast;
    if (this.film) this.getFilmCredits(this.film.id);
  }

  addToSelectedList(): void {
    if (this.selectedListId && this.film?.id && this.sessionId) {
      this.listService
        .addMovieToList(this.selectedListId, this.sessionId, this.film.id)
        .subscribe({
          next: () => {
            this.successMessage = `Película añadida a la lista con ID ${this.selectedListId}.`;
          },
          error: (err) => {
            this.errorMessage = 'Error añadiendo la película a la lista.';
            console.error(err);
          },
        });
    } else {
      this.errorMessage = 'Por favor, selecciona una lista.';
    }
  }

  goBack(): void {
    this.location.back();
  }

  /*saveRating(id: number, star:number) {
    this.ratingService.rateSeries(id, star);
  }

  deleteRating() {
    throw new Error('Method not implemented.');
    }*/
}