import { Component, OnInit } from '@angular/core';
import { Films } from '../../models/films.interface';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { ListService } from '../../services/list.service';

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
  accountId: number = 21623249; 
  sessionId: string = 'b65a3cfcfa444c674e7b0a6bd82d54197a435693'; 

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.loadFilmDetails(+filmId);
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
      error: (err) => console.error('Error cargando película:', err),
    });
  }

  loadUserLists(): void {
    this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
      next: (response) => {
        this.userLists = response.results;
        console.log('Listas del usuario:', this.userLists); 
      },
      error: (err) => console.error('Error obteniendo listas:', err),
    });
  }

  getFilmVideo(id: number): void {
    this.filmsService.getFilmVideos(id).subscribe((data) => {
      const trailer = data.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
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

  // Método para añadir una película a una lista
  addToSelectedList(): void {
    if (this.selectedListId && this.film.id) {
      this.listService
        .addMovieToList(this.selectedListId, this.sessionId, this.film.id)
        .subscribe({
          next: () => {
            console.log(`Película añadida a la lista con ID ${this.selectedListId}`);
          },
          error: (err) => {
            console.error('Error añadiendo película a la lista:', err);
          },
        });
    } else {
      alert('Por favor, selecciona una lista.');
    }
  }
}