import { Component, OnInit } from '@angular/core';
import { Films } from '../../models/films.interface';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrl: './film-detail.component.css'
})
export class FilmDetailComponent implements OnInit {

  film!: Films;
  videoUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private filmsService: FilmsService 
  ) {}

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.filmsService.getFilmById(+filmId).subscribe((data: Films) => {
        this.film = data;
      });
    }
  }

  getFilmVideo(id: number): void {
    this.filmsService.getFilmVideos(id).subscribe((data) => {
      const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        this.videoUrl = `https://www.youtube.com/embed/${trailer.key}`;
      }
    });
  }
}
