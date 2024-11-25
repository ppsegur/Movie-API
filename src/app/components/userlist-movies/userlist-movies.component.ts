import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { FilmsService } from '../../services/films.service';  

@Component({
  selector: 'app-userlist-movies',
  templateUrl: './userlist-movies.component.html',
  styleUrls: ['./userlist-movies.component.css']
})
export class UserListMoviesComponent implements OnInit {
  movies: any[] = [];
  listName: string = '';
  sessionId: string = 'b65a3cfcfa444c674e7b0a6bd82d54197a435693'; 
  movieDetails: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private filmsService: FilmsService  
  ) {}

  ngOnInit(): void {
    const listId = this.route.snapshot.paramMap.get('id');
    if (listId) {
      this.loadMoviesFromList(+listId);
    }
  }

  loadMoviesFromList(listId: number): void {
    this.listService.getMoviesFromList(listId, this.sessionId).subscribe({
      next: (data) => {
        this.movies = data.items;
        this.listName = data.name;

        this.getMovieDetails(this.movies);
      },
      error: (err) => console.error('Error cargando películas de la lista:', err),
    });
  }

  getMovieDetails(movies: any[]): void {
    const movieRequests = movies.map(movie => {
      return this.filmsService.getFilmById(movie.id).toPromise();  
    });

    Promise.all(movieRequests).then(results => {
      this.movieDetails = results;
    }).catch(err => {
      console.error('Error obteniendo detalles de las películas:', err);
    });
  }
}
