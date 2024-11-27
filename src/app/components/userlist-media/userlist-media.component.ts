import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { FilmsService } from '../../services/films.service';
import { SeriesService } from '../../services/series.service';
import { Film, TvShow, List } from '../../models/lists.interface';

@Component({
  selector: 'app-userlist-media',
  templateUrl: './userlist-media.component.html',
  styleUrls: ['./userlist-media.component.css']
})
export class UserListMediaComponent implements OnInit {
  movies: Film[] = []; // Lista de películas
  series: TvShow[] = []; // Lista de series
  listName: string = ''; // Nombre de la lista
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
      this.loadListItems(Number(listId));
    }
  }

  // Cargar los elementos de la lista
  loadListItems(listId: number): void {
    this.listService.getItemsFromList(listId).subscribe({
      next: (response) => {
        this.processListItems(response.results);
      },
      error: (err) => console.error('Error al cargar los elementos de la lista:', err),
    });
  }

  // Procesar los elementos de la lista
  processListItems(items: List[]): void {
    // Mapear los elementos de la lista para agregar la propiedad 'media_type'
    const mappedItems = items.map(item => {
      if (item.name) {
        return { ...item, media_type: 'tv' } as TvShow;
      } else {
        return { ...item, media_type: 'movie', title: item.name || item.description } as Film;      }
    });

    // Separar películas y series por su tipo
    this.movies = mappedItems.filter(item => item.media_type === 'movie') as Film[];
    this.series = mappedItems.filter(item => item.media_type === 'tv') as TvShow[];

    // Cargar detalles de las películas y series
    this.loadMovieDetails();
    this.loadSeriesDetails();
  }

  // Cargar detalles de películas
  loadMovieDetails(): void {
    this.movies.forEach(movie => {
      this.filmsService.getFilmById(movie.id).subscribe({
        next: (details) => {
          this.movieDetails.push(details);
          console.log('Detalles de película cargados:', details);
        },
        error: (err) => console.error('Error al cargar detalles de película:', err),
      });
    });
  }

  // Cargar detalles de series
  loadSeriesDetails(): void {
    this.series.forEach(tvShow => {
      this.seriesService.getSeriesById(tvShow.id).subscribe({
        next: (details) => {
          this.seriesDetails.push(details);
          console.log('Detalles de serie cargados:', details);
        },
        error: (err) => console.error('Error al cargar detalles de serie:', err),
      });
    });
  }

  trackByMovieId(index: number, movie: Film): number {
    return movie.id;
  }
  
  trackBySerieId(index: number, serie: TvShow): number {
    return serie.id;
  }
  
}
