import { Component } from '@angular/core';
import { favoritosResponse } from '../../models/fav.interface';
import { FavService } from '../../services/fav.service';
import { Films } from '../../models/films.interface';
import { Series } from '../../../models/series.model';

@Component({
  selector: 'app-favlist',
  templateUrl: './favlist.component.html',
  styleUrl: './favlist.component.css'
})
export class FavlistComponent {
  movieFav: favoritosResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  seriesFav: favoritosResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  };

  constructor(private favSvc: FavService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favSvc.getLocalMovieFav().subscribe((data: favoritosResponse) => {
      this.movieFav = data;
    });
    this.favSvc.getLocalSerieFav().subscribe((data: favoritosResponse) => {
      this.seriesFav = data;
    });
  }

  removeFromFav(item: Films): void {
    this.favSvc.removeFromLocalMovieFav(item.id).subscribe(() => {
      this.loadFavorites();
    });
  }

  removeFromSeriesFav(item: Series): void {
    this.favSvc.removeFromLocalSeriesFavorite(item.id).subscribe(() => {
      this.loadFavorites();
    });
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }
}
