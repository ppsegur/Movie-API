import { Component, OnInit } from '@angular/core';
import { Films } from '../../models/films.interface';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { ListService } from '../../services/list.service';
import { Location } from '@angular/common';


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
    private location: Location
  ) {}


  ngOnInit(): void {
    this.sessionId = localStorage.getItem('session_id');
    const accountId = localStorage.getItem('account_id');
    this.accountId = accountId ? +accountId : null;


    if (!this.sessionId || !this.accountId) {
      this.showErrorMessage(
        'No se pudo obtener la sesión o el ID de la cuenta. Por favor, inicia sesión nuevamente.'
      );
      return;
    }


    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.loadFilmDetails(+filmId);
    } else {
      this.showErrorMessage('No se encontró el ID de la película.');
    }


    this.loadUserLists();
  }


  loadFilmDetails(filmId: number): void {
    this.filmsService.getFilmById(filmId).subscribe({
      next: (data: Films) => {
        this.film = data;
        this.getFilmVideo(filmId);
        this.getFilmCredits(filmId);
      },
      error: (err) => {
        this.showErrorMessage('Error cargando los detalles de la película.');
        console.error(err);
      },
    });
  }


  loadUserLists(): void {
    if (this.sessionId && this.accountId) {
      this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
        next: (response) => {
          this.userLists = response.results;
        },
        error: (err) => {
          this.showErrorMessage('Error obteniendo listas de usuario.');
          console.error(err);
        },
      });
    }
  }


  addToSelectedList(): void {
    if (this.selectedListId && this.film?.id && this.sessionId) {
      this.listService
        .addMovieToList(this.selectedListId, this.sessionId, this.film.id)
        .subscribe({
          next: () => {
            this.showSuccessMessage(`Película "${this.film.title}" añadida a la lista`);
          },
          error: (err) => {
            this.showErrorMessage('La peícula ya pertenece a esta lista');
            console.error(err);
          },
        });
    } else {
      this.showErrorMessage('Por favor, selecciona una lista.');
    }
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


  toggleShowAllCast(): void {
    this.showAllCast = !this.showAllCast;
    if (this.film) this.getFilmCredits(this.film.id);
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
        this.showErrorMessage('Error obteniendo el video de la película.');
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
        this.showErrorMessage('Error obteniendo los créditos de la película.');
        console.error(err);
      },
    });
  }


  goBack(): void {
    this.location.back();
  }
}


