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
  accountId: number = 21623249;
  sessionId: string | null = '511bab00d81359719d0cdc043166fcc2c268aad8';

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

  loadUserLists() {
    if (this.sessionId) {
      this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
        next: (response) => {
          this.userLists = response.results;
        },
        error: (err) => console.error(err),
      });
    }
  }
  addMovieToList(listId: number): void {
    if (this.sessionId && this.film) {
      this.listService
        .addMovieToList(listId, this.sessionId, this.film.id)
        .subscribe({
          next: () => alert('Película añadida a la lista con éxito'),
          error: (err) => console.error('Error al añadir película:', err),
        });
    }
  }
}
