import { Component, Input, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Films } from '../../models/films.interface';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Film } from '../../models/lists.interface';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
})
export class FilmDetailComponent implements OnInit {
  film!: Films;
  videoUrl: string | null = null;
  cast: any[] = [];
  showAllCast: boolean = false;
  @Input() movieId: number | undefined; // Permite recibir el ID como entrada
  userLists: any[] = []; // Listas del usuario
  selectedListId!: number; // ID de la lista seleccionada
  accountId: number = 21623249; // Valor fijo del servicio
  sessionId: string = 'b65a3cfcfa444c674e7b0a6bd82d54197a435693'; // Valor fijo del servicio
  account_object_id = '6731be6bf0cd1a6bfc0ed946';

  constructor(
    private filmsService: FilmsService, // Servicio de películas
    private route: ActivatedRoute,
    private listService: ListService // Servicio de listas
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la película desde los parámetros de la ruta
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.movieId) {
      this.loadMovieDetail(this.movieId);
    }

    // Cargar las listas del usuario
    this.loadUserLists();

    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.filmsService.getFilmById(+filmId).subscribe((data: Films) => {
        this.film = data;
        this.getFilmVideo(+filmId);
        this.getFilmCredits(+filmId);
      });
    }
  }

  // Cargar los detalles de la película
  loadMovieDetail(movieId: number): void {
    this.filmsService.getFilmById(movieId).subscribe({
      next: (response) => {
        this.film = response;
        console.log('Detalles de la película:', this.film);
      },
      error: (err) =>
        console.error('Error al cargar los detalles de la película:', err),
    });
  }

  loadUserLists(): void {
    this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
      next: (response) => {
        this.userLists = response.results;
        console.log('Listas del usuario:', this.userLists); // Para depuración
      },
      error: (err) => console.error('Error obteniendo listas:', err),
    });
  }

  getFilmVideo(id: number): void {
    this.filmsService.getFilmVideos(id).subscribe((data) => {
      const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        this.videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });
  }

  getFilmCredits(id: number): void {
    this.filmsService.getFilmCredits(id).subscribe((data) => {
      this.cast = this.showAllCast ? data.cast : data.cast.slice(0, 8);
    });
  }

  toggleShowAllCast(): void {
    this.showAllCast = !this.showAllCast;
    if (this.film) this.getFilmCredits(this.film.id);
  }

  // Método para agregar la película a una lista seleccionada
  addToSelectedList(): void {
    if (!this.selectedListId) {
      console.error('No se ha seleccionado ninguna lista.');
      return;
    }

    const movieToAdd: Film = {
      id: this.film.id,
      media_type: 'movie', // Tipo de media
      title: this.film.title, // Título de la película
      poster_path: this.film.poster_path
    };

    this.listService.addItemToList(movieToAdd, this.selectedListId).subscribe({
      next: () => {
        console.log(`Película "${this.film.title}" añadida a la lista ID ${this.selectedListId}`);
        alert('Película añadida correctamente a la lista.');
      },
      error: (err) => console.error('Error al agregar la película a la lista:', err),
    });
  }
}
