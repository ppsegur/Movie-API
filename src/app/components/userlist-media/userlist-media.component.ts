import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { FilmsService } from '../../services/films.service';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-userlist-media',
  templateUrl: './userlist-media.component.html',
  styleUrls: ['./userlist-media.component.css']
})
export class UserListMediaComponent implements OnInit {
  movies: any[] = []; // Lista de películas
  series: any[] = []; // Lista de series
  listName: string = '';
  sessionId: string = 'b65a3cfcfa444c674e7b0a6bd82d54197a435693';
  movieDetails: any[] = []; // Detalles de películas
  seriesDetails: any[] = []; // Detalles de series

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private filmsService: FilmsService,
    private seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.loadMediaFromList(+listId);
    }
  }

  loadMediaFromList(listId: number): void {
    this.listService.getMoviesFromList(listId, this.sessionId).subscribe({
      next: (data) => {
        this.movies = data.items.filter((item: any) => item.media_type === 'movie');
        this.series = data.items.filter((item: any) => item.media_type === 'tv');
        this.listName = data.name;

        this.getMovieDetails(this.movies);
        this.getSeriesDetails(this.series);
      },
      error: (err) => console.error('Error cargando medios de la lista:', err),
    });
  }

  getMovieDetails(movies: any[]): void {
    const movieRequests = movies.map(movie => {
      return this.filmsService.getFilmById(movie.id).toPromise();
    });

    Promise.all(movieRequests).then(results => {
      this.movieDetails = results.filter(item => item !== null);
    }).catch(err => {
      console.error('Error obteniendo detalles de las películas:', err);
    });
  }

  getSeriesDetails(series: any[]): void {
    const seriesRequests = series.map(serie => {
      return this.seriesService.getSeriesById(serie.id).toPromise();
    });

    Promise.all(seriesRequests).then(results => {
      this.seriesDetails = results.filter(item => item !== null);
    }).catch(err => {
      console.error('Error obteniendo detalles de las series:', err);
    });
  }
}
