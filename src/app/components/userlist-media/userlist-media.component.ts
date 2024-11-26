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
  listName: string = ''; // Nombre de la lista
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
    // Cargar películas de la lista
    this.listService.getMoviesFromList(listId, this.sessionId).subscribe({
      next: (data) => {
        this.movies = data.items;
        this.listName = data.name;
        this.getMovieDetails(this.movies); // Cargar detalles de las películas
      },
      error: (err) => console.error('Error cargando películas de la lista:', err),
    });
  
    // Cargar series de la lista
    this.listService.getSeriesFromList(listId, this.sessionId).subscribe({
      next: (data) => {
        this.series = data.items;
        this.getSeriesDetails(this.series); // Cargar detalles de las series
      },
      error: (err) => console.error('Error al cargar series de la lista:', err),
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

  trackByMovieId(index: number, movie: any): number {
    return movie.id; // Único ID para cada película
  }
  
  trackBySerieId(index: number, serie: any): number {
    return serie.id; // Único ID para cada serie
  }
  
}
