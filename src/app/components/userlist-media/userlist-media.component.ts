import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { FilmsService } from '../../services/films.service';


@Component({
  selector: 'app-userlist-media',
  templateUrl: './userlist-media.component.html',
  styleUrls: ['./userlist-media.component.css'],
})
export class UserListMediaComponent implements OnInit {
  movies: any[] = [];
  listName: string = '';
  listId!: number;
  description: string = '';
  sessionId: string | null = null;
  movieDetails: any[] = [];
  successMessage: string = '';


  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private filmsService: FilmsService
  ) {}


  ngOnInit(): void {
    this.sessionId = localStorage.getItem('session_id');


    if (!this.sessionId) {
      console.error('Session ID no encontrado. Verifica tu autenticación.');
      return;
    }


    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.listId = +listId;
      this.loadMoviesFromList(this.listId, this.sessionId);
    } else {
      console.error('List ID no encontrado en la ruta.');
    }
  }


  loadMoviesFromList(listId: number, sessionId: string): void {
    this.listService.getMoviesFromList(listId, sessionId).subscribe({
      next: (data) => {
        this.movies = data.items;
        this.listName = data.name;
        this.description = data.description;
        this.getMovieDetails(this.movies);
      },
      error: (err) => console.error('Error cargando películas de la lista:', err),
    });
  }


  getMovieDetails(movies: any[]): void {
    const movieRequests = movies.map((movie) => {
      return this.filmsService.getFilmById(movie.id).toPromise();
    });


    Promise.all(movieRequests)
      .then((results) => {
        this.movieDetails = results;
      })
      .catch((err) => {
        console.error('Error obteniendo detalles de las películas:', err);
      });
  }


  removeMovie(listId: number, movieId: number): void {
    if (!this.sessionId) {
      console.error('Session ID no definido. No se puede eliminar la película.');
      return;
    }


    console.log(`Intentando eliminar película con ID ${movieId} de la lista ${listId}`);
    this.listService.removeMovieFromList(listId, this.sessionId, movieId).subscribe({
      next: () => {
        console.log(`Película eliminada correctamente`);
        this.movies = this.movies.filter((movie) => movie.id !== movieId);
        this.movieDetails = this.movieDetails.filter((detail) => detail.id !== movieId);
        this.showSuccessMessage(`Película eliminada`);


      },
      error: (err) => {
        console.error('Error al eliminar la película:', err);
      },
    });
  }


  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }


}


